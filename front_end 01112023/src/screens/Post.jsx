import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Header from "../compount/Header";
import { useNavigate } from "react-router-dom";
import { config1 } from "../config/config";

function Post() {
  const [pic, setPic] = useState("/images/uplodeImg.jpg");
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  console.log("post page 13");
  let user = JSON.parse(localStorage.getItem("user"));

  //========================= image resize ==========================//

  const [invalidImage, setinvalidImage] = useState(null);
  let reader = new FileReader();
  const handleInputChange = (event) => {
    const imageFile = event.target.files[0];
    const imageFilname = event.target.files[0].name;

    if (!imageFile) {
      setinvalidImage("Please select image.");
      return false;
    }

    if (!imageFile.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif)$/)) {
      setinvalidImage("Please select valid image JPG,JPEG,PNG");
      return false;
    }
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        //------------- Resize img code ------------------------//
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var MAX_WIDTH = 500;
        var MAX_HEIGHT = 500;
        var width = img.width;
        var height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);
        ctx.canvas.toBlob(
          (blob) => {
            const file = new File([blob], imageFilname, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            setImage(file);
            setPic(URL.createObjectURL(imageFile));
          },
          "image/jpeg",
          1
        );
        setinvalidImage(null);
      };
      img.onerror = () => {
        setinvalidImage("Invalid image content.");
        return false;
      };
      //debugger
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  };
  //========================= image resize close ==========================//

  const postFeatch = async () => {
    if (!title) {
      return alert("add the title");
    }
    const data = new FormData();
    data.append("photo", image);
    data.append("title", title);

    if (image) {
      try {
        const resPost = await axios.post(
          "http://localhost:8000/post/createNewPost",
          data,
          config1
        );
        console.log(resPost);
        alert("successfull");
        nav("/");
      } catch (error) {
        console.log(error);
        alert("failed");
      }
    } else {
      alert("add image");
    }
  };

  const postStory = async () => {
    if (!image) {
      return alert("add your image");
    }
    const data = new FormData();
    data.append("photo", image);
    if (title) {
      data.append("title", title);
    }

    try {
      const resPost = await axios.put(
        "http://localhost:8000/user/createStory",
        data,
        config1
      );
      console.log(resPost);
      alert("successfull");
      nav("/");
    } catch (error) {
      console.log(error);
      alert("failed");
    }
  };

  return (
    <>
      <div className="conatiner">
        <div className="containerCreatePost">
          {!loading ? (
            <>
              <div className="text-center">
                <h3>Create New Post </h3>

                <button
                  onClick={postFeatch}
                  className="btn btn-light text-primary "
                >
                  Share
                </button>
                <button
                  onClick={postStory}
                  className="btn btn-light text-primary ms-3"
                >
                  Add Story
                </button>
              </div>
              <div className="userInfo">
                {invalidImage !== null ? (
                  <p className="text-danger"> {invalidImage} </p>
                ) : null}
                <div>
                  <input
                    type="file"
                    className="form-control"
                    name="upload_file"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="w-75 createImgTop">
                  <img className="w-100" src={pic} alt="UploadImage" />
                </div>
              </div>
              <div className="userInfo">
                <div className="createPostUser">
                  <img
                    className="userImg"
                    src={user.Photo ? user.Photo : "/images/personicon.jpg"}
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
                <div className="loading"></div>
                <p className="fs-5">Loading...</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Post;
