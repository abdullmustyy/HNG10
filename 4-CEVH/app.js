import express from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import chalk from "chalk";
import "dotenv/config";
import { videoRoutes } from "./routes/video.js";

const app = express();

// View engine
app.set("view engine", "ejs");
// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Route
app.use("/api", videoRoutes);

// Home route
app.get("/", (req, res) => {
  res.redirect("/api");
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
