import express from "express";
import { Schema, model, connect } from "mongoose";
import bodyParser from "body-parser";
import chalk from "chalk";
// Environment variables
import "dotenv/config";

const app = express();

// Create a person model
const personSchema = new Schema({
  name: { type: String, required: [true, "You need to provide a name"] },
});
const Person = model("Person", personSchema);

// Body parser
app.use(bodyParser.json());

// Routes
// Home
app.get("/", (req, res) => {
  res.send("<h1>HNGxCRUD Task</h1>");
});

// CREATE person
app.post("/api", async (req, res) => {
  const { name } = req.body;

  try {
    if (name && typeof name !== "string")
      return res.status(400).json({ message: "Name must be a string" });

    const personExists = await Person.find({ name: name });

    if (personExists.length) {
      return res
        .status(409)
        .json({ message: `${name} already exists`, personExists });
    }

    const person = await Person.create({ name });

    res.status(201).json({ message: `CREATED ${name}`, person });
  } catch (error) {
    res.status(500).json({
      message: `Error creating ${name || "person"}`,
      error: `${error.errors.name.path}: ${error.errors.name.message}`,
    });
  }
});

// READ person
app.get("/api/:id", async (req, res) => {
  const { id } = req.params;
  let personName;

  try {
    const person = await Person.findById(id);

    if (!person) {
      return res.status(404).json({ message: `Person not found` });
    }

    personName = person.name;

    res.status(200).json({ message: `READ ${personName}`, person });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error finding ${personName || "person"}` });
  }
});

// UPDATE person
app.patch("/api/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  let personName;

  try {
    if (name && typeof name !== "string")
      return res.status(400).json({ message: "Name must be a string" });

    personName = await Person.findById(id).select("name");

    if (!personName) {
      return res.status(404).json({ message: `Person not found` });
    }

    await Person.findByIdAndUpdate(id, { name });

    const personUpdate = await Person.findById(id);

    res.status(200).json({
      message: `UPDATED ${personName.name} to ${name}`,
      personUpdate,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating ${personName.name || "person"}` });
  }
});

// DELETE person
app.delete("/api/:id", async (req, res) => {
  const { id } = req.params;
  let personName;

  try {
    personName = await Person.findById(id).select("name");

    if (!personName) {
      return res.status(404).json({ message: `Person not found` });
    }

    await Person.findByIdAndDelete(id);

    res.status(200).json({ message: `DELETED ${personName.name}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting ${personName.name || "person"}` });
  }
});

// DB connection and server
connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(chalk.blue("MongoDB connected"));

    app.listen(3001, () => {
      console.log(chalk.yellow.underline("Server running on port 3001"));
    });
  })
  .catch((err) => {
    console.log(chalk.red("DB connection failed"), err);
  });
