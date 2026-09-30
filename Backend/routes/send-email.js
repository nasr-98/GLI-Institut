import express from "express";
import React from "react";
import { Resend } from "resend";
import ContactConfirmationEmail from "../../email/welcome.jsx";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  try {
    await resend.emails.send({
      from: "contact@contact.gli-ms.de",
      to: "nasr.m.qershi@gmail.com",
      subject: "hello world",
      react: React.createElement(ContactConfirmationEmail, {
        name: "Nasr",
      }),
    });

    return res.status(200).json({
      status: "OK",
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: error.message,
    });
  }
});

export default router;
