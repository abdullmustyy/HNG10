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
  },
  { timestamps: true }
);

export const Video = model("Video", videoSchema);
