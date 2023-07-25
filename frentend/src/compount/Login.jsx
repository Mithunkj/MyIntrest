import axios from "axios";
import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Api = "http://localhost:8000/auth/login";
function Login() {
  const nav = useNavigate();
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const userDetails = { email, password };

  const fetchLogin = async (e) => {
    e.preventDefault();

    console.log(userDetails);
    try {
      const res = await axios.post(Api, userDetails);
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
      <Header />
      <div className="container">
        <form onSubmit={fetchLogin} className="">
          <h4 className="text-center"> Login</h4>
          <input
            className="form-control m-2 p-2"
            placeholder="Enter email"
            type="email"
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
          <input
            className="form-control m-2 p-2"
            placeholder="Enter password"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
          <button className="btn btn-primary" type="submit ">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
