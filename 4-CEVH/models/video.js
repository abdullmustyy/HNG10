import { model, Schema } from "mongoose";

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "You need to provide a title"],
    },
    url: {
      type: String,
      required: [true, "You need to provide a url"],
    },
  },
  { timestamps: true }
);

export const Video = model("Video", videoSchema);
