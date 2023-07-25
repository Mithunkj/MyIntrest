import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { NavLink } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { CiFaceSmile } from "react-icons/ci";

function CommentData({ data }) {
  const [show, setShow] = useState(false);
  const { item, comment, setComment, feactComment } = data;
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(item);
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
          <div className="ps-2 commentBody">
            {item.comments.map((postItem) => {
              {
                /* console.log(postItem.postedBy._id); */
              }
              let min = postItem.postedBy.createdAt.slice(11, 13);
              let houre = postItem.postedBy.createdAt.slice(13, 16);
              let time =
                min > 12 ? `${min - 12}${houre} PM` : `${min}${houre} AM`;
              {
                /* console.log(postItem.postedBy.createdAt.slice(0, 10)); */
              }
              return (
                <>
                  <div className="d-flex flex-wrap gap-3 m-2">
                    <div className="postImgTop">
                      <img
                        className="userImg"
                        src={
                          postItem.postedBy.Photo
                            ? postItem.postedBy.Photo
                            : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1689934495~exp=1689935095~hmac=71350deb4cde0675b1953db745e3b8a0d989993f5f9eee39a80815ceb22ffbf9"
                        }
                      />
                    </div>
                    <p>{postItem.postedBy.userName}</p>
                    <p>{`${postItem.postedBy.createdAt.slice(
                      0,
                      10
                    )} ${time}`}</p>
                  </div>
                  <div>
                    <p>{postItem.comment}</p>
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
