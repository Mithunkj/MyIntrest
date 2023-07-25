import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { CiFaceSmile } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function UserPostDetail({ data }) {
  const [show, setShow] = useState(false);
  const { post, user, comment, setComment, feactComment } = data;
  const [loading, setLoading] = useState(false);
  //console.log(post);
  return (
    <>
      {!loading ? (
        <>
          <div className="column">
            <img
              key={post._id}
              src={post.photo}
              className="innerImg"
              onClick={() => setShow(true)}
            />
          </div>
        </>
      ) : (
        <>
          <div className="loadingTop">
            <div className="loading"></div>
            <p className="fs-4">Loading...</p>
          </div>
        </>
      )}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {user.userName}
          </Modal.Title>
        </Modal.Header>

        <div className="commentImgTop">
          <img src={post.photo} className="userImg" />
        </div>
        <p className="text-center mb-0">Commnets</p>
        <div className="commentCardBody">
          <div className="ps-2 commentBody">
            {post.comments.map((postItem) => {
              return (
                <>
                  <p className="commentUserName">
                    {postItem.postedBy.userName}
                  </p>
                  <p className="commentDis">{postItem.comment}</p>
                </>
              );
            })}
          </div>
          <div className="p-2">
            <div className="mb-2">
              <p className="cardTitle">{post.likes.length} Likes</p>
              <p className="cardTitle">{post.body}</p>
            </div>
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
                style={{ maxHeight: "120px" }}
              ></textarea>
              <button
                onClick={() => {
                  feactComment(post._id);
                }}
                className="btn btn-primary"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default UserPostDetail;
