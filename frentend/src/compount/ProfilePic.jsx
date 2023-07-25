import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

function ProfilePic({ data }) {
  const { user, changeProfilePhoto, setUrl } = data;
  const [lgShow, setLgShow] = useState(false);
  const [image, setImage] = useState();

  const handalShare = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "myintrest");
    data.append("cloud_name", "myinstrestcloud");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/myinstrestcloud/image/upload",
      data
    );
    console.log(res);
    setUrl(res.data.url);
  };

  const imageuplode = (e) => {
    setImage(e.target.files[0]);
  };

  const hiddenFileInput = useRef(null);
  const handalClick = () => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    if (image) {
      handalShare();
    }
  }, [image]);

  return (
    <>
      <div className="userImgTop">
        <img
          onClick={() => setLgShow(true)}
          src={
            user.Photo
              ? user.Photo
              : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1689934495~exp=1689935095~hmac=71350deb4cde0675b1953db745e3b8a0d989993f5f9eee39a80815ceb22ffbf9"
          }
          className="innerImg"
        />
      </div>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Change Profile Photo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <div>
              <button
                onClick={handalClick}
                className="btn w-100 btn-light mb-2"
              >
                Uplode Photo
              </button>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={imageuplode}
                accept="image/*"
                className="form-control"
                style={{ display: "none" }}
              />
            </div>

            <button
              onClick={() => {
                setUrl("");
                changeProfilePhoto();
              }}
              className="btn text-danger btn-light w-100"
            >
              Remove Current Photo
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfilePic;
