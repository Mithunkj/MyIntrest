import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function SingUpPage() {
  const [user, setuser] = useState("");
  const [userName, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  const fetchSingup = async (e) => {
    e.preventDefault();
    const values = { user, userName, mobileNumber, email, password };
    if (!user || !userName || !email || !mobileNumber || !password) {
      setErrorMessage("Please add all fields");
    } else {
      try {
        const res = await axios.post(
          "http://localhost:8000/auth/register",
          values
        );
        console.log(res);
        nav("/login");
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  };

  const continueWithGoogle = async (credentialResponse) => {
    try {
      console.log(credentialResponse);
      const decoded = jwt_decode(credentialResponse.credential);
      console.log(decoded);

      const values = {
        name: decoded.name,
        userName: decoded.given_name,
        email: decoded.email,
        email_verified: decoded.email_verified,
        clientId: credentialResponse.clientId,
        Photo: decoded.picture,
      };
      console.log(values);
      const res = await axios.post(
        "http://localhost:8000/auth/googleLogin",
        values
      );
      console.log(res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("login successfuly");
      nav("/welcom");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <div className="container text-center">
        <form onSubmit={fetchSingup} className="col-md-6 m-auto">
          <h4 className="text-center"> SingUp</h4>
          <p className="text-danger text-center">{errorMessage}</p>
          <input
            className="form-control m-2 p-2"
            placeholder="Enter user"
            type="text"
            onChange={(e) => {
              setuser(e.target.value);
            }}
          />
          <input
            className="form-control m-2 p-2"
            placeholder="Enter userName"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="form-control m-2 p-2"
            placeholder="Enter mobileNumber"
            type="number"
            onChange={(e) => {
              setMobileNumber(e.target.value);
            }}
          />
          <input
            className="form-control m-2 p-2"
            placeholder="Enter email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="form-control m-2 p-2"
            placeholder="Enter password"
            // type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="btn btn-primary mb-2" type="submit">
            Submit
          </button>
          <hr />
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              continueWithGoogle(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </form>
      </div>
    </>
  );
}

export default SingUpPage;
