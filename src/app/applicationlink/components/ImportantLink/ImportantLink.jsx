import React, { useEffect } from "react";
import styles from "./importantLink.module.css";
import { MdAddLink } from "react-icons/md";
import { useGetImportantLinkAllQuery } from "../../../../lib/services/importantLink";
import { toast } from "react-toastify";
import { useState } from "react";
import LoadingDots from "../../../../components/LoadingDots";
import CommonButton from "../Common/Button/CommonButton";
import ImportantLinkTable from "./Common/TableCommon/importatnLinkCommonTable";
import AddImportanLinkcommon from "./Common/TableCommon/AddimportantLink/AddCommonLink";

const ImportantLink = () => {
  const [applicationLink, setImportantLinkData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: ImportantLinkData,
    error: ImportatnLinkDataError,
    isLoading,
    refetch,
  } = useGetImportantLinkAllQuery({});

  useEffect(() => {
    setImportantLinkData(ImportantLinkData?.data?.data);
  }, [ImportantLinkData]);

  const handleDelete = (appLinkId) => {
    setImportantLinkData(
      ImportantLinkData.filter((data) => appLinkId.id !== data.id)
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
          <CommonButton
            onClick={() => setIsModalOpen(true)}
            text={"Add Important Link"}
          />
        </div>

        {ImportantLinkData?.data?.length == 0 || ImportatnLinkDataError ? (
          <div className={styles.addwebinar_no_data_found}>
            <p className={styles.addwebinar_no_data_found_fnt}>
              No Data Found Please Add Important Link
            </p>
          </div>
        ) : (

            <div className={styles.table_scroll_container}>
              <table className={styles.table}>
                <thead className={styles.table_head}>
                  <tr>
                    <th>Sl no</th>
                    <th>Title</th>
                    <th>Link</th>
                    <th>Tag</th>
                    <th>Degree</th>
                    <th>State</th>
                    <th>Event Start Date</th>
                    <th>Event End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ImportantLinkData?.data?.map((data, index) => (
                    <ImportantLinkTable
                      key={index}
                      index={index}
                      importantLink={data}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                      refetch={refetch}
                      loading={isLoading}
                    />
                  ))}
                </tbody>
              </table>
            </div>
     
        )}
        <AddImportanLinkcommon
          update={null}
          page={true}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      </section>
    </>
  );
};

export default ImportantLink;
