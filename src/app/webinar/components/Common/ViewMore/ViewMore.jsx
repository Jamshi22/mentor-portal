import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./page.module.css";

const ViewMore = ({ show, setShow, webinarDetails, upcoming }) => {
  console.log(webinarDetails, "webinar details");
  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header className={styles.viewmore_header} closeButton>
          <Modal.Title>{webinarDetails?.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={styles.modalContainer}>
            <div className={styles.webinarThumbnail}>
              <img
                src={webinarDetails?.s3_image_url || webinarDetails?.thumbnail}
                alt="Webinar Thumbnail"
                className={styles.thumbnailImg}
              />
            </div>

            <div className={styles.webinar_main__}>
              <h6 className={styles.webinar_fnt_head}>Webinar Agenda</h6>
              <p className={styles.webinar_fnt_para}>
                {webinarDetails?.agenda}
              </p>
            </div>

            <div className={styles.webinarDetails}>
              <div className={styles.webinar_details_input_}>
                <h6 className={styles.webinar_fnt_head}>State </h6>
                <p className={styles.webinar_fnt_para}>
                  {webinarDetails?.State?.name}
                </p>
              </div>

              <div className={styles.webinar_details_input_}>
                <h6 className={styles.webinar_fnt_head}>Degree Type</h6>
                <p className={styles.webinar_fnt_para}>
                  {webinarDetails?.DegreeType?.name} (
                  {webinarDetails?.DegreeType?.short_name})
                </p>
              </div>

              {upcoming ? (
                <div className={styles.webinar_details_input_}>
                  <h6 className={styles.webinar_fnt_head}>Start Date</h6>

                  <p className={styles.webinar_fnt_para}>
                    {new Date(
                      webinarDetails?.webinar_start_date || webinarDetails?.startDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div className={styles.webinar_details_input_}>
                  <h6 className={styles.webinar_fnt_head}>Duration</h6>

                  <p className={styles.webinar_fnt_para}>
                    {webinarDetails?.duration}
                  </p>
                </div>
              )}

              {upcoming && (
                <div className={styles.webinar_details_input_}>
                  <h6 className={styles.webinar_fnt_head}>Start Time</h6>

                  <p className={styles.webinar_fnt_para}>
                    {webinarDetails?.webinar_start_time || new Date(webinarDetails?.startDate).toLocaleTimeString()}
                  </p>
                </div>
              )}

              {upcoming && (
                <div className={styles.webinar_details_input_}>
                  <h6 className={styles.webinar_fnt_head}>End Date</h6>

                  <p className={styles.webinar_fnt_para}>
                    {new Date(
                      webinarDetails?.webinar_end_date || webinarDetails?.endDate
                    ).toLocaleDateString()}
                  </p>
                  
                </div>
              )}

              {upcoming && (
                <div className={styles.webinar_details_input_}>
                  <h6 className={styles.webinar_fnt_head}>End Time</h6>

                  <p className={styles.webinar_fnt_para}>
                    {webinarDetails?.webinar_end_time || new Date(webinarDetails?.endDate).toLocaleTimeString() }
                  </p>
                </div>
              )}

              {upcoming ? (
                ""
              ) : (
                <div className={styles.webinar_details_input_}>
                  <h6 className={styles.webinar_fnt_head}>Conducted Date</h6>
                  <p className={styles.webinar_fnt_para}>
                    {new Date(
                      webinarDetails?.conducted_date
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}

              {upcoming ? (
                ""
              ) : (
                <div className={styles.webinar_details_input_}>
                  <h6 className={styles.webinar_fnt_head}>No of attendees</h6>
                  <p className={styles.webinar_fnt_para}>
                    {webinarDetails?.no_of_attendees}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewMore;
