import { Router } from "express";
import {
  startRecording,
  streamRecordingData,
  stopRecordingAndSaveFile,
  streamVideo,
} from "../controllers/record.js";

export const recordRoutes = Router();

// Start recording
recordRoutes.post("/start-recording", startRecording);

// Stream recording data
recordRoutes.post("/stream-recording/:sessionID", streamRecordingData);

// Stop recording and save the file
recordRoutes.post("/stop-recording/:sessionID", stopRecordingAndSaveFile);

//  stream video
recordRoutes.get("/stream/:sessionID", streamVideo);
