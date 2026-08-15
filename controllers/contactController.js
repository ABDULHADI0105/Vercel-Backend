const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createContact = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // Validation
    if (!name || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    // Save contact in MongoDB
    const contact = await Contact.create({
      name,
      phone,
      email,
      message,
    });

    // Send email to admin
    await transporter.sendMail({
      from: `"Shahan Cattle Farm" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Contact Message from ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto;">

          <div style="
            background: #225D31;
            padding: 20px;
            color: white;
            border-radius: 10px 10px 0 0;
          ">
            <h2 style="margin: 0;">
              New Contact Message
            </h2>
          </div>

          <div style="
            padding: 25px;
            border: 1px solid #ddd;
            border-top: none;
          ">

            <p>
              <strong>Name:</strong> ${name}
            </p>

            <p>
              <strong>Phone:</strong> ${phone}
            </p>

            <p>
              <strong>Email:</strong> ${email}
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <div style="
              background: #f8f5e9;
              padding: 15px;
              border-radius: 8px;
            ">
              ${message}
            </div>

          </div>

        </div>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      contact,
    });

  } catch (error) {
    console.error("Contact Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Message could not be sent. Please try again.",
    });
  }
};

module.exports = {
  createContact,
};