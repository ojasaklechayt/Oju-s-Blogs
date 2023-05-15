import mongoose from "mongoose";

// Import Mongoose library

const Schema = mongoose.Schema;

// Create a new Mongoose Schema object

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],
});

// Define the structure of a user document.
// The user has a name, email, password, and blogs fields.
// The name and email fields are required.
// The email field must be unique.
// The password field is required and must be at least 6 characters long.
// The blogs field is an array of references to Blog documents.

export default mongoose.model("User", userSchema);

// Export a Mongoose model based on the userSchema.
// The model is named "User" and will be used to interact with the "users" collection in the MongoDB database.
