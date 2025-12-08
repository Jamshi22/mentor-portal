"use client"
import React, { useEffect, useState } from 'react';
import Select from "react-select";
import styles from "./delete.module.css"
import { useStatesData } from '../../../../../hooks/useStatesData';
import { useFeeStipendDropdown } from '../../../../../hooks/useFeeStipendDropdown';
import { FEE_STIPEND_BOND_DROPDOWN_QUERY } from '../../../../../utils/gql/query';
import { useFeeStipendBondData } from '../../../../../hooks/useFeeStipendBondData';
import DeleteTable from '../DeleteTable/DeleteTable';
import { FaTrashAlt } from 'react-icons/fa';
import AreYouSure from '../../../rank-uploader/Component/DeleteComponent/Column/AreYourSure/AreYouSure';
import Swal from 'sweetalert2';
import { useFeeStipendBondDeleteMutation } from '../../../../../lib/services/Uploaderservice/UploadClosingRank';


const DeleteFeeStipendBond = () => {

  const DegreeTypeStatic = [
    { value: "0a15ec41-1773-431a-8e0c-a19ba369fdc7", label: "UG" },
    { value: "8423d9c7-23f0-4880-974e-4164b9b9e853", label: "PG" },
  ];
  const CounselingIdType = [
    { value: "b66fa203-8b62-4edd-9b6c-d7f85a434dad", label: "Central" },
    { value: "26d245b5-c714-430f-b181-a0479910e523", label: "State" },
  ];

  const [degreeTypeStatic, setDegreeTypeStatic] = useState(DegreeTypeStatic[1]);
  const [counselingIdType, setCounselingIdType] = useState(CounselingIdType[0]); // default to "State"
  const [selectedStates, setSelectedStates] = useState({
    label: "Karnataka",
    value: "ae332624-2d65-4afb-bb8c-63ff99863211"
  });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedQuota, setSelectedQuota] = useState(null);
  const [selectedInstituteType, setSelectedInstituteType] = useState(null);
  // console.log(
  //   "=> ", degreeTypeStatic, counselingIdType, selectedStates, selectedCourse, selectedQuota, selectedInstituteType
  // )

  //   courseId,
  // degreeTypeId,
  // instituteTypeId,
  // quotaId,
  // stateId,

  const {
    states,
    loading: statesLoading,
    error: statesError,
  } = useStatesData();


  const {
    data: dropdownData,
    loading: dropdownLoading,
    error: dropdownError,
  } = useFeeStipendDropdown({
    selectedStates: selectedStates?.value ? [selectedStates.value] : [],
    counsellingTypeId: counselingIdType?.value || "",
    degreeTypeId: degreeTypeStatic?.value || "",
    bondInservice: false,
  });

  const { data, loading, error, refetch } = useFeeStipendBondData({
    counsellingTypeId: counselingIdType?.value,
    stateId: selectedStates?.value ? [selectedStates.value] : [],
    degreeTypeId: degreeTypeStatic?.value,
    page: 1,
    sortData: {
      column: "fee", order: "DESC"
    },
    bondInservice: false,
    courseId: selectedCourse ? [selectedCourse.value] : [],
    quotaId: selectedQuota ? [selectedQuota.value] : [],
    instituteTypeId: selectedInstituteType ? [selectedInstituteType.value] : [],
    itemsPerPage: 100000,
  });

  const [deleteFeeStipendBondRecords, { isLoading }] = useFeeStipendBondDeleteMutation();


  const [deleteModal, setModal] = useState(false);




  if (dropdownLoading) return <p>Loading filters...</p>;
  if (dropdownError) return <p>Error loading dropdown data: {dropdownError.message}</p>;


  if (statesLoading) return <p>Loading states...</p>;
  if (statesError) return <p>Error: {statesError.message}</p>;

  const formattedStateOptions = states.map((state) => ({
    label: state.name,
    value: state.id,
  }));

  // const deletePayload = {
  //   counsellingTypeId: [counselingIdType?.value],
  //   instituteTypeId: [selectedInstituteType?.value],
  //   stateId: [selectedStates?.value],
  //   degreeTypeId: [degreeTypeStatic?.value],
  //   courseId: [selectedCourse?.value],
  //   quotaId: [selectedQuota?.value], 
  // };


  const deletePayload = {
    ...(counselingIdType?.value && { counsellingTypeId: [counselingIdType.value] }),
    ...(selectedInstituteType?.value && { instituteTypeId: [selectedInstituteType.value] }),
    ...(selectedStates?.value && { stateId: [selectedStates.value] }),
    ...(degreeTypeStatic?.value && { degreeTypeId: [degreeTypeStatic.value] }),
    ...(selectedCourse?.value && { courseId: [selectedCourse.value] }),
    ...(selectedQuota?.value && { quotaId: [selectedQuota.value] }),
  };



  const handleDelete = async () => {
    setModal(false);
    try {
      await deleteFeeStipendBondRecords(deletePayload).unwrap();
      Swal.fire('Deleted!', 'Fee Stipend Bond deleted successfully.', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Something went wrong during deletion.', 'error');
    } finally {
      refetch()
    }
  }

  return (
    <div>
      <div>
        <div className={styles.multiples_container}>
          {/* First Row: Degree & Counseling Type */}
          <div className={styles.select___}>
            <Select
              options={DegreeTypeStatic}
              value={degreeTypeStatic}
              onChange={setDegreeTypeStatic}
              placeholder="Select Degree Type"
              className={styles.dropwDown__}
            />

            <Select
              options={CounselingIdType}
              value={counselingIdType}
              onChange={setCounselingIdType}
              placeholder="Select Counseling Type"
              className={styles.dropwDown__}
            />
          </div>

          {/* Second Row: State */}
          <div className={styles.select___}>
            <Select
              options={formattedStateOptions}
              value={selectedStates}
              onChange={setSelectedStates}
              placeholder="Select State(s)"
              className={styles.dropwDown__}
            />

            {
              data && <Select
                options={
                  dropdownData?.instituteTypes?.map(
                    (type) =>
                    ({
                      label: type.name,
                      value: type.id,
                    })
                  ) || []
                }
                placeholder="Select Institute Type"
                className={styles.dropwDown__}
                onChange={setSelectedInstituteType}
              />
            }
          </div>

          {/* ✅ Third Row: Course & Quota */}
          <div className={styles.select___}>
            <Select
              options={
                dropdownData?.courses?.map(
                  (course) => ({
                    label: course.name,
                    value: course.id,
                  })
                ) || []
              }
              placeholder="Select Course"
              className={styles.dropwDown__}
              onChange={setSelectedCourse}
            />

            <Select
              options={
                dropdownData?.quotas?.map(
                  (quota) => ({
                    label: quota.name,
                    value: quota.id,
                  })
                ) || []
              }
              placeholder="Select Quota"
              className={styles.dropwDown__}
              onChange={setSelectedQuota}
            />
          </div>

        </div>
      </div>

      <div className={styles.button_container___}>
        <p className={styles.length_fnt_}>
          Number of data –{" "}
          <span className={styles.leng___}>

            {
              //@ts-ignore
              data?.totalItems

            }
          </span>
        </p>
        <button
          className={styles.btn__Delete}
          onClick={() => setModal(true)}
        >
          <FaTrashAlt className={styles.icon} />
          Delete
        </button>
      </div>
      <div>

        <DeleteTable data={data?.feeStipendBondData} Loading={loading} />
      </div>

      <AreYouSure
        show={deleteModal}
        onHide={() => setModal(false)}
        onConfirm={handleDelete}
        title={`${
          //@ts-ignore
          data?.totalItems

          } records will be deleted.`}
      />
    </div>
  );
}

export default DeleteFeeStipendBond