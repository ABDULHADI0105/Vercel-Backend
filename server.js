const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const cowRoutes = require("./routes/cowRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// ==========================================
// MIDDLEWARES
// ==========================================

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// UPLOADS
// ==========================================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ==========================================
// ROUTES
// ==========================================

// Authentication
// POST /api/auth/register
// POST /api/auth/login
app.use("/api/auth", authRoutes);


// Users
// GET    /api/users
// PUT    /api/users/:id
// DELETE /api/users/:id
//
// IMPORTANT:
// authRoutes ke andar users routes hain,
// isliye /api/users ke liye separate mount
// nahi karna. Neeche users ke liye direct routes
// create kiye gaye hain.

const {
  getUsers,
  updateUser,
  deleteUser,
} = require("./controllers/authController");

app.get("/api/users", getUsers);
app.put("/api/users/:id", updateUser);
app.delete("/api/users/:id", deleteUser);


// ==========================================
// COW ROUTES
// ==========================================

app.use("/api/cows", cowRoutes);


// ==========================================
// CONTACT ROUTES
// ==========================================

app.use("/api/contacts", contactRoutes);


// ==========================================
// API TEST ROUTE
// ==========================================

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Shahan Cattle Farm API is working 🚀",
  });
});


// ==========================================
// DEFAULT ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Shahan Cattle Farm API Running...",
  });
});


// ==========================================
// 404 API ROUTE
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});


// ==========================================
// ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


// ==========================================
// MONGODB
// ==========================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });


// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});