import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Header from "../compount/Header";
import { useNavigate } from "react-router-dom";
import { config } from "../config/config";

function Createpost() {
  const [pic, setPic] = useState("/uplodeImg.jpg");
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  let user = JSON.parse(localStorage.getItem("user"));

  const handalShare = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "myintrest");
    data.append("cloud_name", "myinstrestcloud");

    if (!title || !pic) {
      if (!title) {
        alert("fill the title");
      } else {
        alert("fill the image");
      }
    } else {
      if (loading === false) {
        setLoading(true);
      } else {
        setLoading(false);
      }
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/myinstrestcloud/image/upload",
        data
      );
      setUrl(res.data.url);
    }
  };

  const postFeatch = async () => {
    if (url) {
      try {
        const resPost = await axios.post(
          "http://localhost:8000/post/createpost",
          { title, pic: url },
          config
        );
        console.log(resPost);
        alert("successfull");
        nav("/");
      } catch (error) {
        console.log(error);
        alert("faled");
      }
    }
  };
  useEffect(() => {
    postFeatch();
    console.log(url);
  }, [url]);

  const imageuplode = (e) => {
    setImage(e.target.files[0]);
    const image = URL.createObjectURL(e.target.files[0]);
    setPic(image);
  };

  
  return (
    <>
      <Header />
      <div className="conatiner">
        <div className="containerCreatePost">
          {!loading ? (
            <>
              <div className="userInfo">
                <h3>Create New Post </h3>
                <button onClick={handalShare} className="btn btn-primary">
                  Share
                </button>
              </div>
              <div className="userInfo">
                <input
                  type="file"
                  onChange={imageuplode}
                  className="form-control"
                />

                <div className="w-75 createImgTop">
                  <img src={pic} className="w-100" />
                </div>
              </div>
              <div className="userInfo">
                <div className="createPostUser">
                  <img
                    className="userImg"
                    src={
                      user.Photo
                        ? user.Photo
                        : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1689934495~exp=1689935095~hmac=71350deb4cde0675b1953db745e3b8a0d989993f5f9eee39a80815ceb22ffbf9"
                    }
                  />
                </div>
                <h4>{user.userName}</h4>
                <textarea
                  rows={2}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="Write a caption....."
                ></textarea>
              </div>
            </>
          ) : (
            <>
              <div className="loadingTop">
                <div className="loading"></div><p className="fs-4">Loading...</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Createpost;
