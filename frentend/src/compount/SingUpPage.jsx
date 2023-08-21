import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { signUpSchema } from "./helper/Validation";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const initialValues = {
  user: "",
  userName: "",
  mobileNumber: "",
  email: "",
  password: "",
  confirm_password: "",
};

function SingUpPage() {
  const nav = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,

      onSubmit: async (values, action) => {
        delete values.confirm_password;
        console.log(values);
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
        action.resetForm();
      },
    });
  // console.log(errors);

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
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto">
            <div className="border p-5 rounded ">
              <h1 className="section__title">Sign Up</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-2 ">
                  <label htmlFor="user" className="form-label  mb-1 mb-1">
                    User
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    name="user"
                    id="user"
                    placeholder="Enter User Name"
                    value={values.user}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                  />
                  {errors.user && touched.user ? (
                    <p className="form-error ">{errors.user}</p>
                  ) : null}
                </div>
                <div className="mb-2 ">
                  <label htmlFor="userName" className="form-label  mb-1 mb-1">
                    User Name
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    name="userName"
                    id="userName"
                    placeholder="Enter User Name"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                  />
                  {errors.userName && touched.userName ? (
                    <p className="form-error ">{errors.userName}</p>
                  ) : null}
                </div>
                <div className="mb-2">
                  <label htmlFor="mobileNumber" className="form-label  mb-1 ">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    name="mobileNumber"
                    id="mobileNumber"
                    placeholder="Enter Mobile Number"
                    value={values.mobileNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                  />
                  {errors.mobileNumber && touched.mobileNumber ? (
                    <p className="form-error">{errors.mobileNumber}</p>
                  ) : null}
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label  mb-1 ">
                    Email
                  </label>
                  <input
                    type="email"
                    autoComplete="on"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                  />
                  {errors.email && touched.email ? (
                    <p className="form-error">{errors.email}</p>
                  ) : null}
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="form-label  mb-1">
                    Password
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                  />
                  {errors.password && touched.password ? (
                    <p className="form-error">{errors.password}</p>
                  ) : null}
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="confirm_password"
                    className="form-label  mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    autoComplete="on"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="Enter Confirm Password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                  />
                  {errors.confirm_password && touched.confirm_password ? (
                    <p className="form-error">{errors.confirm_password}</p>
                  ) : null}
                </div>

                <div className="text-center mt-2 mb-3 ">
                  <button className="btn button w-100 p-2" type="submit">
                    Sign Up
                  </button>
                </div>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    continueWithGoogle(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </form>
              <p>
                Already have an account?
                <NavLink to="/login">Login now</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default SingUpPage;
