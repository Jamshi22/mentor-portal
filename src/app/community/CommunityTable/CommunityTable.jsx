import React from "react";
import styles from "./community.module.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useGetCommunityLinkQuery } from "../../../lib/services/communityLink";
import { useDeletecommunityLinkMutation } from "../../../lib/services/communityLink";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import LoadingDots from "../../../components/LoadingDots";
import AddCommunityPage from "./AddCommunity/AddCommunity";
import AreYouSure from "../../../components/AreYouSuremodal/AreYouSure";

const CommunityTable = ({
  communityLink,
  onDelete,
  onUpdate,
  index,
  refetch,
}) => {
  const [singleApplication, setSingleApplication] = useState();
  const [singleUpdateApplication, setsingleUpdateApplication] = useState();
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletecommunityLink, { isLoading }] = useDeletecommunityLinkMutation();

  const [deleteModal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = async () => {
    try {
      await deletecommunityLink(deleteId).unwrap();
      toast.dismiss();
      toast.success("Community Deleted SuccessFully!");
      refetch();
    } catch (error) {
      toast.error("Failed to Delete the Community Link");
    } finally {
      setModal(false);
      setDeleteId(null);
    }
  };

  if (isLoading) {
    return <LoadingDots />;
  }

  return (
    <>
      <tr className={styles.row}>
        <td className={styles.cell}>{index + 1}</td>
        <td className={styles.cell}>{communityLink?.channel_name}</td>
        <a
          href={
            communityLink?.whatsApp_link ? communityLink.whatsApp_link : "#"
          }
          target="_blank"
          rel="application_link"
          className={styles.application_link}
        >
          <td className={styles.application_link}>
            {communityLink?.whatsApp_link}
          </td>
        </a>

        <td className={styles.cell}>
          {communityLink?.whatsApp_subscribers_count}
        </td>

        <a
          href={
            communityLink?.telegram_link ? communityLink.telegram_link : "#"
          }
          target="_blank"
          rel="application_link"
          className={styles.application_link}
        >
          <td className={styles.application_link}>
            {communityLink?.telegram_link}
          </td>
        </a>

        <td className={styles.cell}>
          {communityLink?.telegram_subscribers_count}
        </td>

        {/* <td className={styles.cell}>{communityLink?.DegreeType?.name}</td>
        <td className={styles.cell}>{communityLink?.State?.name}</td> */}

        <td className={styles.cell}>
          {new Date(communityLink?.createdAt).toLocaleDateString()}
        </td>

        <td className={styles.cell}>
          <div className={styles.ceil__parent_container}>
            <MdModeEdit
              onClick={() => {
                setSingleApplication(communityLink);
                setIsModalOpen(true);
              }}
              size={25}
              style={{ color: "#0a9ced", cursor: "pointer" }}
            />

            <MdDelete
              onClick={() => {
                setDeleteId(communityLink?.id);
                setModal(true);
              }}
              size={20}
              style={{ color: "red", cursor: "pointer" }}
            />
          </div>
        </td>
      </tr>
      {/* Edit Community Page */}
      <AddCommunityPage
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
        communityLinkData={communityLink}
        create={false}
      />
      <AreYouSure
        show={deleteModal}
        onHide={() => setModal(false)}
        onConfirm={handleDelete}
        title={"Community Link"}
      />
    </>
  );
};

export default CommunityTable;
