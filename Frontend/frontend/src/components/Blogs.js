import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { ToastContainer, toast } from 'react-toastify'
import API from "../API/API";
const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    try {
      const data = await API.getBlogs()
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error('No response from the server');
      } else {
        toast.error('An error occurred while sending the request');
      }
      throw error;
    }

  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            key={blog._id}
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
          />
        ))}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Blogs;
