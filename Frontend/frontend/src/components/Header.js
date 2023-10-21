import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useStyles } from "./utils";
const Header = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [value, setValue] = useState();
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(242, 230, 197, 1) 0%, rgba(157, 208, 255, 1) 100%)",
        fontFamily:
          "Roboto"
      }}>

      <Toolbar>
        <Typography sx={{fontFamily:"Roboto", color: "#000", marginLeft: "30px"}} variant="h5">
          Oju's Blogs
        </Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
                style={{color: '#000', textTransform: 'none', fontSize: '18px', fontWeight: 'bold'}}
              />
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/myBlogs"
                label="My Blogs"
                style={{color: '#000', textTransform: 'none', fontSize: '18px', fontWeight: 'bold'}}
              />
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/blogs/add"
                label="Add Blog"
                style={{color: '#000', textTransform: 'none', fontSize: '18px', fontWeight: 'bold'}}
              />
            </Tabs>
          </Box>
        )}
          <Box display="flex" marginLeft="auto">
            {!isLoggedIn && (
              <>
                {" "}
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 10 }}
                  color="warning"
                >
                  Login / Signup
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button
                onClick={() => dispath(authActions.logout())}
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="primary"
              >
                Logout
              </Button>
            )}
          </Box>
      </Toolbar>
    </AppBar>

  );
};

export default Header;
