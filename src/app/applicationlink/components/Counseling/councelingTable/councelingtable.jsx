import React, { useEffect } from "react";
import styles from "./councelingtable.module.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDeleteCounclingLinkMutation } from "../../../../../lib/services/counselingLink";

import AddApplicationCommon from "../../Common/AddComponent";
import { MdDelete } from "react-icons/md";

import { MdModeEdit } from "react-icons/md";

import AreYouSure from "../../../../../components/AreYouSuremodal/AreYouSure";
import {TailSpin} from 'react-loader-spinner'

const ConcelingTable = ({
  councelingLinkData,
  onDelete,
  onUpdate,
  index,
  refetch,
  loading
}) => {
  const [singlecouncelingLink, setsinglecouncelinglink] = useState();
  const [singleUpdatecounceling, setsingleUpdatecounceling] = useState();
  const [show, setShow] = useState(false);
  const [isModalOpen, setISModalOpen] = useState(false);

  const [deleteModal, setModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [deleteCounclingLink, { isLoading: deleteLoading }] =
    useDeleteCounclingLinkMutation();

  const handleDelete = async () => {
    try {
     const Deleteid =  await deleteCounclingLink(deleteId);
    //  console.log( councelingLinkData == 0,'Councelind Link Data')
      refetch();
      toast.success("counseling Link Deleted SuccessFully");
    } catch (error) {
      toast.error("Failed to Delete the Counseling Link");
    } finally {
      setModal(false);
      setDeleteId(null);
    }
  };

  if (deleteLoading) {
   return (
        <div className={styles.container____}>
         <TailSpin/>
        </div>
      )
  }


    if(loading){
      return (
        <div className={styles.container____Loading}>
         <TailSpin/>
        </div>
      )
    }
  
  

  return (
    <>
      <tr className={styles.row}>
        <td className={styles.cell}>{index + 1}</td>
        <td className={styles.cell}>{councelingLinkData?.title}</td>
        <a
          href={councelingLinkData?.link ? councelingLinkData.link : "#"}
          target="_blank"
          rel="application_link"
          className={styles.application_link}
        >
          <td className={styles.application_link}>
            {councelingLinkData?.link}
          </td>
        </a>
        <td className={styles.cell}>{councelingLinkData?.State.name}</td>
        <td className={styles.cell}>{councelingLinkData?.DegreeType?.name}</td>
        <td className={styles.cell}>
          {new Date(councelingLinkData?.event_start).toLocaleDateString()}
        </td>
        <td className={styles.cell}>
          {new Date(councelingLinkData?.event_end).toLocaleDateString()}
        </td>
        <td className={styles.cell}>
          <div className={styles.ceil__parent_container}>
            <MdModeEdit
              onClick={() => {
                setsinglecouncelinglink(councelingLinkData);
                setISModalOpen(true);
              }}
              size={25}
              style={{ color: "#0a9ced", cursor: "pointer" }}
            />
            <MdDelete
              onClick={() => {
                setDeleteId(councelingLinkData?.id);
                setModal(true);
              }}
              size={20}
              style={{ color: "red", cursor: "pointer" }}
            />
          </div>
        </td>
      </tr>
      <AddApplicationCommon
        page={null}
        update={false}
        applicationData={councelingLinkData}
        isOpen={isModalOpen}
        onClose={() => setISModalOpen(false)}
        edit={"counceling"}
        refetch={refetch}
      />
      <AreYouSure
        show={deleteModal}
        onHide={() => setModal(false)}
        onConfirm={handleDelete}
        title={"Counseling Link"}
      />
    </>
  );
};

export default ConcelingTable;
