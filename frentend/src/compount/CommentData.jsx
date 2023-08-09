import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { CiFaceSmile } from "react-icons/ci";
import "../style/message.css";

function CommentData({ values }) {
  const [show, setShow] = useState(false);
  const { item, comment, setComment, feactComment } = values;

  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <button className="btn w-100 cardTitle" onClick={() => setShow(true)}>
        Veiw all {item.comments.length} comments
      </button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        className="bg-light"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {user.userName}
          </Modal.Title>
        </Modal.Header>

        <div className="commentImgTop">
          <img src={item.photo} className="userImg" />
        </div>
        <p className="text-center mb-0">Commnets</p>
        <div className="commentCardBody">
          <div className="commentBody">
            {item.comments.map((postItem) => {
              let min = postItem.postedBy.createdAt.slice(11, 13);
              let houre = postItem.postedBy.createdAt.slice(13, 16);
              let time =
                min > 12 ? `${min - 12}${houre} PM` : `${min}${houre} AM`;

              return (
                <>
                  <div>
                    {postItem.postedBy._id === user._id ? (
                      <>
                        <div className="message-orange">
                          <div className="d-flex flex-wrap gap-3 mb-2">
                            <div className="postImgTop">
                              <img
                                className="userImg"
                                src={
                                  postItem.postedBy.Photo
                                    ? postItem.postedBy.Photo
                                    : "/images/user.png"
                                }
                              />
                            </div>
                            <p>{postItem.postedBy.userName}</p>
                            <p>{`${postItem.postedBy.createdAt.slice(
                              0,
                              10
                            )} ${time}`}</p>
                          </div>
                          <pre className="message-content">
                            {postItem.comment}
                          </pre>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="message-blue">
                          <div className="d-flex flex-wrap gap-3 mb-2">
                            <div className="postImgTop">
                              <img
                                className="userImg"
                                src={
                                  postItem.postedBy.Photo
                                    ? postItem.postedBy.Photo
                                    : "/images/user.png"
                                }
                              />
                            </div>
                            <p>{postItem.postedBy.userName}</p>
                            <p>{`${postItem.postedBy.createdAt.slice(
                              0,
                              10
                            )} ${time}`}</p>
                          </div>
                          <pre className="message-content ">
                            {postItem.comment}
                          </pre>
                        </div>
                      </>
                    )}
                  </div>
                </>
              );
            })}
          </div>
          <div className="p-2">
            <div className="mb-2">
              <p className="cardTitle">{item.likes.length} Likes</p>
              <p className="cardTitle">{item.body}</p>
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
                  feactComment(item._id);
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

export default CommentData;
