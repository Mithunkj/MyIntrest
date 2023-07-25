import React from "react";
import { Nav } from "react-bootstrap";

function WelcomPage() {
  return (
    <>
      <div className="welcome">
        <div>
          <p className="display-3">MyIntrest</p>
          <p className="fs-4">Welcome to MyIntrest App</p>
          <Nav.Link href="/">
            <button className="btn btn-primary m-2">Go Home</button>
          </Nav.Link>
        </div>
      </div>
    </>
  );
}

export default WelcomPage;
