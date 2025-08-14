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

async function loginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username: email }, { email: email }],
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordVaid = await bcrypt.compare(password, user.password);

  if (!isPasswordVaid) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({ message: "Login successfull" });
}

module.exports = { registerController, loginController };
