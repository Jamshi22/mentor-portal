"use client";

import React, { useState, useEffect } from "react";
import styles from "./delete.module.css";
import Select from "react-select";
import ColumnTableDelete from "./Column/ColumnTable";
import AreYouSure from "./Column/AreYourSure/AreYouSure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import {
  useGetDynamicDropdownsMutation,
  useGetClosingRankDataMutation,
  useDeleteClosingRankDataMutation,
} from "../../../../../lib/services/Uploaderservice/DeleteClosingRank";
import { TailSpin } from "react-loader-spinner";

// Static dropdown options
const DegreeTypeStatic = [
  { value: "0a15ec41-1773-431a-8e0c-a19ba369fdc7", label: "UG" },
  { value: "8423d9c7-23f0-4880-974e-4164b9b9e853", label: "PG" },
];
const CounselingIdType = [
  { value: "b66fa203-8b62-4edd-9b6c-d7f85a434dad", label: "MCC" },
  { value: "26d245b5-c714-430f-b181-a0479910e523", label: "State" },
];

const DeleteClosingRank = () => {
  const [degreeTypeStatic, setDegreeTypeStatic] = useState(DegreeTypeStatic[0]);
  const [counselingIdType, setCounselingIdType] = useState(CounselingIdType[0]);

  const [stateOptions, setStateOptions] = useState([]);
  const [degreeOptions, setDegreeOptions] = useState([]);
  const [quotaOptions, setQuotaOptions] = useState([]);
  const [instituteTypeOptions, setInstituteTypeOptions] = useState([]);
  const [yearsData, setYearsData] = useState([]);

  const [selectedState, setSelectedState] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [selectedQuota, setSelectedQuota] = useState(null);
  const [selectedInstituteType, setSelectedInstituteType] = useState(null);
  const [year, setYear] = useState(null);
  const [round, setRound] = useState([]);

  const [tableData, setTableData] = useState(null);
  const [deleteModal, setModal] = useState(false);

  const [getDropdowns] = useGetDynamicDropdownsMutation();
  const [fetchClosingRanks, { isLoading }] = useGetClosingRankDataMutation();
  const [performDelete] = useDeleteClosingRankDataMutation();

  // console.log(counselingIdType.label, "counselllingType");

  useEffect(() => {
    getDropdowns({
      degreeTypeId: [degreeTypeStatic.value],
      counsellingTypeId: [counselingIdType.value],
    })
      .unwrap()
      .then((data) => {
        const fmt = (items) =>
          items.map((it) => ({
            value: it.id || it.value || it.name,
            label: it.name || it.label || it.value,
          }));
        setStateOptions(fmt(data.states || []));
        setDegreeOptions(fmt(data.degrees || []));
        setQuotaOptions(fmt(data.quotas || []));
        setInstituteTypeOptions(fmt(data.instituteTypes || []));
        setYearsData(data.years || []);
      })
      .catch((e) => console.error("Dropdown load failed:", e));
  }, [degreeTypeStatic, counselingIdType]);

  const yearOptions = yearsData.map((y) => ({
    value: y.year,
    label: y.year.toString(),
  }));
  const selectedYears = year ? [year.value] : [];
  // const roundOptions = yearsData
  //   .filter((y) => selectedYears.includes(y.year))
  //   .flatMap((y) =>
  //     y.rounds.map((r) => ({
  //       value: `${y.year}-${r}`,
  //       label: `Round ${r}`,
  //     }))
  //   );

  const roundOptions = yearsData
    .filter((y) => selectedYears.includes(y.year))
    .flatMap((y) =>
      y.rounds.map((r) => ({
        value: `${y.year}-${r}`,
        label: `Round ${r}`,
      }))
    );

  // console.log(yearsData, "yearsData");

  useEffect(() => {
    const doFetch = async () => {
      const getValueArr = (v) =>
        Array.isArray(v) ? v.map((i) => i.value) : v?.value ? [v.value] : [];
      // const selectedRounds = round.map((r) => {
      //   const [yr, rd] = r.value.split("-");
      //   return { year: +yr, round: +rd };
      // });
      const selectedRounds = round.map((r) => {
        const [yr, rd] = r.value.split("-");
        return { year: +yr, round: +rd };
      });
      const formData = {
        counsellingTypeId: getValueArr(counselingIdType),
        degreeTypeId:
          getValueArr(degreeTypeStatic),
        stateId: getValueArr(selectedState),
        degreeId: getValueArr(selectedDegree),
        quotaId: getValueArr(selectedQuota),
        instituteTypeId: getValueArr(selectedInstituteType),
        sort: selectedRounds.length
          ? {
              year: selectedRounds[0].year,
              round: selectedRounds[0].round,
              order: "ASC",
            }
          : undefined,
        page: 1,
        limit: 20,
        rankRange: ["1", "1395905"],
        feeRange: ["-1", "8907316"],
        degreeType: getValueArr(degreeTypeStatic).map((v) =>
          v === DegreeTypeStatic[0].value ? "UG" : "PG"
        ),
      };

      try {
        const res = await fetchClosingRanks(formData).unwrap();
        setTableData(res);
      } catch (e) {
        console.error("Fetch ranks failed:", e);
      }
    };

    if (degreeTypeStatic && counselingIdType && true) {
      doFetch();
    }
  }, [
    degreeTypeStatic,
    counselingIdType,
    selectedState,
    selectedDegree,
    selectedQuota,
    selectedInstituteType,
    year,
    round,
  ]);

  // const handleDelete = async () => {
  //   setModal(false);

  //   const payload = {
  //     counsellingTypeId: [counselingIdType.value],
  //     degreeTypeId: [degreeTypeStatic.value],
  //     degreeId: selectedDegree ? [selectedDegree.value] : [],
  //     stateId: selectedState ? [selectedState.value] : [],
  //     quotaId: selectedQuota ? [selectedQuota.value] : [],
  //     year: year ? [year.value] : [],
  //     round: round.map((r) => +r.value.split("-")[1]),
  //   };

  //   try {
  //     await performDelete(payload).unwrap();
  //     Swal.fire("Success", "Data deleted successfully", "success");
  //     setSelectedState(null);
  //     setSelectedDegree(null);
  //     setSelectedQuota(null);
  //     setSelectedInstituteType(null);
  //  setYear(null);
  //     setRound([]);
  //   } catch (e) {
  //     console.error("Delete failed:", e);
  //     Swal.fire("Error", "Could not delete data", "error");
  //   }
  // };

  const handleDelete = async () => {
    setModal(false);

    const allRoundsForYear =
      yearsData.find((y) => y.year === year?.value)?.rounds || [];
    const selectedRoundsForYear = round.map((r) => +r.value.split("-")[1]);

    const isSelectedAllRound =
      allRoundsForYear.length > 0 &&
      allRoundsForYear.every((r) => selectedRoundsForYear.includes(r)) &&
      allRoundsForYear.length === selectedRoundsForYear.length;

    const payload = {
      counsellingTypeId: [counselingIdType.value],
      degreeTypeId: [degreeTypeStatic.value],
      degreeId: selectedDegree ? [selectedDegree.value] : [],

      stateId:
        counselingIdType.label === "MCC"
          ? []
          : selectedState
          ? [selectedState.value]
          : [],
      // quotaId: selectedQuota ? [selectedQuota.value] : [],
      year: year ? [year.value] : [],
      round: selectedRoundsForYear,
      counsellingType:[counselingIdType.label],
      degreeType:[degreeTypeStatic.label],
      isSelectedAllRound,
    };

    try {
    const data =  await performDelete(payload).unwrap()
    // console.log(data, "delete message")
      Swal.fire("Success", data.message, "success");
      setSelectedState(null);
      setSelectedDegree(null);
      setSelectedQuota(null);
      setSelectedInstituteType(null);
      setYear(null);
      setRound([]);
    } catch (e) {
      console.error("Delete failed:", e);
      Swal.fire("Error", e.data.message, "error");
    }
  };

  if (isLoading) {
    return (
      <div className={styles.middle___}>
        <TailSpin />
      </div>
    );
  }

  // console.log(year, "year");
  return (
    <section className={styles.delete_closing_container}>
      <div className={styles.multiples_container}>
        {/* <div className={styles.select___}> */}
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
        {/* </div> */}
        {/* <div className={styles.select___}> */}
        {counselingIdType.label === "MCC" ? (
          <></>
        ) : (
          <Select
            options={stateOptions}
            value={selectedState}
            onChange={setSelectedState}
            placeholder="Select State"
            isClearable
            className={styles.dropwDown__}
          />
        )}
        {degreeTypeStatic.label === "PG" ? (
          <></>
        ) : (
          <Select
            options={degreeOptions}
            value={selectedDegree}
            onChange={setSelectedDegree}
            placeholder="Select Degree"
            isClearable
            className={styles.dropwDown__}
          />
        )}
        {/* </div> */}
        {/* <div className={styles.select___}> */}
        {/* <Select
            options={quotaOptions}
            value={selectedQuota}
            onChange={setSelectedQuota}
            placeholder="Select Quota"
            isClearable
            className={styles.dropwDown__}
          /> */}
        {/* <Select
            options={instituteTypeOptions}
            value={selectedInstituteType}
            onChange={setSelectedInstituteType}
            placeholder="Select Institute Type"
            isClearable
            className={styles.dropwDown__}
          /> */}
        {/* </div> */}
        {/* <div className={styles.select___}> */}
        <Select
          options={yearOptions}
          value={year}
          onChange={setYear}
          // isMulti
          placeholder="Select Year"
          className={styles.dropwDown__}
        />
        <Select
          options={roundOptions}
          value={round}
          onChange={setRound}
          isMulti
          placeholder="Select Round"
          isDisabled={!year}
          className={styles.dropwDown__}
        />
        {/* </div> */}
      </div>
      {tableData?.data?.length ? (
        <>
          <div className={styles.button_container___}>
            <p className={styles.length_fnt_}>
              Number of data –{" "}
              <span className={styles.leng___}>
                {" "}
                {tableData.pagination.totalRecords}
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

          <div className={styles.column_table_container}>
            <ColumnTableDelete
              tableData={tableData}
              Loading={isLoading}
              yearsData={yearsData}
              year={year}
              round={round}
            />
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No data available
        </p>
      )}

      <AreYouSure
        show={deleteModal}
        onHide={() => setModal(false)}
        onConfirm={handleDelete}
        title="Closing Rank"
      />
    </section>
  );
};

export default DeleteClosingRank;
