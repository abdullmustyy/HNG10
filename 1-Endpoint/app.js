import express from "express";

const app = express();

app.get("/", (req, res) => {
  // Get query parameters from the request
  const slackName = req.query.slack_name;
  const track = req.query.track;

  // Get the current day of the week
  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  // Get the current UTC time
  const now = new Date();
  const currentUtcTime = now.toISOString();

  // GitHub file and repo URLs
  const githubFileUrl =
    "https://github.com/abdullmustyy/HNG10/blob/main/1-Endpoint/app.js";
  const githubRepoUrl =
    "https://github.com/abdullmustyy/HNG10/tree/main/1-Endpoint";

  // Status code
  const statusCode = 200;

  // Create the JSON response
  const response = {
    slack_name: slackName,
    current_day: currentDay,
    utc_time: currentUtcTime,
    track: track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: statusCode,
  };

  res.json(response);
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
