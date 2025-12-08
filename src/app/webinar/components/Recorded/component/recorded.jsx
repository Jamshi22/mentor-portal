import React from "react";
import { useState, useEffect } from "react";
import styles from "./recorder.module.css";
import RecordedTable from "./webinartable/RecorderTable";
import { useGetUpcomingRecordedWebinarQuery } from "../../../../../lib/services/webinarRecorded";
import Button from "react-bootstrap/Button";
import LoadingDots from "../../../../../components/LoadingDots";
import { toast } from 'react-toastify'
import CommonButton from "../../../../applicationlink/components/Common/Button/CommonButton";
import WebinarFormAdd from '../../Common/webinarForm'

const Recorded = () => {
  const [recordedWebinar, setRecordedWebinar] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const {
    data: recordData,
    error,
    isLoading,
    refetch,
  } = useGetUpcomingRecordedWebinarQuery({
    limit: limit,
    page: page,
  });

  useEffect(() => {
    setRecordedWebinar(recordData?.data?.data);
  }, [recordData]);

  const handleDelete = (webinarId) => {
    setWebinars(recordData.filter((webinar) => webinar.id !== recordData.Id));
    toast.dismiss()
    toast.success('Recorded Webinar Successfully')
  };

  const handleUpdate = (webinarId) => {
    alert("Update action triggered for webinar ID: " + webinarId);
  };


  if (isLoading) {
    return <LoadingDots />;
  }

  return (
    <>
      <div className={styles.container}>
        {/* <h1 className={styles.heading}>Upcoming Webinars</h1> */}

        <div className={styles.addWebinarContainer}>
          <CommonButton
            text={'Add Recorded webinar'}
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        {recordedWebinar?.length == 0 ? (
          <div className={styles.addwebinar_no_data_found}>
            <p className={styles.addwebinar_no_data_found_fnt}>
              No Data Found Please Add Recorded Webinar
            </p>
          </div>
        ) : (
          <>
            <div className={styles.table_scroll_container}>
              <table className={styles.table}>
                <thead className={styles.table_head}>
                  <tr>
                    <th>sl no</th>
                    <th>Thumbnail</th>
                    <th>Title</th>
                    <th>Agenda</th>
                    <th>State</th>
                    <th>Degree</th>
                    <th>Webinar Link</th>
                    <th>Duration</th>
                    <th>Conducted Date</th>
                    <th>No of Attendess</th>
                    <th>Actions</th>
                    <th>view</th>
                  </tr>
                </thead>
                <tbody>
                  {recordedWebinar?.map((webinar, index) => (
                    <RecordedTable
                      key={webinar.id}
                      index={index}
                      webinar={webinar}
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
        
        <WebinarFormAdd
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refetch={refetch}
          webinarDetails={true}
          update={null}
           webinarType="recorded"
         />
      </div>
    </>
  );
};

export default Recorded;
