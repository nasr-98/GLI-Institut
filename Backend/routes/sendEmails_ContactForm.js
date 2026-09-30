import express from "express";
import { Resend } from "resend";
import ejs from "ejs";
import path from "path";
import "dotenv/config";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, course, message } = req.body;

    // ----------------------------------
    // Validate required fields
    // ----------------------------------

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    // ----------------------------------
    // Validate email
    // ----------------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // ----------------------------------
    // Render email templates
    // ----------------------------------

    const html = await ejs.renderFile(
      path.join(process.cwd(), "views", "contactFormEmail_toUs.ejs"),
      {
        name,
        email,
        phone,
        course,
        message,
      },
    );

    const html2 = await ejs.renderFile(
      path.join(process.cwd(), "views", "contactFormEmail_toCostumer.ejs"),
      {
        name,
      },
    );

    // ----------------------------------
    // Send contact email
    // ----------------------------------

    const { data: contactData, error: contactError } = await resend.emails.send(
      {
        from: "GLI Contact Form <mail@contact.gli-ms.de>",
        to: ["kontakt@gli-ms.de"],
        replyTo: email,
        subject: `New Contact Form Message - ${name}`,
        html,
      },
    );

    if (contactError) {
      console.error("Contact email error:", contactError);

      return res.status(500).json({
        success: false,
        message: "Failed to send contact email.",
      });
    }

    // ----------------------------------
    // Send confirmation email
    // ----------------------------------

    const { data: welcomeData, error: welcomeError } = await resend.emails.send(
      {
        from: "GLI Institut <mail@contact.gli-ms.de>",
        to: [email],
        subject: "We've Received Your Message",
        html: html2,
      },
    );

    if (welcomeError) {
      console.error("Welcome email error:", welcomeError);

      return res.status(500).json({
        success: false,
        message:
          "Your message was received, but the confirmation email could not be sent.",
      });
    }

    // ----------------------------------
    // Success
    // ----------------------------------

    console.log("Contact email sent:", contactData);
    console.log("Welcome email sent:", welcomeData);

    return res.status(200).json({
      success: true,
      message: "Emails sent successfully.",
    });
  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

export default router;
