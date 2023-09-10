import express from "express";

const app = express();

app.get("/api", (req, res) => {
  // Get query parameters from the request
  const slackName = req.query.slack_name;
  const track = req.query.track;

  const date = new Date();

  // Get the current day of the week
  const currentDay = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  // Get the current UTC time
  const currentUtcTime = date.toISOString();
  const utcTime = currentUtcTime.slice(0, -5) + "Z";

  // GitHub file and repo URLs
  const githubFileUrl =
    "https://github.com/abdullmustyy/HNGx/blob/main/1-Endpoint/app.js";
  const githubRepoUrl =
    "https://github.com/abdullmustyy/HNGx/tree/main/1-Endpoint";

  // Status code
  const statusCode = 200;

  // Create the JSON response
  const response = {
    slack_name: slackName,
    current_day: currentDay,
    utc_time: utcTime,
    track: track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: statusCode,
  };

  res.json(response);
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3001`);
});
