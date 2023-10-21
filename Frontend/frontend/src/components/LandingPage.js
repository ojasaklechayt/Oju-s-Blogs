import { color } from "@mui/system";
import React from "react";
import { ReactComponent as YourSvg } from '../media/1534214288.svg';
import { ReactComponent as YourFirstSvg } from '../media/Focus-rafiki.svg';

const LandingPage = () => {
    return <div style={{}}>

    <div style={{ background: "linear-gradient(to bottom right, #f2e6c5, #9dd0ff)", height: "610px", display: "flex" }}>

        <div>
            <h1 style={{ fontSize: "6rem", fontFamily: "Roboto", textAlign: "left", marginLeft: "100px", marginTop: "50px" }}>
                <div style={{ display: "inline-block" }}>
                    <div>Welcome</div>
                    <div>to my</div>
                    <div style={{fontSize: "12rem"}}>Blog</div>
                </div>
            </h1>
        </div>  
        <div style={{  float: "right", display: "flex"}}>
                <div style={{  marginLeft: "180px" }}>
                    <YourFirstSvg width="620px" height="595px"/>
                </div>
        </div>           
    </div>
</div>

};

export default LandingPage;
