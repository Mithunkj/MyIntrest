import React, { useEffect, useState } from "react";
import Header from "../compount/Header";
import axios from "axios";
import PostDetail from "../compount/PostDetail";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../config/config";
import FollowingList from "../compount/FollowingList";
import FollowersList from "../compount/FollowersList";
import CarouselPage from "../compount/helper/CarouselPage";

function UserProfile() {
  const { userId } = useParams();

  const [user, setUser] = useState("");
  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [comment, setComment] = useState("");
  const [postLength, setPostLength] = useState("");
  const [loading, setLoading] = useState("false");
  const [ref, setRef] = useState(false);
  const [story, setStory] = useState([]);
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  let limit = 10;
  let skip = 0;

  const feactchUser = async () => {
    if (loading === false) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    try {
      const res = await axios.get(
        `http://localhost:8000/user/${userId}?limit=${limit}`,
        config
      );

      const resData = await res.data;

      const resAllPost = await resData.post;
      console.log(resData);
      setUser(resData.user);
      setStory(resData.user.story);
      setUserFollowing(resData.user.following);
      setUserFollowers(resData.user.followers);
      setAllPost(resAllPost);
      //setAllPost((allPost) => [...allPost, ...resAllPost]);
      setPostLength(resData.postLength);
      let id = JSON.parse(localStorage.getItem("user"))._id;

      resData.user.followers.forEach((element) => {
        if (element._id === id) {
          setIsFollow(true);
        }
      });
    } catch (error) {
      console.log(error);
      // alert(error.response.data.message);
      nav("/");
    }
  };

  const handleScroll = () => {
    if (
      document.documentElement.clientHeight + window.pageYOffset >=
      document.documentElement.scrollHeight
    ) {
      limit = limit + 10;
      //skip = skip + 10;
      feactchUser();
    }
  };

  const followUser = async (userId) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/user/follow`,
        { followId: userId },
        config
      );
      setIsFollow(true);
      const resData = await res.data.data;
      setUser(resData);
      setUserFollowing(resData.following);
      setUserFollowers(resData.followers);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const unfollowUser = async (userId) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/user/unfollow`,
        { followId: userId },
        config
      );

      setIsFollow(false);
      const resData = await res.data.data;
      setUser(resData);
      setUserFollowing(resData.following);
      setUserFollowers(resData.followers);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
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
        if (posts._id == resData._id) {
          return resData;
        } else {
          return posts;
        }
      });
      setAllPost(newData);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
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
      alert(error.response.data.message);
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
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!token) {
      nav("/login");
    }
    if (token) {
      feactchUser();
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("userProfile 195");
    if (token) {
      feactchUser();
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);
  console.log("userProfile 205");
  return (
    <>
      <div className="container contenerUser">
        <div className="userInfo">
          <div className="userImgTop">
            <img
              className="innerImg"
              src={user?.Photo ? user.Photo : "/images/user.png"}
            />
          </div>
          <div>
            <h2>{user?.userName}</h2>
            <div className="d-flex gap-2">
              <p>{postLength ? postLength : "0"} post </p>
              <p className="d-flex gap-2">
                {user?.followers ? user.followers.length : "0"}{" "}
                <FollowersList
                  data={{
                    user,
                    userFollowers,
                    followUser,
                    unfollowUser,
                    isFollow,
                    ref,
                    setRef,
                  }}
                />
              </p>
              <p className="d-flex gap-2">
                {user?.following ? user.following.length : "0"}{" "}
                <FollowingList
                  data={{
                    user,
                    userFollowing,
                    followUser,
                    unfollowUser,
                    isFollow,
                    ref,
                    setRef,
                  }}
                />
              </p>
            </div>

            <button
              onClick={() => {
                if (isFollow) {
                  unfollowUser(user._id);
                } else {
                  followUser(user._id);
                }
              }}
              className="btn btn-primary m-2"
            >
              {isFollow === false ? "Follow" : "unfollow"}
            </button>
          </div>
        </div>
        <hr />

        <CarouselPage item={story} userData={user} />
        <div className="rowCard">
          {allPost.map((item) => {
            return (
              <>
                <PostDetail
                  data={{
                    item,
                    comment,
                    setComment,
                    feactComment,
                    feactLike,
                    feactunLike,
                  }}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
