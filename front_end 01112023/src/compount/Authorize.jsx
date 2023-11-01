import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Authorize(props) {
  const { Component } = props;

  const token = localStorage.getItem("smitoken");

  const Navigate = useNavigate();
  useEffect(() => {
    if (token == "" || localStorage.getItem("user") == null) {
      Navigate("/login");
    }
  });
  return (
    <>
      <Component />
    </>
  );
}

export default Authorize;
