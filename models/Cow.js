const mongoose = require("mongoose");

const cowSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    tagNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    breed: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    height: {
      type: Number,
      default: 0,
    },

    color: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    vaccinated: {
      type: Boolean,
      default: true,
    },

    healthStatus: {
      type: String,
      default: "Healthy",
    },

    feedType: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Available", "Sold", "Reserved"],
      default: "Available",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    galleryImages: [
      {
        type: String,
      },
    ],

    video: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cow", cowSchema);