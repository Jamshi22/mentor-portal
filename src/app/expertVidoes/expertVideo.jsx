import React from "react";
import styles from "./expert.module.css";
import { useGetExpertLinkQuery } from "../../lib/services/externalLink";
import { MdAddLink } from "react-icons/md";
import { toast } from "react-toastify";
import { useState } from "react";
import LoadingDots from "../../components/LoadingDots";
import { useEffect } from "react";
import ExpertLinkTable from "./components/GetTable/expertLinktable";
import AddUpdateExpertLink from "./components/AddExpertLink/AddExpertLink";

const ExpertVideos = () => {
  const [applicationLink, setApplicationLink] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const {
    data: expertLinkData,
    isLoading,
    isError,
    refetch,
  } = useGetExpertLinkQuery();

  useEffect(() => {
    setApplicationLink(expertLinkData?.data?.data);
  }, [expertLinkData]);

  const handleDelete = (appLinkId) => {
    setApplicationLink(
      expertLinkData.filter((data) => appLinkId.id !== data.id)
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
            Add External Link
          </button>
        </div>
       

        {expertLinkData?.data?.length == 0   ? (
          <div className={styles.addwebinar_no_data_found}>
            <p className={styles.addwebinar_no_data_found_fnt}>
              No Data Found Please Add Expert Video
            </p>
          </div>
        ) : (
          <>
            <div className={styles.table_scroll_container}>
              <table className={styles.table}>
                <thead className={styles.table_head}>
                  <tr>
                    <th>Sl no</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Video Link</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expertLinkData?.data.map((ExpertLinkData, index) => (
                    <ExpertLinkTable
                      key={index}
                      index={index}
                      ExpertLinkData={ExpertLinkData}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
      
          </>
        )}
              <AddUpdateExpertLink
              create={true}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              refetch={refetch}
            />
      </section>
    </>
  );
};

export default ExpertVideos;
