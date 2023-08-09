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
import Search from "./Search";
import { Carousel } from "react-bootstrap";
import CarouselPage from "../compount/helper/CarouselPage";

function FollowingPost() {
  const nav = useNavigate();
  const [allPost, setAllPost] = useState([]);
  const [refTrue, setRefTrue] = useState(false);
  const [postId, setPostId] = useState("");
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState([]);
  const [allStory, setAllStory] = useState([]);
  const [openCarousel, setOpenCarousel] = useState(false);
  const token = localStorage.getItem("token");

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
        `http://localhost:8000/user/followingpost?limit=${limit}&skip=${skip}`,
        config
      );
      const resData = await res.data;
      const resAllData = await resData.data;
      setAllPost((allPost) => [...allPost, ...resAllData]);
      setStory(resData.following[0].story);
      setAllStory(resData.following[0].following);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleScroll = () => {
    if (
      document.documentElement.clientHeight + window.pageYOffset >=
      document.documentElement.scrollHeight
    ) {
      //limit = limit + 3;
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
        console.log(posts._id);
        if (posts._id == resData._id) {
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
        if (posts._id == resData._id) {
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
          console.log(posts._id);
          if (posts._id == resData._id) {
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

  useEffect(() => {
    if (!token) {
      nav("/login");
    }
    if (token) {
      fetchAllPost();
    }

    setRefTrue(true);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="conatiner ">
        <div className="contenerAllPost">
          <Search />
          <div></div>
          <div className="d-flex" style={{ overflowX: "scroll" }}>
            {allStory?.map((items, index) => {
              return (
                <>
                  <CarouselPage
                    item={items.story}
                    userData={items}
                    storys={story}
                  />
                </>
              );
            })}
          </div>
          {allPost.map((item) => {
            return (
              <>
                <div>
                  <NavLink
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

                    <p className="cardUserName">{item.postedBy.userName}</p>
                  </NavLink>
                </div>

                <div className="cardHeader">
                  <img src={item.photo} className="userImg" />
                </div>
                <div className="cardBody">
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
                  <p className="cardTitle">{item.likes.length} Likes</p>
                  <p className="cardTitle">{item.body}</p>
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
                      className="btn btn-primary p-1"
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
    </>
  );
}

export default FollowingPost;
