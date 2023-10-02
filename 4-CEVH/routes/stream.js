import { Router } from "express";
import {
  startStream,
  sendStream,
  stopStream,
  streamVideo,
  transcribeVideo,
} from "../controllers/stream.js";

export const recordRoutes = Router();

// Start streaming
recordRoutes.post("/start-stream", startStream);

// Send streaming data
recordRoutes.post("/send-stream/:sessionId", sendStream);

// Stop streaming and save the file
recordRoutes.post("/stop-stream/:sessionId", stopStream);

//  stream video
recordRoutes.get("/stream/:sessionId", streamVideo);

// Transcribe video
recordRoutes.get("/transcribe/:sessionId", transcribeVideo);
