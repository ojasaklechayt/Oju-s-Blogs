import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const naviagte = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const mailReg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  const nameReg = /^[A-Za-z\s'-]+$/;
  const allspace = /^\s*$/;
  const passReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=*!])[A-Za-z\d@#$%^&+=*!]{8,}$/;

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

  const handleErrors = async ()=>{
    var error = {
      nameError : false,
      passError : false,
      mailError : false
    }
    error.nameError = isSignup && (inputs.name.match(allspace) || !inputs.name.match(nameReg))
    error.mailError = !inputs.email.match(mailReg)
    error.passError = !inputs.password.match(passReg)

    return error;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    //validating inputs before sending any request
    handleErrors()
    .then((error)=>{
      if(error.nameError){
        alert("Kindly give valid name")
      }
      if(error.mailError){
        alert("Kindly give valid email")
      }
      if(error.passError){
        alert("Kindly enter strong password")
      }
      else{
        if (isSignup) {
          sendRequest("signup")
          .then((data) => localStorage.setItem("userId", data.user._id))
          .then(() => dispath(authActions.login()))
          .then(() => naviagte("/blogs"))
          .catch(()=>{
            alert("Sorry something went wrong during signup.")
          })
        } else {
          sendRequest()
          .then((data) => localStorage.setItem("userId", data.user._id))
          .then(() => dispath(authActions.login()))
          .then(() => naviagte("/blogs"))
          .catch(()=>{
            alert("Something went wrong. Enter valid login credentials")
          })
        }
      }
    })
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
          padding={3}
          margin="auto"
          marginTop={5}
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
            )}{" "}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
            />
            {
              isSignup && 
              <p>
                Password must be atleast 8 characters <br/>
                atleast one lower case, one uppercase <br/>
                atleast one digit, one special character 
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
    </div>
  );
};

export default Auth;
