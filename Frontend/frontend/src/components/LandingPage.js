import { color } from "@mui/system";
import React from "react";
import { ReactComponent as YourSvg } from "../media/1534214288.svg";
const LandingPage = () => {
  return (
    <div style={{}}>
      <div
        style={{
          background:
            "linear-gradient(to bottom right, rgb(246, 102, 255) 38%, rgb(49,10,123) 90%)",
          height: "730px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "5%",
          }}
        >
          <h1 style={{ fontSize: "4rem", fontFamily: "monospace" }}>
            Welcome to my blog
          </h1>
          <YourSvg width="300px" height="600px" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
