import React from "react";
import { Nav } from "react-bootstrap";

function WelcomPage() {
  console.log("this is welcom page 1");
  return (
    <>
      <div className="welcome ">
        <div className="container">
          <img src="/logo2.png" style={{ width: "100%" }} />

          <p className="fs-4" style={{ color: "#8903fd" }}>
            Welcome to ShareMyInterest App
          </p>
          <Nav.Link href="/">
            <button className="btn button m-2 p-2">Go Home</button>
          </Nav.Link>
        </div>
      </div>
    </>
  );
}

export default WelcomPage;
