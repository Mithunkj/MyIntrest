import React, { useEffect, useState } from "react";
import Header from "../compount/Header";
import axios from "axios";
import PostDetail from "../compount/PostDetail";
import { useParams } from "react-router-dom";
import UserPostDetail from "../compount/UserPostDetail";
import { config } from "../config/config";
import CommentData from "../compount/CommentData";

// const config = {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// };

function UserProfile() {
  const { userId } = useParams();
  console.log(userId);
  const [user, setUser] = useState("");
  const [allPost, setAllPost] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const [postLength, setPostLength] = useState("");
  const [loading, setLoading] = useState("false");

  let limit = 10;
  let skip = 0;

  const feactchUser = async () => {
    if (loading === false) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    const res = await axios.get(
      `http://localhost:8000/user/${userId}?limit=${limit}`,
      config
    );
    const resData = await res.data;
    // console.log(resData);
    // console.log(resData.user);
    console.log(resData);
    // console.log(resData.user.followers);
    const resAllPost = await resData.post;
    setUser(resData.user);
    setAllPost(resAllPost);
    //setAllPost((allPost) => [...allPost, ...resAllPost]);
    setPostLength(resData.postLength);
    let id = JSON.parse(localStorage.getItem("user"))._id;
    console.log(id);
    if (resData.user.followers.includes(id)) {
      setIsFollow(true);
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
    const res = await axios.put(
      `http://localhost:8000/user/follow`,
      { followId: userId },
      config
    );
    setIsFollow(true);
    console.log(res);
  };

  const unfollowUser = async (userId) => {
    const res = await axios.put(
      `http://localhost:8000/user/unfollow`,
      { followId: userId },
      config
    );
    setIsFollow(false);
    console.log(res);
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
      console.log(res.data);
      if (like === false) {
        setLike(true);
      } else {
        setLike(false);
      }
      setComment("");
    }
  };

  useEffect(() => {
    feactchUser();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFollow, like]);
  // console.log(posts);
  // console.log(isFollow);
  return (
    <>
      <Header />

      <div className="container contenerUser">
        {/* {!loading ? (
          <>
          
          </>
        ) : (
          <>
            <div className="loadingTop">
              <div className="loading"></div>
              <p className="fs-4">Loading...</p>
            </div>
          </>
        )} */}
        <div className="userInfo">
          <div className="userImgTop">
            <img
              className="innerImg"
              src={
                user.Photo
                  ? user.Photo
                  : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1689934495~exp=1689935095~hmac=71350deb4cde0675b1953db745e3b8a0d989993f5f9eee39a80815ceb22ffbf9"
              }
            />
          </div>
          <div>
            <h2>{user.userName}</h2>
            <div className="d-flex gap-2">
              <p>{postLength ? postLength : "0"} post </p>
              <p>{user.followers ? user.followers.length : "0"} followers</p>
              <p>{user.following ? user.following.length : "0"} following</p>
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
              {isFollow ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
        <hr />
        <div className="rowCard">
          {allPost.map((item) => {
            return (
              <>
                {/* <UserPostDetail
                  data={{ post, user, comment, setComment, feactComment }}
                /> */}
                <PostDetail
                  data={{ item, comment, setComment, feactComment ,feactLike,feactunLike }}
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
