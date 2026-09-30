import express from "express";
import { Resend } from "resend";
import ejs from "ejs";
import path from "path";
import "dotenv/config";

import db, { uuidv4 } from "../database.js";

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
    // 1. Validate required fields
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
        message: "Please fill in all required fields.",
      });
    }

    // ==========================================
    // 2. Validate Privacy Policy
    // ==========================================

    if (privacyPolicy !== true) {
      return res.status(400).json({
        success: false,
        message: "Privacy Policy agreement is required.",
      });
    }

    // ==========================================
    // 3. Generate UUID
    // ==========================================

    const registrationId = uuidv4();

    // ==========================================
    // 4. Save registration to SQLite
    // ==========================================

    const result = await db.run(
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
        privacy_policy
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        privacyPolicy ? 1 : 0,
      ],
    );

    // ==========================================
    // 5. Registration saved successfully
    // ==========================================

    // console.log(`Registration saved. ID: ${registrationId}`);

    // ==========================================
    // 6. Send confirmation email
    // ==========================================

    const html = await ejs.renderFile(
      path.join(process.cwd(), "views", "registerFormEmail_toCostumer.ejs"),
      {
        firstName,
        lastName,
        registrationId,
        courseLevel,
        courseType,
        preferredStartDate,
        addInfo,
      },
    );

    const registration = await db.get(
      "SELECT created_at FROM registrations WHERE id = ?",
      registrationId,
    );

    const created_at = registration.created_at;

    const html2 = await ejs.renderFile(
      path.join(process.cwd(), "views", "registerFormEmail_toUs.ejs"),
      {
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
      },
    );

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [email],
      subject: "Registration Confirmation - German Language Institute",

      html: html,
    });

    const { data: DataToUs, error: ErrorToUs } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: ["kontakt@gli-ms.de"],
      subject: "New Student Registration - German Language Institute",

      html: html2,
    });

    // ==========================================
    // 7. Handle Resend error
    // ==========================================

    if (error) {
      console.error("Email sending error:", error);

      /*
       * IMPORTANT:
       *
       * The registration is already saved
       * in SQLite.
       *
       * Therefore we do NOT tell the user
       * that the registration failed.
       */

      return res.status(200).json({
        success: true,
        saved: true,
        emailSent: false,
        registrationId: registrationId,
        message:
          "Registration saved successfully, but the confirmation email could not be sent.",
      });
    }

    // ==========================================
    // 8. Everything succeeded
    // ==========================================

    return res.status(201).json({
      success: true,
      saved: true,
      emailSent: true,
      registrationId: registrationId,
      message: "Registration submitted successfully.",
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      saved: false,
      emailSent: false,
      message: "An unexpected error occurred.",
    });
  }
});

export default router;
