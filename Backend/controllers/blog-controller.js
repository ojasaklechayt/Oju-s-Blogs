import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user"); // Find all blogs and populate the "user" field
  } catch (err) {
    return console.log(err); // If there's an error, log it to the console
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" }); // If there are no blogs, return a 404 status and a message
  }
  return res.status(200).json({ blogs }); // If blogs are found, return a 200 status and the blogs
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body; // Extract the title, description, image, and user from the request body

  let existingUser;
  try {
    existingUser = await User.findById(user); // Find the user with the given ID
  } catch (err) {
    return console.log(err); // If there's an error, log it to the console
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable TO FInd User By This ID" }); // If the user doesn't exist, return a 400 status and a message
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  }); // Create a new Blog using the extracted data
  try {
    const session = await mongoose.startSession(); // Start a Mongoose session
    session.startTransaction(); // Start a session transaction
    await blog.save({ session }); // Save the blog using the session
    existingUser.blogs.push(blog); // Add the blog to the user's blogs array
    await existingUser.save({ session }); // Save the updated user using the session
    await session.commitTransaction(); // Commit the session transaction
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err }); // If there's an error, log it to the console and return a 500 status with the error message
  }

  return res.status(200).json({ blog }); // If the blog is successfully added, return a 200 status with the blog
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body; // Extract the title and description from the request body
  const blogId = req.params.id; // Extract the blog ID from the request parameters
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    }); // Find the blog by ID and update the title and description
  } catch (err) {
    return console.log(err); // If there's an error, log it to the console
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Update The Blog" }); // If the blog doesn't exist, return a 500 status and a message
  }
  return res.status(200).json({ blog }); // If the blog is successfully updated, return a 200 status with the updated blog
};

export const getById = async (req, res, next) => {
  const id = req.params.id; // Extract the blog ID from the request parameters
  let blog;
  try {
    blog = await Blog.findById(id); // Find the blog by ID
  } catch (err) {
    return console.log(err); // If there's an error, log it to the console
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found" }); // If the blog doesn't exist, return a 404 status and a message
  }
  return res.status(200).json({ blog }); // If the blog is found, return a 200 status with the blog
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id; // Extract the blog ID from the request parameters

  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user"); // Find the blog by ID and populate the "user" field
    await blog.user.blogs.pull(blog); // Remove the blog from the user's blogs array
    await blog.user.save(); // Save the updated user
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" }); // If the blog doesn't exist, return a 500 status and a message
  }
  return res.status(200).json({ message: "Successfully Delete" }); // If the blog is successfully deleted, return a 200 status and a message
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id; // Extract the user ID from the request parameters
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs"); // Find the user by ID and populate the "blogs" field
  } catch (err) {
    return console.log(err); // If there's an error, log it to the console
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog Found" }); // If the user doesn't exist, return a 404 status and a message
  }
  return res.status(200).json({ user: userBlogs }); // If the user is found, return a 200 status with the user's blogs
};
