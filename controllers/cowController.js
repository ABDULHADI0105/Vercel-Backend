const Cow = require("../models/Cow");

// ==============================
// Add New Cow
// ==============================
const addCow = async (req, res) => {
  try {
    const {
      name, tagNumber, breed, gender, age, weight, height, color,
      price, vaccinated, healthStatus, feedType, status, featured,
      shortDescription, description,
    } = req.body;

    let coverImage = "";
    if (req.files && req.files.coverImage) {
      coverImage = `uploads/covers/${req.files.coverImage[0].filename}`;
    }

    let galleryImages = [];
    if (req.files && req.files.galleryImages) {
      galleryImages = req.files.galleryImages.map(
        (img) => `uploads/gallery/${img.filename}`
      );
    }

    let video = "";
    if (req.files && req.files.video) {
      video = `uploads/videos/${req.files.video[0].filename}`;
    }

    const cow = await Cow.create({
      name, tagNumber, breed, gender, age, weight, height, color,
      price, vaccinated, healthStatus, feedType, status, featured,
      shortDescription, description, coverImage, galleryImages, video,
    });

    res.status(201).json({
      success: true,
      message: "Cow Added Successfully",
      cow,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Cow (Complete Details + Files)
// ==============================
const updateCow = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.files && req.files.coverImage) {
      updateData.coverImage = `uploads/covers/${req.files.coverImage[0].filename}`;
    }

    if (req.files && req.files.video) {
      updateData.video = `uploads/videos/${req.files.video[0].filename}`;
    }

    const updatedCow = await Cow.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCow) {
      return res.status(404).json({
        success: false,
        message: "Cow not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cow Updated Successfully",
      updatedCow,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete Cow
// ==============================
const deleteCow = async (req, res) => {
  try {
    const deletedCow = await Cow.findByIdAndDelete(req.params.id);

    if (!deletedCow) {
      return res.status(404).json({
        success: false,
        message: "Cow not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cow Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addCow,
  updateCow,
  deleteCow,
};