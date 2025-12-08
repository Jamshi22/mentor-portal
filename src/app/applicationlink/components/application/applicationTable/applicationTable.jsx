import React from "react";
import styles from "./applicationTable.module.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDeleteapplicationLinkMutation } from "../../../../../lib/services/applicationLink";
import { useGetApplicationlinkdataQuery } from "../../../../../lib/services/applicationLink";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import AddApplicationCommon from "../../Common/AddComponent";
import AreYouSure from "../../../../../components/AreYouSuremodal/AreYouSure";
import {TailSpin} from 'react-loader-spinner'

const ApplicationTable = ({
  applicationLink,
  onDelete,
  onUpdate,
  index,
  refetch,
  loading
}) => {
  const [singleApplication, setSingleApplication] = useState();
  const [singleUpdateApplication, setsingleUpdateApplication] = useState();
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteApplication, { isLoading }] = useDeleteapplicationLinkMutation();
  const [sure, setSure] = useState(false);
  const [deleteModal, setModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteApplication(deleteId).unwrap();
      toast.success("Application Link Deleted Successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to Delete the Application Link");
    } finally {
      setModal(false);
      setDeleteId(null);
    }
  };


  if(loading){
    return (
      <div className={styles.container____}>
       <TailSpin/>
      </div>
    )
  }


  return (
    <>
      <tr className={styles.row}>
        <td className={styles.cell}>{index + 1}</td>
        <td className={styles.cell}>{applicationLink?.title}</td>
        <a
          href={applicationLink?.link ? applicationLink.link : "#"}
          target="_blank"
          rel="application_link"
          className={styles.application_link}
        >
          <td className={styles.application_link}>{applicationLink?.link}</td>
        </a>
        <td className={styles.cell}>{applicationLink?.State.name}</td>
        <td className={styles.cell}>{applicationLink?.DegreeType?.name}</td>

        <td className={styles.cell}>
          {new Date(applicationLink?.event_start).toLocaleDateString()}
        </td>
        <td className={styles.cell}>
          {new Date(applicationLink?.event_end).toLocaleDateString()}
        </td>

        <td className={styles.cell}>
          <div className={styles.ceil__parent_container}>
            <MdModeEdit
              onClick={() => {
                setSingleApplication(applicationLink);
                setIsModalOpen(true);
              }}
              size={25}
              style={{ color: "#0a9ced", cursor: "pointer" }}
            />

            <MdDelete
              onClick={() => {
                setDeleteId(applicationLink.id);
                setModal(true);
              }}
              size={20}
              style={{ color: "red", cursor: "pointer" }}
            />
          </div>
        </td>
      </tr>
      <AddApplicationCommon
        update={true}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
        applicationData={applicationLink}
        page={null}
      />
       <AreYouSure
        show={deleteModal}
        onHide={() => setModal(false)}
        onConfirm={handleDelete}
        title={'Application Link'}
      />   
    </>
  );
};

export default ApplicationTable;
