import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginCotext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

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
