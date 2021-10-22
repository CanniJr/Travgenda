const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

//register user
router.post("/register", async (req, res) => {
  try {
    //generate new password (using bcrypt)
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    //save user and send response
    const user = await newUser.save();
    res.status(200).json(user._id); //only shows the id
  } catch (error) {
    res.status(500).json(error);
  }
});

//login

module.exports = router;
