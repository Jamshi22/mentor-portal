import React from "react";
import styles from "./table.module.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDeleteExpertVideoMutation } from "../../../../lib/services/externalLink";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import LoadingDots from "../../../../components/LoadingDots";
import AddUpdateExpertLink from "../AddExpertLink/AddExpertLink";
import AreYouSure from "../../../../components/AreYouSuremodal/AreYouSure";

const ExpertLinkTable = ({
  ExpertLinkData,
  onDelete,
  onUpdate,
  index,
  refetch,
}) => {
  const [singleApplication, setSingleApplication] = useState();
  const [singleUpdateApplication, setsingleUpdateApplication] = useState();
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteExpertVideo, { isLoading: deleteLoading }] =
    useDeleteExpertVideoMutation();

  const [deleteModal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteExpertVideo(deleteId).unwrap();
      toast.dismiss();
      toast.success("Experts Link Deleted SuccessFully!");
      refetch();
    } catch (error) {
      toast.error("Failed to Delete the Experts Link");
    } finally {
      setModal(false);
      setDeleteId(null);
    }
  };

  if (deleteLoading) {
    return <LoadingDots />;
  }
  return (
    <>
      <tr className={styles.row}>
        <td className={styles.cell}>{index + 1}</td>
        <td className={styles.cell}>{ExpertLinkData?.title}</td>

        <td className={styles.cell}>{ExpertLinkData?.description}</td>
        <a
          href={ExpertLinkData?.link ? ExpertLinkData.link : "#"}
          target="_blank"
          rel="application_link"
          className={styles.application_link}
        >
          <td className={styles.application_link}>{ExpertLinkData?.link}</td>
        </a>

        {/* For Future Uses */}
        {/* <td className={styles.cell}>{ExpertLinkData?.State.name}</td>
        <td className={styles.cell}>{ExpertLinkData?.DegreeType?.name}</td>

        <td className={styles.cell}>
          {new Date(ExpertLinkData?.event_start).toLocaleDateString()}
        </td>
        <td className={styles.cell}>
          {new Date(ExpertLinkData?.event_end).toLocaleDateString()}
        </td> */}

        <td className={styles.cell}>
          <div className={styles.ceil__parent_container}>
            <MdModeEdit
              onClick={() => {
                setSingleApplication(ExpertLinkData);
                setIsModalOpen(true);
              }}
              size={25}
              style={{ color: "#0a9ced", cursor: "pointer" }}
            />

            <MdDelete
              onClick={() => {
                setDeleteId(ExpertLinkData?.id);
                setModal(true);
              }}
              size={20}
              style={{ color: "red", cursor: "pointer" }}
            />
          </div>
        </td>
      </tr>
      {/* Update Expert Link */}
      <AddUpdateExpertLink
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
        ExpertLinkData={ExpertLinkData}
        create={false}
      />
      <AreYouSure
        show={deleteModal}
        onHide={() => setModal(false)}
        onConfirm={handleDelete}
        title={"Experts Link"}
      />
    </>
  );
};

export default ExpertLinkTable;
