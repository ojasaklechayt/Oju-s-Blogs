import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

// Enable cors middleware
app.use(cors({
  origin: 'https://oju-blogs.vercel.app/'
}));

// Add headers to allow cross-origin requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

mongoose
  .connect("mongodb+srv://blogadmin:blogadmin@cluster0.qgghli6.mongodb.net/Blog?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log("Connected to Database and Listening to Localhost 5000");
    });
  })
  .catch((err) => {
    console.log(err);
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
