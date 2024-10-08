const express = require("express");
const bcryptjs = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const { authenticate } = require("../middlewares/autheticate");
const { signUpValidator } = require('./validators');

// signup
router.post('/signup', signUpValidator, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const user = new User({ name, email, password: hashPassword });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}); 
  
//Login validation
router.post("/login", [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found.");
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Authentication failed");
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.status(200).send({ token }); //404 //200 
  } catch (err) {
    next(err);
  }
});

// Get all users
router.get("/", authenticate, async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;