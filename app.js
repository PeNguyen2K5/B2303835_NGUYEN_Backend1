// app.js

const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const contactsRouter = require("./app/routes/contact.route");

const app = express();

app.use(cors());
app.use(express.json());

// Route chính
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

// Gắn router contacts
app.use("/api/contacts", contactsRouter);

// Route thử nghiệm
app.get("/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.get("/sayhi/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Hello ${name}`);
});

app.post("/sayhi", (req, res) => {
  const { name, age, address } = req.body;
  res.send(`${name}, ${age} years old, your address is ${address}`);
});

// ⚠️  Đưa 2 middleware xuống dưới cùng:
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
