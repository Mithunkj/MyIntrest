import "../../style/carousalContainer.css";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function CarouselPage({ item, userData, deleteStory }) {
  console.log(item);
  console.log(userData);

  const [show, setShow] = useState(false);

  return (
    <>
      <div className="column" onClick={() => setShow(true)}>
        <div className="ms-3">
          <div className="postImgTop">
            <img
              className="userImg"
              src={userData?.Photo ? userData.Photo : "/images/user.png"}
              alt="followerImage"
            />
          </div>
          <p>{userData.userName}</p>
        </div>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <div className="postImgTop">
            <img
              className="userImg"
              src={userData?.Photo ? userData.Photo : "/images/user.png"}
              alt="followerImage"
            />
          </div>
          <pre className="ms-2">{userData?.userName}</pre>
          {/* <div>
            <button
              onClick={() => {
                deleteStory();
              }}
            >
              delete
            </button>
          </div> */}
        </Modal.Header>
        <Carousel fade>
          {item[0]?.image && (
            <Carousel.Item>
              <img src={item[0]?.image} class="d-block w-100" alt="..." />
              <Carousel.Caption>
                <h3>{item[0]?.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          )}
          {item[1]?.image && (
            <Carousel.Item>
              <img src={item[1]?.image} class="d-block w-100" alt="..." />
              <Carousel.Caption>
                <h3>{item[1]?.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          )}
          {item[2]?.image && (
            <Carousel.Item>
              <img src={item[2]?.image} class="d-block w-100" alt="..." />
              <Carousel.Caption>
                <h3>{item[2]?.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          )}
          {item[3]?.image && (
            <Carousel.Item>
              <img src={item[3]?.image} class="d-block w-100" alt="..." />
              <Carousel.Caption>
                <h3>{item[3]?.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          )}
          {item[4]?.image && (
            <Carousel.Item>
              <img src={item[4]?.image} class="d-block w-100" alt="..." />
              <Carousel.Caption>
                <h3>{item[4]?.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          )}
          {item[5]?.image && (
            <Carousel.Item>
              <img src={item[5]?.image} class="d-block w-100" alt="..." />
              <Carousel.Caption>
                <h3>{item[5]?.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>
      </Modal>
    </>
  );
}

export default CarouselPage;
