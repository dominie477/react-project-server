const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const register = require("./routes/register");
const login = require("./routes/login");
const profile = require("./routes/profile");
const cards = require("./routes/cards");
// const carts = require("./routes/carts");
const cors = require("cors");

app.use(express.json());
// Enable Cors
app.use(cors());

mongoose
  .connect(process.env.db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("Cannot connect to server"));

//End Points
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/profile", profile);
app.use("/api/cards", cards);
// app.use("/api/carts", carts);

app.listen(PORT, () => console.log("Server started on port", PORT));
