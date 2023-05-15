import User from "../model/User";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find(); // Find all users
  } catch (err) {
    console.log(err); // If there's an error, log it to the console
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" }); // If there are no users, return a 404 status and a message
  }
  return res.status(200).json({ users }); // If users are found, return a 200 status and the users
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body; // Extract the name, email, and password from the request body

  let existingUser;
  try {
    existingUser = await User.findOne({ email }); // Find the user with the given email
  } catch (err) {
    return console.log(err); // If there's an error, log it to the console
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exists! Login Instead" }); // If the user already exists, return a 400 status and a message
  }
  const hashedPassword = bcrypt.hashSync(password); // Hash the password using bcrypt

  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  }); // Create a new User using the extracted data and hashed password

  try {
    await user.save(); // Save the user
  } catch (err) {
    return console.log(err); // If there's an error, log it to the console
  }
  return res.status(201).json({ user }); // If the user is successfully created, return a 201 status with the user
};

export const login = async (req, res, next) => {
  const { email, password } = req.body; // Extract the email and password from the request body

  let existingUser;
  try {
    existingUser = await User.findOne({ email }); // Find the user with the given email
  } catch (err) {
    return console.log(err); // If there's an error, log it to the console
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Couldnt Find User By This Email" }); // If the user doesn't exist, return a 404 status and a message
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password); // Compare the password from the request body with the hashed password from the database
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" }); // If the passwords don't match, return a 400 status and a message
  }
  return res
    .status(200)
    .json({ message: "Login Successfull", user: existingUser }); // If the password is correct, return a 200 status with a success message and the user
};
