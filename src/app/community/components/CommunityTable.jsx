import React from "react";
import styles from "../components/community.module.css";
import { useGetCommunityLinkQuery } from "../../../lib/services/communityLink";
import { MdAddLink } from "react-icons/md";
import { toast } from "react-toastify";
import { useState } from "react";
import LoadingDots from "../../../components/LoadingDots";
import { useEffect } from "react";
import CommunityTable from "../CommunityTable/CommunityTable";
import AddCommunityPage from "../CommunityTable/AddCommunity/AddCommunity";

const CommunityLinksTable = () => {
  const [applicationLink, setApplicationLink] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const {
    data: CommunityLinkData,
    error,
    isLoading,
    refetch,
  } = useGetCommunityLinkQuery({
    limit: limit,
    page: page,
  });

  useEffect(() => {
    setApplicationLink(CommunityLinkData?.data?.data);
  }, [CommunityLinkData]);

  const handleDelete = (appLinkId) => {
    setApplicationLink(
      CommunityLinkData.filter((data) => appLinkId.id !== data.id)
    );
    toast.dismiss();
    toast.success("Application Link ");
  };

  const handleUpdate = (appLinkid) => {
    alert("Update action triggered for webinar ID: " + appLinkid);
  };

  if (isLoading) {
    return <LoadingDots />;
  }

  return (
    <>
      <section className={styles.container}>
        <div className={styles.application_link_header_container}>
          <button
            className={styles.application_btn}
            onClick={() => setIsModalOpen(true)}
          >
            <MdAddLink size={25} />
            Add Community Link
          </button>
        </div>

        {CommunityLinkData?.data?.data?.length == 0 ? (
          <div className={styles.addwebinar_no_data_found}>
            <p className={styles.addwebinar_no_data_found_fnt}>
              No Data Found Please Add Community Link
            </p>
          </div>
        ) : (
          <>
            <div className={styles.table_scroll_container}>
              <table className={styles.table}>
                <thead className={styles.table_head}>
                  <tr>
                    <th>Sl no</th>
                    <th>Channel Name</th>
                    {/* <th>State</th>
                    <th>Degree</th> */}
                    <th>WhatsApp Link</th>
                    <th>WhatsApp Subscribes Count</th>
                    <th>Telegram Link</th>
                    <th>Telegram Subscribes Count</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {CommunityLinkData?.data?.data?.map((data, index) => {
                    return (
                      <CommunityTable
                        key={index}
                        index={index}
                        communityLink={data}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                        refetch={refetch}
                        loading={isLoading}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
        <AddCommunityPage
          create={true}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      </section>
    </>
  );
};

export default CommunityLinksTable;
