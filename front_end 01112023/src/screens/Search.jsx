import axios from "axios";
import React, { useState } from "react";
import { config } from "../config/config";
import { useNavigate } from "react-router-dom";

function Search() {
  const [text, setText] = useState("");
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState("");

  const nav = useNavigate();
  let token = localStorage.getItem("smitoken");
  let userId;
  if (token) {
    userId = JSON.parse(localStorage.getItem("user"))._id;
  } else {
    userId = "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text !== "") {
      try {
        const res = await axios.get(
          `http://localhost:8000/user/searchUser?key=${text}`,
          config
        );
        const resData = await res.data.user;
        console.log(res);
        setUser(resData);
        const resPost = await res.data.post;
        setPosts(resPost);
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="container searchContainer">
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => {
              setText(e.target.value);
              setValue(e.target.value);
            }}
            type="text"
            className="form-control m-2"
            placeholder="Search"
          />
        </form>
        <div>
          {value !== "" ? (
            <>
              {user.length || posts.length !== 0 ? (
                <>
                  <div className="searchResult">
                    {user.map((item) => {
                      return (
                        <>
                          <div
                            key={item._id}
                            className="d-flex gap-3 p-1"
                            onClick={() => {
                              nav(
                                userId === item._id
                                  ? "/profile"
                                  : `/profile/${item._id}`
                              );
                            }}
                          >
                            <div className="postImgTop">
                              <img
                                className="userImg"
                                src={
                                  item.Photo
                                    ? item.Photo
                                    : "/images/personicon.jpg"
                                }
                              />
                            </div>
                            <p>{item.userName}</p>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="rowCard">
                    {posts.map((item) => {
                      return (
                        <>
                          <div className="column">
                            <img
                              key={item._id}
                              src={item.photo}
                              className="innerImg"
                              target="_blank"
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              ) : (
                <img src="/images/search.jpg" style={{ width: "100%" }} />
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
