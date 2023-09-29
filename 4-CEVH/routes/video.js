import { Router } from "express";
import { upload } from "../config/multer.js";
import { createVideo } from "../controlers/video.js";

export const videoRoutes = Router();

// Home
videoRoutes.get("/", (req, res) => {
  res.render("form");
});

// CREATE video
videoRoutes.post("/upload", upload.array("videos"), createVideo);
