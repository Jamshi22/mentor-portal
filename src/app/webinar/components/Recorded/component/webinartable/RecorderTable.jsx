"use client";

import React, { useState } from "react";
import styles from "./RecorderTable.module.css";
// import ViewMore from "../viewmorewebinar/viewmore";
import ViewMore from "../../../Common/ViewMore/ViewMore";
import { useDeleterecordedwebinarMutation } from "../../../../../../lib/services/webinarRecorded";
import { toast } from "react-toastify"; // Importing toast from React Toastify
// import UpdateRecordedWebinar from "../Updatewebinar/updatewebinar";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import UpdateWebinarModal from "../Updatewebinar/updatewebinar";
import AreYouSure from "../../../../../../components/AreYouSuremodal/AreYouSure";

const WebinarTable = ({ webinar, onDelete, onUpdate, index, refetch }) => {
  const [singleWebinar, setSingleWebinar] = useState();
  const [updateWebinar, setupdateWebinar] = useState();
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteWebinar, { isLoading }] = useDeleterecordedwebinarMutation();

  const [deleteModal, setModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteWebinar(deleteId).unwrap();
      toast.dismiss();
      toast.success("Webinar deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete webinar!");
    }
  };

  return (
    <>
      <tr className={styles.row}>
        <td className={styles.cell}>{index + 1}</td>
        <td>
          <img
            src={webinar?.s3_image_url} // Replace with actual URL or CDN path
            alt={webinar.title}
            className={styles.thumbnail}
            height={100}
            width={100}
          />
        </td>
        <td className={styles.cell}>{`${webinar.title.slice(0, 12)}...`}</td>
        <td className={styles.cell}>{`${webinar.agenda.slice(0, 20)}...`}</td>
        <td className={styles.cell}>{webinar?.State?.name}</td>
        <td className={styles.cell}>{webinar?.DegreeType?.name}</td>
        <td className={styles.cell}>{webinar?.webinar_link}</td>
        <td className={styles.cell}>{`${webinar?.duration} hours`}</td>
        <td className={styles.cell}>
          {new Date(webinar?.conducted_date)?.toLocaleDateString()}
        </td>

        <td className={styles.cell}>{webinar?.no_of_attendees}</td>
        <td className={styles.cell}>
          <MdModeEdit
            onClick={() => {
              setupdateWebinar(webinar);
              setIsModalOpen(true);
            }}
            size={25}
            color="#0a9ced"
            style={{ cursor: "pointer" }}
          />

          <MdDelete
            onClick={() => {
              setDeleteId(webinar.id);
              setModal(true);
            }}
            size={25}
            style={{ color: "red", cursor: "pointer" }}
          />
        </td>
        <td
          onClick={() => {
            setSingleWebinar(webinar);
            setShow(true);
          }}
          className={styles.ViewMore}
        >
          view More
        </td>
      </tr>
      {show && (
        <ViewMore
          webinarDetails={singleWebinar}
          show={show}
          setShow={setShow}
          upcoming={false}
        />
      )}

      <UpdateWebinarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        webinarData={updateWebinar}
        refetch={refetch}
      />
      <AreYouSure
        show={deleteModal}
        onHide={() => setModal(false)}
        onConfirm={handleDelete}
        title={"Recorded Webinar"}
      />
    </>
  );
};

export default WebinarTable;
