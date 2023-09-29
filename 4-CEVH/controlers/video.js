import { Video } from "../models/video.js";
import { cloudinary } from "../config/cloudinary.js";
import fs from "fs";

const createVideo = async (req, res) => {
  try {
    const { title } = req.body;
    const { path } = req.file;

    // Upload video to cloudinary and save to database
    const videoResponse = await cloudinary.uploader.upload(
      path,
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
          fs.unlinkSync(path);

          const video = await Video.create({
            title,
            url: result.secure_url,
          });
          res
            .status(201)
            .json({ message: "Video uploaded successfully.", video });
        }
      }
    );

    console.log("Video url:", videoResponse.secure_url);
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ message: "Error creating video.", error: error.message });
  }
};

export { createVideo };
