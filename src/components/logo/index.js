import React from "react";
import logo from "./assets/logo.png";

const Logo = props => {
  return <img src={logo} alt="logo" className={props.className} />;
};

export default Logo;
