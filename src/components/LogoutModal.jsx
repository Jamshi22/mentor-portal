import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../styles/logotmodal.module.css";

const LogoutModal = ({
  handleLogout,
  isLogoutModalOpen,
  setIsLogoutModalOpen,
  openLogoutModal,
  closeLogoutModal,
}) => {
  return (
    <>
      <Modal
        show={openLogoutModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton></Modal.Header> */}
        <div>
          <div className={styles.modalContent}>
            <div className={styles.logoutText}>
              <p>Are you sure you want to logout?</p>
            </div>

            <div className={styles.modalActions}>
              <button onClick={handleLogout} className={styles.confirmButton}>
                Sign Out
              </button>
              <button
                onClick={closeLogoutModal}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogoutModal;
