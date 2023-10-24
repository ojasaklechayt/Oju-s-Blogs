import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Enable cors middleware
app.use(cors({
  origin: 'https://oju-blogs.vercel.app',
  // Update with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  // Include if you need to handle cookies
}));

app.use(express.json({ limit: '1000kb' }));
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose
  .connect("mongodb+srv://blogadmin:blogadmin@cluster0.qgghli6.mongodb.net/Blog?retryWrites=true&w=majority", { // Use the MONGODB_URI from your .env file
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log("Connected to Database and Listening to Localhost 5000");
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.use((req, res) => {
  res.status(404).json({
    message: "404 Not Found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
  });
});