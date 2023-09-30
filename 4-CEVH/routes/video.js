import { Router } from "express";
import { upload } from "../middleware/multer.js";
import {
  createVideo,
  deleteVideo,
  getAllVideao,
  getVideo,
} from "../controllers/video.js";

export const videoRoutes = Router();

// Home
videoRoutes.get("/", (req, res) => {
  res.render("form");
});

// CREATE video
videoRoutes.post("/upload", upload.array("videos"), createVideo);

// READ all videos
videoRoutes.get("/videos", getAllVideao);

// READ a video
videoRoutes.get("/videos/:videoId", getVideo);

// DELETE a video
videoRoutes.delete("/videos/:videoId", deleteVideo);
