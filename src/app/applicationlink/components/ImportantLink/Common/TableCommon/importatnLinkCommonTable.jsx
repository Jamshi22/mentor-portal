import React from "react";
import styles from "./table.module.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useGetImportantLinkAllQuery } from "../../../../../../lib/services/importantLink";
import { useDeleteimportantLinkMutation } from "../../../../../../lib/services/importantLink";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import AddImportanLinkcommon from "./AddimportantLink/AddCommonLink";
import AreYouSure from "../../../../../../components/AreYouSuremodal/AreYouSure";
import {TailSpin} from 'react-loader-spinner'

const ImportantLinkTable = ({
  importantLink,
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
  const [deleteimportantLink, { isLoading }] = useDeleteimportantLinkMutation();

  const [deleteModal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteimportantLink(deleteId).unwrap();
      toast.dismiss();
      toast.success("Important Link Deleted SuccessFully!");
      refetch();
    } catch (error) {
      toast.error("Failed to Delete the Important Link");
    } finally {
      setModal(false);
      setDeleteId(null);
    }
  };

  if(isLoading){
    return <TailSpin/>
  }


  if(loading) {
    return (
      <div className={styles.loading_container___}>
       <TailSpin/>
      </div>
    )
  }
  return (
    <>
      <tr className={styles.row}>
        <td className={styles.cell}>{index + 1}</td>
        <td className={styles.cell}>{importantLink?.title}</td>
        <a
          href={importantLink?.link ? importantLink.link : "#"}
          target="_blank"
          rel="application_link"
          className={styles.application_link}
        >
          <td className={styles.application_link}>{importantLink?.link}</td>
        </a>
        <td className={styles.cell}>{importantLink?.tag}</td>
        <td className={styles.cell}>{importantLink?.DegreeType?.name}</td>
        <td className={styles.cell}>{importantLink?.State?.name}</td>
        <td className={styles.cell}>
          {new Date(importantLink?.event_start).toLocaleDateString()}
        </td>
        <td className={styles.cell}>
          {new Date(importantLink?.event_end).toLocaleDateString()}
        </td>
        <td className={styles.cell}>
          <div className={styles.ceil__parent_container}>
            <MdModeEdit
              onClick={() => {
                setSingleApplication(importantLink);
                setIsModalOpen(true);
              }}
              size={25}
              style={{ color: "#0a9ced", cursor: "pointer" }}
            />
            <MdDelete
              onClick={() => {
                setDeleteId(importantLink?.id);
                setModal(true);
              }}
              size={20}
              style={{ color: "red", cursor: "pointer" }}
            />
          </div>
        </td>
      </tr>
      <AddImportanLinkcommon
        page={null}
        update={true}
        applicationData={importantLink}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
      />
      <AreYouSure
        show={deleteModal}
        onHide={() => setModal(false)}
        onConfirm={handleDelete}
        title={"Important Link"}
      />
    </>
  );
};

export default ImportantLinkTable;
