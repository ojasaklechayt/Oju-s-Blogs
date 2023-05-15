import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";

// Import required libraries and modules

const app = express();

// Create a new instance of the Express app

app.use(cors());

// Enable CORS for all routes

app.use(express.json());

// Enable JSON body parsing for incoming requests

app.use("/api/user", router);

// Mount the user routes at '/api/user'

app.use("/api/blog", blogRouter);

// Mount the blog routes at '/api/blog'

mongoose
  .connect(
    "mongodb+srv://blogadmin:blogadmin@cluster0.qgghli6.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  // Connect to the MongoDB database using the provided URI

  .then(() => app.listen(5000))
  // If the connection is successful, start the server and listen on port 5000

  .then(() =>
    console.log("Connected tO Database and Listening tO Localhost 5000")
  )
  // If the server starts successfully, log a message to the console

  .catch((err) => console.log(err));
  // If there's an error connecting to the database or starting the server, log the error to the console
