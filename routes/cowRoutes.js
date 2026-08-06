const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { addCow, updateCow, deleteCow } = require("../controllers/cowController");
const Cow = require("../models/Cow");

// GET: All Cows
router.get("/", async (req, res) => {
  try {
    const cows = await Cow.find();
    res.status(200).json(cows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Single Cow by ID
router.get("/:id", async (req, res) => {
  try {
    const cow = await Cow.findById(req.params.id);
    if (!cow) {
      return res.status(404).json({ message: "Cow not found" });
    }
    res.status(200).json(cow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Add Cow
router.post(
  "/add",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
    { name: "video", maxCount: 1 },
  ]),
  addCow
);

// PUT: Update Cow (Complete details + optional cover image/video)
router.put(
  "/:id",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updateCow
);

// DELETE: Delete Cow
router.delete("/:id", deleteCow);

module.exports = router;