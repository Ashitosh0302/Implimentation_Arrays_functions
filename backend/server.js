const express = require("express");
const { execSync } = require("child_process");
const app = express();
const PORT = 5000;

function runCpp(args) {
  try {
    return execSync(`./array ${args}`).toString().trim();
  } catch (err) {
    return "[]";
  }
}

// Routes
app.get("/add/:val", (req, res) => {
  const output = runCpp(`add ${req.params.val}`);
  res.json({ array: JSON.parse(output) });
});

app.get("/delete/:val", (req, res) => {
  const val = parseInt(req.params.val);
  const output = runCpp(`delete ${val}`);
  res.json({ array: JSON.parse(output) });
});

app.get("/insert/:index/:val", (req, res) => {
  const output = runCpp(`insert ${req.params.index} ${req.params.val}`);
  res.json({ array: JSON.parse(output) });
});

app.get("/search/:val", (req, res) => {
  const output = runCpp(`search ${req.params.val}`);
  res.json({ index: parseInt(output) });
});

app.get("/size", (req, res) => {
  const output = runCpp(`size`);
  res.json({ size: parseInt(output) });
});

app.get("/array", (req, res) => {
  const output = runCpp(`get`);
  res.json({ array: JSON.parse(output) });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
