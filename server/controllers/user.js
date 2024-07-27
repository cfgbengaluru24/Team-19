const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const trainerModel = require("../models/trainer");
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res) => {
  // check if the user already exists
  const { username, email, password, gender, phone, role, scheduleDate } =
    req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    if (role === "trainer") {
      const newUser = new trainerModel({
        username,
        password: hashedPassword,
        email,
        gender,
        phone,
        role,
        scheduleDate,
      });

      await newUser.save();
    }

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      gender,
      phone,
      role,
    });

    // Save the user to the database
    await newUser.save();
    return res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong in signup" });
  }
};

const signin = async (req, res) => {
  // check if user already exists
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "user not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "invalid credential" });
    }

    // jwt token
    const token = jwt.sign({ email: existingUser.email }, JWT_SECRET_KEY, {
      expiresIn: "10h",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });
    return res
      .status(201)
      .json({ user: existingUser, role: existingUser.role, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const getData = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  let user;
  try {
    user = jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

  const existingUser = await userModel.findOne({ email: user.email });
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }
  if (existingUser.role !== "trainer") {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user: existingUser });
};

module.exports = { signup, signin, getData };
