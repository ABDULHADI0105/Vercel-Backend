const express = require("express");
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

const router = express.Router();


// ===============================
// EMAIL TRANSPORTER
// ===============================
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// ===============================
// CREATE CONTACT
// ===============================
router.post("/", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      message,
    } = req.body;


    // Validation
    if (!name || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }


    // ===============================
    // SAVE TO MONGODB
    // ===============================
    const contact = await Contact.create({
      name,
      phone,
      email,
      message,
    });


    // ===============================
    // SEND EMAIL TO ADMIN
    // ===============================
    await transporter.sendMail({
      from: `"Shahan Cattle Farm" <${process.env.EMAIL_USER}>`,

      to: process.env.ADMIN_EMAIL,

      replyTo: email,

      subject: `New Contact Message from ${name}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: auto;
          border: 1px solid #ddd;
          border-radius: 10px;
          overflow: hidden;
        ">

          <div style="
            background: #225D31;
            padding: 25px;
            color: white;
          ">
            <h2 style="margin: 0;">
              New Contact Message
            </h2>
          </div>


          <div style="padding: 25px;">

            <p>
              <strong>Name:</strong>
              ${name}
            </p>

            <p>
              <strong>Phone:</strong>
              ${phone}
            </p>

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <hr style="border: none; border-top: 1px solid #ddd;" />

            <p>
              <strong>Message:</strong>
            </p>

            <div style="
              background: #f8f5e9;
              padding: 15px;
              border-radius: 8px;
              line-height: 1.6;
            ">
              ${message}
            </div>

          </div>

          <div style="
            background: #f5f5f5;
            padding: 15px 25px;
            font-size: 12px;
            color: #777;
          ">
            Shahan Cattle Farm Contact Form
          </div>

        </div>
      `,
    });


    // ===============================
    // SUCCESS
    // ===============================
    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      contact,
    });


  } catch (error) {

    console.error("Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Message could not be sent. Please try again.",
    });
  }
});


module.exports = router;