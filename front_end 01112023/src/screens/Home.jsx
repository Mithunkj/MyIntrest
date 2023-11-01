import React from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { CiFaceSmile } from "react-icons/ci";
import CommentData from "../compount/CommentData";
import { config } from "../config/config";
import Profile from "./Profile";

function Home() {
  const nav = useNavigate();
  const [allPost, setAllPost] = useState([]);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("smitoken");

  console.log(allPost);
  let userId;
  if (token) {
    userId = JSON.parse(localStorage.getItem("user"))._id;
  } else {
    userId = "";
  }

  let limit = 3;
  let skip = 0;

  const fetchAllPost = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/post/allposts?limit=${limit}&skip=${skip}`,
        config
      );
      const resData = await res.data;
      const resAllData = await resData.data;
      setAllPost((allPost) => [...allPost, ...resAllData]);
    } catch (error) {
      console.log(error);
      alert("you must be login");
    }
  };

  const handleScroll = () => {
    if (
      document.documentElement.clientHeight + window.pageYOffset >=
      document.documentElement.scrollHeight
    ) {
      skip = skip + 3;
      fetchAllPost();
    }
  };

  const feactLike = async (id) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/post/like",
        { postId: id },
        config
      );
      const resData = await res.data.data;
      const newData = allPost.map((posts) => {
        if (posts._id === resData._id) {
          return resData;
        } else {
          return posts;
        }
      });
      setAllPost(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const feactunLike = async (id) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/post/unlike",
        { postId: id },
        config
      );
      const resData = await res.data.data;
      const newData = allPost.map((posts) => {
        if (posts._id === resData._id) {
          return resData;
        } else {
          return posts;
        }
      });
      setAllPost(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const feactComment = async (id) => {
    try {
      if (comment !== "") {
        const res = await axios.put(
          "http://localhost:8000/post/comment",
          { text: comment, postId: id },
          config
        );
        const resData = await res.data.data;
        const newData = allPost.map((posts) => {
          if (posts._id === resData._id) {
            return resData;
          } else {
            return posts;
          }
        });
        setAllPost(newData);
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getPost = async (postId) => {
  //   console.log(postId);
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:8000/post/${postId}`,
  //       config
  //     );
  //     const resData = await res.data.data;
  //     console.log(resData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (!token) {
      nav("/login");
    }
    if (token) {
      fetchAllPost();
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="container mt-1 ">
        <div className="row">
          <div className="col-lg-4 col-md-6 m-auto">
            {allPost.map((item) => {
              return (
                <>
                  <div>
                    <NavLink
                      y
                      to={
                        userId === item.postedBy._id
                          ? "/profile"
                          : `/profile/${item.postedBy._id}`
                      }
                      className="cardUserInfo"
                    >
                      <div className="postImgTop">
                        <img
                          className="userImg"
                          src={
                            item.postedBy.Photo
                              ? item.postedBy.Photo
                              : "/images/user.png"
                          }
                        />
                      </div>
                      <p className="">{item.postedBy.userName}</p>
                    </NavLink>
                  </div>

                  <figure>
                    <img
                      src={item?.photo ? item.photo : "/images/user.png"}
                      className="userImg"
                    />
                  </figure>
                  <div className="p-2 pb-2">
                    <div>
                      {item.likes.includes(userId) ? (
                        <span
                          onClick={() => {
                            feactunLike(item._id);
                          }}
                        >
                          <FcLike className="fs-2" />
                        </span>
                      ) : (
                        <span
                          onClick={() => {
                            feactLike(item._id);
                          }}
                        >
                          <AiOutlineHeart className="fs-2" />
                        </span>
                      )}
                    </div>
                    <p className="mb-0">{item.likes.length} Likes</p>
                    <p className="mb-0">{item.body.slice(0, 50)}...</p>
                    <CommentData
                      values={{ item, comment, setComment, feactComment }}
                    />
                    <div className="d-flex gap-2 align-items-center">
                      <CiFaceSmile className="fs-2 " />
                      <textarea
                        placeholder="Add acomment"
                        id="comment"
                        value={comment}
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                        className="form-control"
                        name="textarea"
                        rows="1"
                        cols="40"
                        style={{ maxHeight: "30px" }}
                      ></textarea>
                      <button
                        className="btn button p-2"
                        onClick={() => {
                          feactComment(item._id);
                        }}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
