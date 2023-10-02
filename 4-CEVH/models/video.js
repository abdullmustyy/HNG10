import { model, Schema } from "mongoose";

const videoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "You need to provide a file name"],
    },
    url: {
      type: String,
      required: [true, "You need to provide a url"],
    },
    transcript: {
      type: {},
      // required: [true, "You need to provide a transcript"],
    },
  },
  { timestamps: true }
);

export const Video = model("Video", videoSchema);
