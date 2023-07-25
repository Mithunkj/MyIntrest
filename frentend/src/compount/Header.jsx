import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { RiMovieFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
function Header() {
  const nav = useNavigate();
  const loginStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return [
        <>
          <Nav.Link href="/">
            <li className="navItem">Home</li>
          </Nav.Link>
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
      <div className="headerNavLarge sticky-top bg-light p-1">
        <div className="container heaerNav">
          <p className="p-2">ShermyInstrst</p>
          <ul className="navListLarg">{loginStatus()}</ul>
        </div>
      </div>

      <div className="headerNavPhone">
        <p className="p-2">ShermyInstrst</p>
        <ul className="navList">{loginStatusPhone()}</ul>
      </div>
    </>
  );
}

export default Header;
