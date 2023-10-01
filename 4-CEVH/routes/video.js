import { Router } from "express";
import { upload } from "../middleware/multer.js";
import {
  createVideo,
  deleteVideo,
  getAllVideao,
  getVideo,
  sendVideo,
} from "../controllers/video.js";

export const videoRoutes = Router();

// Home
videoRoutes.get("/", (req, res) => {
  res.render("form");
});

videoRoutes.get("/watch", (req, res) => {
  res.render("watch");
});

// CREATE video
videoRoutes.post("/upload", upload.array("videos"), createVideo);

// READ all videos
videoRoutes.get("/videos", getAllVideao);

// READ a video
videoRoutes.get("/videos/:videoId", getVideo);
// videoRoutes.get("/uploads/:videoName", sendVideo);

// DELETE a video
videoRoutes.delete("/videos/:videoId", deleteVideo);
