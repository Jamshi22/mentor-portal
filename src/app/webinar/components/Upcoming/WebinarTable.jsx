"use client";

import React, { useState } from "react";
import styles from "./WebinarTable.module.css";
import { useDeleteWebinarMutation } from "../../../../lib/services/webinar";
import { toast } from "react-toastify"; // Importing toast from React Toastify
import UpdateWebinarModal from "./UpdateWebinarModal";
import ViewMore from "../../components/Common/ViewMore/ViewMore";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import AreYouSure from "../../../../components/AreYouSuremodal/AreYouSure";

const WebinarTable = ({ webinar, onDelete, onUpdate, index, refetch, webinarType }) => {
  const [singleWebinar, setSingleWebinar] = useState();
  const [updateWebinar, setupdateWebinar] = useState();
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteWebinar, { isLoading }] = useDeleteWebinarMutation();

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
            src={webinar?.thumbnail} // Replace with actual URL or CDN path
            alt={webinar.title}
            className={styles.thumbnail}
            height={100}
            width={100}
          />
        </td>
        <td className={styles.cell}>{`${webinar?.title?.slice(0, 12)}...`}</td>
        <td className={styles.cell}>{`${webinar?.description?.slice(
          0,
          20
        )}...`}</td>
        <td className={styles.cell}>{webinar?.State?.name}</td>
        <td className={styles.cell}>{webinar?.DegreeType?.name}</td>
        <td className={styles.cell}>
          {new Date(webinar.startDate).toLocaleDateString()}
        </td>

        <td className={styles.cell}>
          {new Date(webinar.startDate).toLocaleTimeString()}
        </td>
        <td className={styles.cell}>{`${webinar.webinarLink.slice(
          0,
          12
        )}...`}</td>
        <td className={styles.cell}>
          {new Date(webinar.endDate).toLocaleDateString()}
        </td>

        <td className={styles.cell}>
          {new Date(webinar.endDate).toLocaleTimeString()}
        </td>
        <td className={styles.cell}>
          <MdModeEdit
            onClick={() => {
              setupdateWebinar(webinar);
              setIsModalOpen(true);
            }}
            size={25}
            style={{ color: "#0a9ced", cursor: "pointer" }}
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
          upcoming={true}
        />
      )}

      <UpdateWebinarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        webinarData={updateWebinar}
        refetch={refetch}
        webinarType={webinarType}
      />
      <AreYouSure
        show={deleteModal}
        onHide={() => setModal(false)}
        onConfirm={handleDelete}
        title={"Upcoming Webinar"}
      />
    </>
  );
};

export default WebinarTable;
