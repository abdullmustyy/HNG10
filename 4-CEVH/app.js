import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import chalk from "chalk";
import "dotenv/config";
import fs from "fs";
import { videoRoutes } from "./routes/video.js";
import { recordRoutes } from "./routes/stream.js";

const app = express();

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// View engine
app.set("view engine", "ejs");
// Parsers
app.use("/api/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Route
app.use("/api", videoRoutes, recordRoutes);

// Home route
app.get("/", (req, res) => {
  res.redirect("/api");
});

// DB connection and server
const { MONGODB_URI, PORT } = process.env;

connect(MONGODB_URI)
  .then(() => {
    console.log(chalk.blue("MongoDB connected"));

    app.listen(PORT, () => {
      console.log(chalk.yellow.underline(`Server running on port ${PORT}`));
    });
  })
  .catch((err) => {
    console.log(chalk.red("DB connection failed"), err);
  });
