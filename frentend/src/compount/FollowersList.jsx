import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import Search from "../screens/Search";

function FollowersList({ data }) {
  const [show, setShow] = useState(false);
  const { user, userFollowers, followUser, unfollowUser, ref, setRef } = data;
  console.log("follower page 10");
  let token = localStorage.getItem("token");
  let userId;
  if (token) {
    userId = JSON.parse(localStorage.getItem("user"))._id;
  } else {
    userId = "";
  }

  console.log("follower 13");

  const [state, setstate] = useState({
    query: "",
    list: [],
  });
  const handleChange = (e) => {
    const results = userFollowers.filter((item) => {
      if (e.target.value === "") {
        return userFollowers;
      } else {
        return item.userName
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      }
    });
    setstate({
      query: e.target.value,
      list: results,
    });
  };

  return (
    <>
      <p variant="primary" onClick={() => setShow(true)}>
        Followers
      </p>

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
        <form className="p-3 ">
          <input
            onChange={handleChange}
            className="form-control"
            placeholder="Search UserName"
          />
        </form>

        <Modal.Body>
          <div>
            {state.query !== "" ? (
              <>
                <p>Search Result</p>
                {state.list.map((item) => {
                  return (
                    <>
                      <NavLink
                        to={
                          userId === item._id
                            ? "/profile"
                            : `/profile/${item._id}`
                        }
                      >
                        <div
                          key={item._id}
                          className="d-flex gap-3 mb-2"
                          onClick={() => {
                            setstate({ query: "", list: "" });
                            setShow(false);
                            if (ref === false) {
                              setRef(true);
                            } else {
                              setRef(false);
                            }
                          }}
                        >
                          <div className="postImgTop">
                            <img
                              className="userImg"
                              src={
                                item.Photo
                                  ? item.Photo
                                  : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1689934495~exp=1689935095~hmac=71350deb4cde0675b1953db745e3b8a0d989993f5f9eee39a80815ceb22ffbf9"
                              }
                            />
                          </div>
                          <p>{item.userName}</p>
                        </div>
                      </NavLink>
                    </>
                  );
                })}
              </>
            ) : (
              ""
            )}
            <p>Followers</p>
            {userFollowers !== "" ? (
              <>
                {userFollowers.map((item) => {
                  return (
                    <>
                      <NavLink
                        to={
                          userId === item._id
                            ? "/profile"
                            : `/profile/${item._id}`
                        }
                      >
                        <div
                          key={item._id}
                          className="d-flex gap-3 mb-2"
                          onClick={() => {
                            if (ref === false) {
                              setRef(true);
                              setShow(false);
                            } else {
                              setRef(false);
                              setShow(false);
                            }
                          }}
                        >
                          <div className="postImgTop">
                            <img
                              className="userImg"
                              src={
                                item.Photo
                                  ? item.Photo
                                  : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1689934495~exp=1689935095~hmac=71350deb4cde0675b1953db745e3b8a0d989993f5f9eee39a80815ceb22ffbf9"
                              }
                            />
                          </div>
                          <p>{item.userName}</p>
                        </div>
                      </NavLink>
                    </>
                  );
                })}
              </>
            ) : (
              <>""</>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FollowersList;
