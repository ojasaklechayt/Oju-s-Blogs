import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  backgroundImage:'linear-gradient(180deg, rgb(237, 237, 113), rgb(236, 108, 108))'
};

const customButtonStyle = {
  padding: '10px 20px',
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'box-shadow 0.13s ease',
};

const customButtonHoverStyle = {
  '&:hover': {
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'orange',
  },
};


const Auth = () => {
  const naviagte = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`https://oju-blog-backend.onrender.com/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    }
  };
  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
         backgroundColor="white"

          border='1px solid black'
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
              sx={{ borderColor: 'black', borderRadius: 3 }}
            />
          )}{" "}
         
            <TextField
              name="email"
              onChange={handleChange}
              value={inputs.email}
              type="email"
              placeholder="Email"
              margin="normal"
              sx={{ borderColor: 'black', borderRadius: 3 }}
            />
          
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
            sx={{ borderColor: 'black', borderRadius: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 3,
              marginTop: 3,
              ...customButtonStyle, 
              ...customButtonHoverStyle, 
            }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{
              borderRadius: 3,
              marginTop: 3,
              ...customButtonStyle, 
              ...customButtonHoverStyle, 
            }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
