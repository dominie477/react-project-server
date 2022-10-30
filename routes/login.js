const express = require("express");
const router = express.Router();
const User = require("../models/User");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginSchema = joi.object({
  email: joi.string().required().min(6).email(),
  password: joi.string().required().min(8),
});

router.post("/", async (req, res) => {
  try {
    // Joi Validation
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // Check if user Email exist
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    // Check if password is correct (Decrypt)
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) return res.status(400).send("Invalid email or password");

    // token
    const generatedToken = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.secretKey
    );
    res.status(200).send({ token: generatedToken });
  } catch (error) {
    res.status(400).send("Error in post login!");
  }
});

module.exports = router;
