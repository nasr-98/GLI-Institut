import express from "express";
import { Resend } from "resend";
import ejs from "ejs";
import path from "path";
import "dotenv/config";

import { getDb, uuidv4 } from "../database.js";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      courseLevel,
      courseType,
      preferredStartDate,
      addInfo,
      privacyPolicy,
    } = req.body;

    // ==========================================
    // 1. Get database connection
    // ==========================================

    const db = getDb();

    // ==========================================
    // 2. Validate required fields
    // ==========================================

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !gender ||
      !courseLevel ||
      !courseType ||
      !preferredStartDate
    ) {
      return res.status(400).json({
        success: false,
        saved: false,
        emailSent: false,
        message: "Please fill in all required fields.",
      });
    }

    // ==========================================
    // 3. Validate Privacy Policy
    // ==========================================

    if (privacyPolicy !== true) {
      return res.status(400).json({
        success: false,
        saved: false,
        emailSent: false,
        message: "Privacy Policy agreement is required.",
      });
    }

    // ==========================================
    // 4. Generate UUID
    // ==========================================

    const registrationId = uuidv4();

    // ==========================================
    // 5. Save registration to SQLite
    // ==========================================

    await db.run(
      `
        INSERT INTO registrations (
          id,
          first_name,
          last_name,
          email,
          phone,
          gender,
          course_level,
          course_type,
          preferred_start_date,
          addInfo,
          status,
          privacy_policy
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        registrationId,
        firstName,
        lastName,
        email,
        phone,
        gender,
        courseLevel,
        courseType,
        preferredStartDate,
        addInfo || null,
        "bewerber",
        privacyPolicy ? 1 : 0,
      ],
    );

    console.log(`Registration saved successfully. ID: ${registrationId}`);

    // ==========================================
    // 6. Get created_at from database
    // ==========================================

    const registration = await db.get(
      `
        SELECT created_at
        FROM registrations
        WHERE id = ?
      `,
      registrationId,
    );

    const created_at = registration?.created_at || null;

    // ==========================================
    // 7. Render customer email
    // ==========================================

    const customerEmailPath = path.join(
      process.cwd(),
      "views",
      "registerFormEmail_toCostumer.ejs",
    );

    const html = await ejs.renderFile(customerEmailPath, {
      firstName,
      lastName,
      registrationId,
      courseLevel,
      courseType,
      preferredStartDate,
      addInfo,
    });

    // ==========================================
    // 8. Render institute email
    // ==========================================

    const instituteEmailPath = path.join(
      process.cwd(),
      "views",
      "registerFormEmail_toUs.ejs",
    );

    const html2 = await ejs.renderFile(instituteEmailPath, {
      firstName,
      lastName,
      email,
      phone,
      registrationId,
      courseLevel,
      courseType,
      created_at,
      preferredStartDate,
      addInfo,
    });

    // ==========================================
    // 9. Send confirmation email to customer
    // ==========================================

    let customerEmailSent = false;
    let instituteEmailSent = false;

    const customerResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [email],
      subject: "Registration Confirmation - German Language Institute",
      html,
    });

    if (customerResult.error) {
      console.error("Customer confirmation email error:", customerResult.error);
    } else {
      customerEmailSent = true;
      console.log("Customer confirmation email sent successfully.");
    }

    // ==========================================
    // 10. Send notification email to institute
    // ==========================================

    const instituteResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: ["kontakt@gli-ms.de"],
      subject: "New Student Registration - German Language Institute",
      html: html2,
    });

    if (instituteResult.error) {
      console.error(
        "Institute notification email error:",
        instituteResult.error,
      );
    } else {
      instituteEmailSent = true;
      console.log("Institute notification email sent successfully.");
    }

    // ==========================================
    // 11. Registration was saved successfully
    // ==========================================

    // Important:
    // The registration is already stored in SQLite.
    // Therefore, an email failure does NOT mean
    // that the registration itself failed.

    if (!customerEmailSent || !instituteEmailSent) {
      return res.status(201).json({
        success: true,
        saved: true,
        emailSent: customerEmailSent,
        instituteEmailSent,
        registrationId,
        message:
          "Registration saved successfully, but one or more emails could not be sent.",
      });
    }

    // ==========================================
    // 12. Everything succeeded
    // ==========================================

    return res.status(201).json({
      success: true,
      saved: true,
      emailSent: true,
      instituteEmailSent: true,
      registrationId,
      message: "Registration submitted successfully.",
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      saved: false,
      emailSent: false,
      instituteEmailSent: false,
      message: "An unexpected error occurred.",
    });
  }
});

export default router;
