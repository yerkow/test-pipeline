import React from "react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/">
      <img
        src="./images/logo.svg"
        style={{ color: "#fff", maxWidth: "120px" }}
        alt=""
      />
    </Link>
  );
};
