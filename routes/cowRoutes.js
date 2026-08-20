const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  addCow,
  updateCow,
  deleteCow,
} = require("../controllers/cowController");

const Cow = require("../models/Cow");

// ==========================================
// GET ALL COWS
// ==========================================

router.get("/", async (req, res) => {
  try {
    const cows = await Cow.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      cows,
    });
  } catch (error) {
    console.error("Get Cows Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cows",
      error: error.message,
    });
  }
});

// ==========================================
// GET SINGLE COW
// ==========================================

router.get("/:id", async (req, res) => {
  try {
    const cow = await Cow.findById(req.params.id);

    if (!cow) {
      return res.status(404).json({
        success: false,
        message: "Cow not found",
      });
    }

    res.status(200).json({
      success: true,
      cow,
    });
  } catch (error) {
    console.error("Get Cow Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cow",
      error: error.message,
    });
  }
});

// ==========================================
// ADD COW
// ==========================================

router.post(
  "/add",
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "galleryImages",
      maxCount: 10,
    },
    {
      name: "cowVideo",
      maxCount: 1,
    },
  ]),
  addCow
);

// ==========================================
// UPDATE COW
// ==========================================

router.put(
  "/:id",
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "galleryImages",
      maxCount: 10,
    },
    {
      name: "cowVideo",
      maxCount: 1,
    },
  ]),
  updateCow
);

// ==========================================
// DELETE COW
// ==========================================

router.delete("/:id", deleteCow);

module.exports = router;