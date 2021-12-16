const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
    res.status(200).json(user._id);
  } catch (error) {
    res.status(500).json(error);
  }
});

//login
router.post("/login", async (req, res) => {
  const errorMessage = "Incorrect Email or Password!";
  try {
    //find user
    const user = await User.findOne({ email: req.body.email });
    // if user is not found,
    if (!user) {
      return res.status(400).json(errorMessage);
    }

    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json(errorMessage);
    }

    //response status
    res.status(200).json({ email: user.email, username: user.username });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
