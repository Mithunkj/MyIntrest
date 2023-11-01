import React, { useEffect, useState } from "react";
import axios from "axios";
import PostDetail from "../compount/PostDetail";
import ProfilePic from "../compount/ProfilePic";
import { config } from "../config/config";
import FollowingList from "../compount/FollowingList";
import FollowersList from "../compount/FollowersList";
import CarouselPage from "../compount/helper/CarouselPage";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [comment, setComment] = useState("");
  const [url, setUrl] = useState();
  const [allPost, setAllPost] = useState([]);
  const [user, setUser] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [story, setStory] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [postLength, setPostLength] = useState();
  const [loading, setLoading] = useState(false);
  const [ref, setRef] = useState(false);

  const nav = useNavigate();
  let limit = 12;
  let skip = 0;
  const token = localStorage.getItem("smitoken");
  let userInfo;
  if (token && localStorage.getItem("user")) {
    userInfo = JSON.parse(localStorage.getItem("user"));
  } else {
    userInfo = "";
  }

  const fetchAllPost = async () => {
    if (loading === false) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    try {
      const res = await axios.get(
        `http://localhost:8000/user/${userInfo._id}?limit=${limit}`,
        config
      );

      const resData = await res.data;
      const resDataPost = await resData.post;
      setAllPost(resDataPost);
      //setAllPost((allPost) => [...allPost, ...resDataPost]);
      console.log("setting user info ");
      setUser(resData.user);
      setUserFollowing(resData.user.following);
      setUserFollowers(resData.user.followers);
      setPostLength(resData.postLength);
      setStory(resData.user.story);
      let id = JSON.parse(localStorage.getItem("user"))._id;
      resData.user.followers.forEach((element) => {
        if (element._id === id) {
          setIsFollow(true);
        }
      });
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
      limit = limit + 12;
      //skip = skip + 6;
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
  };

  const changeProfilePhoto = async () => {
    const formdata = new FormData();
    formdata.append("photo", url);
    try {
      const resPost = await axios.put(
        "http://localhost:8000/user/uploadProfilePic",
        formdata,
        config
      );
      const resData = await resPost.data.data;
      setUser(resData);
      console.log(resPost.data.data);
      alert("successfull");

      //window.location.reload();
    } catch (error) {
      console.log(error);
      alert("faled");
    }
  };

  const followUser = async (userId) => {
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
  };

  const unfollowUser = async (userId) => {
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
  };

  const deleteStory = async (id) => {
    console.log("delete story");
    // const res = await axios.put(
    //   "http://localhost:8000/user/deleteStory",
    //   { storyId: id },
    //   config1
    // );

    console.log(id);
  };
  useEffect(() => {
    if (!token) {
      nav("/login");
    }
    if (token) {
      if (!userInfo) {
        nav("/");
      } else {
        fetchAllPost();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (url) {
      changeProfilePhoto();
    }
  }, [url]);

  return (
    <>
      <div className="container contenerUser">
        <div className="userInfo">
          {console.log("profile page 207")}
          <ProfilePic data={{ user, changeProfilePhoto, setUrl }} />
          <div className="userInfoBody">
            <h2>{userInfo.userName}</h2>
            <div className="userInfo">
              <p>{postLength ? postLength : "0"} Post</p>
              <p>
                {user.followers ? user.followers.length : "0"}
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
              <p>
                {user.following ? user.following.length : "0"}
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
          </div>
        </div>
        <hr />

        <CarouselPage
          item={story}
          userData={userInfo}
          deleteStory={deleteStory}
        />

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
                    allPost,
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

export default Profile;
