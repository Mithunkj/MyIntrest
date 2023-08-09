import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { RiMovieFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import Search from "../screens/Search";
function Header() {
  console.log("this is headwr page 3");
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  const loginStatus = () => {
    const token = localStorage.getItem("token");
    console.log(token == null);

    if (token) {
      return [
        <>
          <NavLink to="/">
            <li className="navItem">Home</li>
          </NavLink>
          <NavLink to="/profile">
            <li className="navItem">Profile</li>
          </NavLink>
          <NavLink to="/followingpost">
            <li className="navItem">Following</li>
          </NavLink>
          <NavLink to="/createpost">
            <li className="navItem">Create Post</li>
          </NavLink>

          <li
            onClick={() => {
              localStorage.clear();
              nav("/login");
            }}
            className="navItem"
          >
            Log Out
          </li>
        </>,
      ];
    } else {
      return [
        <>
          <Nav.Link href="/signup">
            <li className="navItem">Signup</li>
          </Nav.Link>
          <Nav.Link href="/login">
            <li className="navItem">Login</li>
          </Nav.Link>
        </>,
      ];
    }
  };

  const loginStatusPhone = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return [
        <>
          <Nav.Link href="/">
            <AiFillHome className="fs-1 " />
          </Nav.Link>
          <NavLink to="/createpost">
            <VscDiffAdded className="fs-1" />
          </NavLink>
          <NavLink to="/followingpost">
            <RiMovieFill className="fs-1" />
          </NavLink>
          <NavLink to="/profile">
            <CgProfile className="fs-1" />
          </NavLink>
          <LuLogOut
            className="fs-1"
            onClick={() => {
              localStorage.clear();
              nav("/login");
            }}
          />
        </>,
      ];
    } else {
      return [
        <>
          <Nav.Link href="/signup">
            <li className="navItem">Signup</li>
          </Nav.Link>
          <Nav.Link href="/login">
            <li className="navItem">Login</li>
          </Nav.Link>
        </>,
      ];
    }
  };
  return (
    <>
      <div className="container-fluid headerNavLarge sticky-top bg-light p-1">
        <div className="container ">
          <div className="d-flex justify-content-between aligin-items-center">
            <div className="logoImgTop">
              <img
                src="/logo2.png"
                style={{ width: "100%", height: "100%" }}
                onClick={() => nav("/")}
              />
            </div>
            <ul className="navListLarg">{loginStatus()}</ul>
          </div>
        </div>
      </div>

      <div className="headerNavPhone sticky-top bg-light p-1">
        <div className="logoImgTop">
          <img
            src="/logo2.png"
            style={{ width: "100%", height: "100%" }}
            onClick={() => nav("/")}
          />
        </div>
        <ul className="navList">{loginStatusPhone()}</ul>
      </div>
    </>
  );
}

export default Header;
