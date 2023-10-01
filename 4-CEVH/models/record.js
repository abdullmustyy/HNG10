import { model, Schema } from "mongoose";

const redordSesionSchema = new Schema({
  sessionID: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export const RecordSession = model("RecordSession", redordSesionSchema);
