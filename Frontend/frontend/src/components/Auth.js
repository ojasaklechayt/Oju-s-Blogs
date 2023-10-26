import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from "../API/API";

const Auth = () => {
  const naviagte = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const mailReg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  const nameReg = /^[A-Za-z\s'-]+$/;
  const allspace = /^\s*$/;
  const passReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=*!])[A-Za-z\d@#$%^&+=*!]{8,}$/;

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type) => {
    try {
      const data = await API.auth(inputs, type)
      console.log(data)
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    let isError = false;

    if (isSignup && !inputs.name) {
      toast.error('Please enter your name');
      isError = true;
    }

    else if (isSignup && (inputs.name.match(allspace) || !inputs.name.match(nameReg))) {
      toast.error('Please enter valid name');
      isError = true;
    }

    if (!inputs.email) {
      toast.error('Please enter your email');
      isError = true;
    }

    else if (!inputs.email.match(mailReg)) {
      toast.error('Please enter valid email');
      isError = true;
    }

    if (!inputs.password) {
      toast.error('Please enter your password');
      isError = true;
    }

    else if (isSignup && !inputs.password.match(passReg)) {
      toast.error('Please enter strong password');
      isError = true;
    }

    if (isError) {
      return;
    }

    try {
      const data = isSignup ? await sendRequest('signup') : await sendRequest("login");
      localStorage.setItem('userId', data.user._id);
      dispath(authActions.login());
      naviagte('/blogs');
    } catch (error) {
      toast.error(error);
      console.log("an error ocurred" + error);
      console.error(error);

    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={8}
          margin="auto"
          marginTop={5}
          marginBottom={5}
          borderRadius={5}
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
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          {
            isSignup && <p className="pass_inst">
              Password must have atleast: <br/>
              <ul>
                <li>one uppercase,</li>
                <li>one lowercase,</li>
                <li>one digit,</li>
                <li>one special character,</li>
                <li>length 8 or more</li>
              </ul>
            </p>
          }

          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="secondary"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>


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

export default Auth;
