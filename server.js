const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const cowRoutes = require("./routes/cowRoutes");
const contactRoutes = require("./routes/contactRoutes");


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Upload Folder Access
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cows", cowRoutes);
app.use("/api/contacts", contactRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Shahan Cattle Farm API Running...");
});

// Server
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server Running on Port ${process.env.PORT || 5000}`);
});