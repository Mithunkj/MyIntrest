import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const LoginCotext = createContext();

const AuthProvider = ({ children }) => {
//   const nav = useNavigate();
//   const token = localStorage.getItem(token);
//   console.log(token);
//   if (!token) {
//     nav("/login");
//   }
  console.log("this is context 1");
  return (
    <>
      <LoginCotext.Provider value={"token"}>{children}</LoginCotext.Provider>
    </>
  );
};

const useLoginContext = () => {
  return useContext(LoginCotext);
};

export { AuthProvider, LoginCotext, useLoginContext };
