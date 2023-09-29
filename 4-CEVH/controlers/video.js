import { Video } from "../models/video.js";
import { cloudinary } from "../config/cloudinary.js";
import fs from "fs";

const createVideo = async (req, res) => {
  try {
    req.files.forEach(async (file) => {
      const { originalname } = file;

      // Upload video to cloudinary and save to database
      await cloudinary.uploader
        .upload_stream(
          {
            resource_type: "video",
            folder: "HNGxCEVH",
          },
          async (error, result) => {
            if (error) {
              console.log("Error", error);
              res.status(500).json({
                message: "Error uploading video to cloudinary.",
                error: error.message,
              });
            } else {
              const video = await Video.create({
                name: originalname,
                url: result.secure_url,
              });
              res
                .status(201)
                .json({ message: "Video uploaded successfully.", video });
            }
          }
        )
        .end(file.buffer);
    });
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ message: "Error creating video.", error: error.message });
  }
};

const getAllVideao = async (req, res) => {
  try {
    const videos = await Video.find();

    res.status(200).json({ message: "All videos.", videos });
  } catch (error) {
    res.status(404).json({ message: "No video found.", error: error.message });
  }
};

const getVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    res.status(200).json({ message: "Video found.", video });
  } catch (error) {
    res.status(404).json({ message: "Video not found.", error: error.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findByIdAndDelete(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    res.status(200).json({ message: "Video deleted successfully." });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting video.", error: error.message });
  }
};

export { createVideo, getAllVideao, getVideo, deleteVideo };
