import React from "react";
import Modal from "react-bootstrap/Modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./areyousure.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const AreYouSure = ({ show, onHide, onConfirm, title }) => {
  return (
    <div className="body_container___">
      <Modal show={show} onHide={onHide} size="md" centered backdrop="static">
        <Modal.Header className="heading____" closeButton></Modal.Header>
        <div className="heading_container">
          <IoIosCloseCircleOutline size={100} color={"red"} />
          <h2>Are you sure !</h2>
        </div>

        <div className="content_body_container">
          <p className="delete_title">
            Do you really want to delete this ?
          </p>
        </div>
        <div className="content_body_container">
          <p style={{color:"red"}} className="delete_title">
          {title}
          </p>
        </div>
        <div className="footer_container">
          <button className="delete_btn" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="delete_btn_cancel" onClick={onHide}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AreYouSure;
