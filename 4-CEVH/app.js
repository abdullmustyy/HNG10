import express from "express";
import { Schema, model, connect } from "mongoose";
import bodyParser from "body-parser";
import chalk from "chalk";
// Environment variables
import "dotenv/config";

const app = express();

// Create video schema & model
const videoSchema = new Schema({
  title: {
    type: String,
    required: [true, "You need to provide a title"],
  },
  url: {
    type: String,
    required: [true, "You need to provide a url"],
  },
});
const Video = model("Video", videoSchema);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// DB connection and server
connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(chalk.blue("MongoDB connected"));

    app.listen(process.env.PORT, () => {
      console.log(
        chalk.yellow.underline(`Server running on port ${process.env.PORT}`)
      );
    });
  })
  .catch((err) => {
    console.log(chalk.red("DB connection failed"), err);
  });
