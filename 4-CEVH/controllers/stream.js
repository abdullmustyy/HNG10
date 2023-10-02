import fs from "fs";
import path from "path";
import { __dirname } from "../utils/dirname.js";
import { StreamSession } from "../models/stream.js";
import { Video } from "../models/video.js";
import { generateText } from "../utils/deepgram.js";

const startStream = async (req, res) => {
  try {
    const sessionId = Date.now().toString();

    await StreamSession.create({ sessionId });

    console.log("New streaming started: ", "SessionId:", sessionId);

    res.status(200).json({ sessionId });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const sendStream = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const sessionExists = await StreamSession.exists({ sessionId });

    if (!sessionExists) {
      return res.status(404).json({ error: "Session not found" });
    }

    const videoDataChunk = Buffer.from(req.body.videoDataChunk, "base64");
    const videoFile = path.join(
      __dirname,
      "../uploads",
      `${sessionId}-video.mp4`
    );
    const videoStream = fs.createWriteStream(videoFile, { flags: "a" });

    videoStream.write(videoDataChunk, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to stream video data." });
      }
    });

    console.log(`Received video data chunk for session ${sessionId}`);

    res.status(200).json({ message: "Video data chunk received successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to stream video data." });
  }
};

const stopStream = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const deleteSession = await StreamSession.findOneAndDelete({ sessionId });

    if (!deleteSession) {
      return res
        .status(404)
        .json({ error: "Session not found, could not delete" });
    }

    const videoName = `${sessionId}-video.mp4`;
    const videoUrl = req.hostname + "/uploads/" + videoName;

    const video = await Video.create({
      name: videoName,
      url: videoUrl,
    });

    res.status(201).json({ message: "Video saved successfully", video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to stop streaming and save file." });
  }
};

const streamVideo = (req, res) => {
  try {
    const { sessionId } = req.params;
    const videoURL = path.join(
      __dirname,
      "../uploads",
      `${sessionId}-video.mp4`
    );

    if (!fs.existsSync(videoURL)) {
      return res.status(404).json({ error: "Video not found" });
    }

    const stat = fs.statSync(videoURL);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(videoURL, { start, end });
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, headers);
      file.pipe(res);
    } else {
      const headers = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, headers);
      fs.createReadStream(videoURL).pipe(res);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to stream video." });
  }
};

const transcribeVideo = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const videoPath = path.join(
      __dirname,
      "../uploads",
      `${sessionId}-video.mp4`
    );
    const video = { mimetype: "video/mp4", path: videoPath };

    const videoTranscription = await generateText(video);

    if (!videoTranscription) {
      return res.status(500).json({ error: "Failed to transcribe video." });
    }

    res.status(200).json({ videoTranscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to transcribe video." });
  }
};

export { startStream, sendStream, stopStream, streamVideo, transcribeVideo };
