import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { config } from "../config/config";
import CommentData from "./CommentData";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";

function PostDetail({ data }) {
  const [show, setShow] = useState(false);
  const {
    item,
    comment,
    setComment,
    feactComment,
    feactLike,
    feactunLike,
    allPost,
  } = data;

  let myName = JSON.parse(localStorage.getItem("user"));
  const nav = useNavigate();
  //console.log(post);
  const feacthDelete = async (postId) => {
    try {
      if (window.confirm("Do you really want to delete this post ?")) {
        const res = await axios.delete(
          `http://localhost:8000/post/deletePost/${postId}`,
          config
        );
        nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //console.log(item);
  return (
    <>
      <div className="column" onClick={() => setShow(true)}>
        <img key={item._id} src={item.photo} className="innerImg" />
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {myName.userName}
          </Modal.Title>
          {myName._id === item.postedBy._id ? (
            <button
              onClick={() => {
                feacthDelete(item._id);
              }}
              className="btn btn-danger ms-3"
            >
              delete
            </button>
          ) : (
            ""
          )}
        </Modal.Header>

        <div className="fullImgTop">
          <img src={item.photo} className="userImg" />
        </div>
        <div className="p-2">
          {item.likes.includes(myName._id) ? (
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
          <p className="cardTitle">{item.likes.length} Likes</p>
          <p className="cardTitle">{item.body}</p>
        </div>

        <CommentData values={{ item, comment, setComment, feactComment }} />
      </Modal>
    </>
  );
}

export default PostDetail;
