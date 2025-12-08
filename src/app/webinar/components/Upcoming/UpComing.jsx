import React, { useState, useEffect } from "react";
import styles from "./upcoming.module.css";
import WebinarTable from "./WebinarTable";
import { useGetUpcomingWebinarQuery } from "../../../../lib/services/webinar";
import LoadingDots from "../../../../components/LoadingDots";
import CommonButton from '../../../applicationlink/components/Common/Button/CommonButton'
import WebinarFormAdd from '../Common/webinarForm'

const UpComing = () => {
  const [webinars, setWebinars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const {
    data: webinardata,
    error,
    isLoading,
    refetch,
  } = useGetUpcomingWebinarQuery({
    limit: limit,
    page: page,
  });

  useEffect(() => {
    setWebinars(webinardata?.data?.data);
  }, [webinardata]);



  const handleDelete = (webinarId) => {
    setWebinars(webinars.filter((webinar) => webinar.id !== webinarId));
    alert("Webinar deleted!");
  };

  const handleUpdate = (webinarId) => {
    alert("Update action triggered for webinar ID: " + webinarId);
  };

  if (isLoading) {
    return <LoadingDots />;
  }

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.heading}>Upcoming Webinars</h1> */}
      <div className={styles.addWebinarContainer}>
        <CommonButton
          text={'Add Webinar'}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {webinars?.length == 0 ? (
        <div className={styles.addwebinar_no_data_found}>
          <p className={styles.addwebinar_no_data_found_fnt}>
            No Data Found Please Add Webinar
          </p>
        </div>
      ) : (
        <>
          <div className={styles.table_scroll_container}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>sl no</th>
                  <th>Thumbnail</th>
                  <th>Title</th>
                  <th>Agenda</th>
                  <th>State</th>
                  <th>Degree</th>
                  <th>Start Date</th>
                  <th>StartTime</th>
                  <th>Webinar Link</th>
                  <th>End Date</th>
                  <th>End Time</th>
                  <th>Actions</th>
                  <th>view</th>
                </tr>
              </thead>
              <tbody>
                {webinars?.map((webinar, index) => (
                  <>
                    <WebinarTable
                      key={webinar.id}
                      index={index}
                      webinar={webinar}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                      refetch={refetch}
                      webinarType="upcoming"
                    />
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <WebinarFormAdd
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
        // webinarDetails={false}
        update={null}
        webinarType="upcoming"
      />
    </div>
  );
};

export default UpComing;
