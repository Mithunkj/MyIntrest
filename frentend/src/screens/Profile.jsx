import React, { useEffect, useState } from "react";
import Header from "../compount/Header";
import axios from "axios";
import PostDetail from "../compount/PostDetail";
import ProfilePic from "../compount/ProfilePic";
import { config } from "../config/config";
import FollowingList from "../compount/FollowingList";

function Profile() {
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState("");
  const [changePic, setChangePic] = useState(false);
  const [url, setUrl] = useState();
  const [allPost, setAllPost] = useState([]);
  const [user, setUser] = useState([]);
  const [postLength, setPostLength] = useState();
  const [loading, setLoading] = useState(false);

  let limit = 12;
  let skip = 0;

  let userInfo = JSON.parse(localStorage.getItem("user"));

  const fetchAllPost = async () => {
    if (loading === false) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    const res = await axios.get(
      `http://localhost:8000/user/${userInfo._id}?limit=${limit}`,
      config
    );

    const resData = await res.data;
    const resDataPost = await resData.post;
    setAllPost(resDataPost);
    //setAllPost((allPost) => [...allPost, ...resDataPost]);
    setUser(resData.user);
    setPostLength(resData.postLength);
    //console.log(resData);
    console.log(resData);
    console.log(allPost);
  };

  const handleScroll = () => {
    if (
      document.documentElement.clientHeight + window.pageYOffset >=
      document.documentElement.scrollHeight
    ) {
      limit = limit + 12;
      //skip = skip + 6;
      fetchAllPost();
      console.log("test 1");
    }
  };

  const feactLike = async (id) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/post/like",
        { postId: id },
        config
      );
      console.log(res);
      const resData = await res.data.data;
      console.log(resData._id);

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
      console.log(res);
      const resData = await res.data.data;
      console.log(resData._id);

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

  const feactComment = async (id) => {
    if (comment !== "") {
      const res = await axios.put(
        "http://localhost:8000/post/comment",
        { text: comment, postId: id },
        config
      );
      const resData = await res.data.data;
      console.log(resData._id);

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
  };

  const changeProfilePhoto = async () => {
    console.log(url);
    try {
      const resPost = await axios.put(
        "http://localhost:8000/user/uploadProfilePic",
        { pic: url },
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

  useEffect(() => {
    fetchAllPost();
    console.log("test 3");
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("test 4");
    if (url) {
      changeProfilePhoto();
    }
  }, [url]);

  console.log(user);
  return (
    <>
      <Header />

      <div className="container contenerUser">
        <div className="userInfo">
          <ProfilePic data={{ user, changeProfilePhoto, setUrl }} />
          <div className="userInfoBody">
            <h2>{userInfo.userName}</h2>
            <div className="userInfo">
              <p>{postLength ? postLength : "0"} post </p>
              <p>{user.follower ? user.follower.length : "0"} followers</p>
              <p className="d-flex gap-2">
                {user.following ? user.following.length : "0"}
                <FollowingList user={user} />
              </p>
            </div>
          </div>
        </div>
        <hr />
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
        {/* {!loading ? (
          <></>
        ) : (
          <>
            <div className="loadingTop">
              <div className="loading"></div>
              <p className="fs-4">Loading...</p>
            </div>
          </>
        )} */}
      </div>
    </>
  );
}

export default Profile;
