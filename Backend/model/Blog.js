import mongoose from "mongoose";

// Import Mongoose library

const Schema = mongoose.Schema;

// Create a new Mongoose Schema object

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Define the structure of a blog post document.
// The blog post has a title, description, image, and user fields.
// The title, description, and image fields are all required.
// The user field is a reference to a User document.

export default mongoose.model("Blog", blogSchema);

// Export a Mongoose model based on the blogSchema.
// The model is named "Blog" and will be used to interact with the "blogs" collection in the MongoDB database.
