const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { email, username, password } = req.body;

  const isUserAlreadyExist = userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (!isUserAlreadyExist) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    username,
    password: hashedPassword,
  });

  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    return res.status(201).json({ message: "Registered Succesfully" });
  }

  res.status(409).json({ message: "Try Again" });
}

module.exports = { registerController };
