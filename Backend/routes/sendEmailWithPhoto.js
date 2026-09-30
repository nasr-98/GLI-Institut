import express from "express";
import path from "path";
import ejs from "ejs";
import "dotenv/config";
import { Resend } from "resend";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

const from = process.env.EMAIL_FROM || "GLI Institut <mail@contact.gli-ms.de>";

// Minimal 1x1 PNG placeholder (base64-encoded)
const placeholderImage =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

// Use Content-ID (CID) to reference inline images in HTML
// The "cid:logo" in HTML matches the contentId "logo" in the attachment

router.post("/", async (req, res) => {
  const html = await ejs.renderFile(
    path.join(process.cwd(), "views", "email1.ejs"),
  );
  try {
    await resend.emails.send({
      from,
      to: ["nasr.m.qershi@gmail.com"],
      subject: "Email with Inline Image",
      html,
      attachments: [
        {
          filename: "logo.png",
          content: placeholderImage,
          contentId: "logo",
        },
      ],
    });
    console.log("Email with inline image sent successfully!");
    console.log("Email ID:", data?.id);
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: error.message,
    });
  }
});

export default router;
