import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Box, ListItem } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("https://oju-blog-backend.onrender.com/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <Box
      sx={{
        display: "grid",
        columnGap: 3,
        rowGap: 1,
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
          />
        ))}
    </Box>
  );
};

export default Blogs;
