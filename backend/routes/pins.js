const router = require("express").Router();
const Pin = require("../models/Pin");

//Allow Cors
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//create pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete pins
router.delete("/:id", async (req, res) => {
  try {
    Pin.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
