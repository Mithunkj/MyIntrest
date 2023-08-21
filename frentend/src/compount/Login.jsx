import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { logInSchema } from "./helper/Validation";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const nav = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: logInSchema,
      onSubmit: async (values, action) => {
        try {
          const res = await axios.post(
            "http://localhost:8000/auth/login",
            values
          );
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          alert("login successfuly");
          nav("/welcom");
        } catch (error) {
          console.log(error);
          alert(error.response.data.message);
        }
        action.resetForm();
      },
    });
  // console.log(errors);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto">
            <div className="border p-5 rounded">
              <h1 className="title">LogIn</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="email"
                    autoComplete="on"
                    name="email"
                    id="email"
                    placeholder="Enter Mobile Number"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                  />
                  {errors.email && touched.email ? (
                    <p className="form-error">{errors.email}</p>
                  ) : null}
                </div>
                <div className="mb-4 ">
                  <label htmlFor="password" className="form-label mb-1">
                    Password
                  </label>
                  <input
                    type="password"
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

                <div className="text-center mt-2 mb-3">
                  <button className="btn button w-100 p-2" type="submit">
                    Login
                  </button>
                </div>
                <div className="text-center">
                  <NavLink to="/signup">
                    <p>New User? Create an account</p>
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
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

export default Login;
