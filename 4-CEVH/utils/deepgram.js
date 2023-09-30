// Example filename: index.js
import "dotenv/config";
import fs from "fs";
import pkg from "@deepgram/sdk";

const { Deepgram } = pkg;

export const generateText = async (video) => {
  try {
    const { mimetype: fileMimetype, path } = video;

    // Your Deepgram API Key
    const deepgramApiKey = process.env.DEEPGRAM_API_KEY;

    // Location of the file you want to transcribe. Should include filename and extension.
    // Example of a local file: ../../Audio/life-moves-pretty-fast.wav
    // Example of a remote file: https://static.deepgram.com/examples/interview_speech-analytics.wav
    const file = path;

    // Mimetype for the file you want to transcribe
    // Only necessary if transcribing a local file
    // Example: audio/wav
    const mimetype = fileMimetype;

    // Initialize the Deepgram SDK
    const deepgram = new Deepgram(deepgramApiKey);

    let source;

    // Check whether requested file is local or remote, and prepare accordingly
    if (file.startsWith("http")) {
      // File is remote
      // Set the source
      source = {
        url: file,
      };
    } else {
      // File is local
      // Open the audio file
      const audio = fs.readFileSync(file);

      // Set the source
      source = {
        buffer: audio,
        mimetype: mimetype,
      };
    }

    // Send the audio to Deepgram and get the response
    const videoTranscription = await deepgram.transcription.preRecorded(
      source,
      {
        smart_format: true,
        model: "nova",
      }
    );

    // Write the response to the console
    return videoTranscription.results.channels[0].alternatives[0].transcript;

    // Write only the transcript to the console
    //console.dir(videoTranscription.results.channels[0].alternatives[0].transcript, { depth: null });
  } catch (error) {
    console.log(error);
  }
};
