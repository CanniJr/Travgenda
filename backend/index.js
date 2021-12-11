const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((err) => console.log(err));

app.use("/pins", pinRoute);
app.use("/users", userRoute);

// Heroku build server request
app.use(express.static(path.join(__dirname, "/frontend")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on ${process.env.PORT}...`);
});
