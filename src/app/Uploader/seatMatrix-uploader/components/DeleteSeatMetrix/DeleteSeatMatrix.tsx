import React, { useEffect, useState } from "react";
import {
  useSeatMatrixFilterMutation,
  useSeatMatrixSearchDeleteMutation,
  useSeatMatrixSearchMutation,
  useSeatMatrixStatesQuery,
} from "../../../../../lib/services/Uploaderservice/UploadClosingRank";
import styles from "./delete.module.css";
import Select from "react-select";
import { FaTrashAlt } from "react-icons/fa";
import DeleteTable from "../DeleteTable/DeleteTable";
import AreYouSure from "../../../rank-uploader/Component/DeleteComponent/Column/AreYourSure/AreYouSure";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";
import FilterDropdowns from "../RoundAndYearsFilter/FilterDropdowns";

const DegreeTypeStatic = [
  { value: "0a15ec41-1773-431a-8e0c-a19ba369fdc7", label: "UG" },
  { value: "8423d9c7-23f0-4880-974e-4164b9b9e853", label: "PG" },
];
const CounselingIdType = [
  { value: "MCC", label: "Central" },
  { value: "State", label: "State" },
];

const DeleteSeatMatrix = () => {
  const [degreeTypeStatic, setDegreeTypeStatic] = useState(DegreeTypeStatic[0]);
  const [counselingIdType, setCounselingIdType] = useState(CounselingIdType[1]); // default to "State"

  const [
    fetchSeatMatrixFilter,
    { data: seatMatrixData, error: filterError, isLoading: filterLoading },
  ] = useSeatMatrixFilterMutation();
  const {
    data: stateOptions,
    error: stateError,
    isLoading: stateLoading,
    refetch: refetchStates,
  } = useSeatMatrixStatesQuery({
    counsellingType: counselingIdType?.value,
    degreeType: degreeTypeStatic?.label,
  });
  const [triggerSeatMatrixSearch, { data, isLoading, error }] =
    useSeatMatrixSearchMutation();
  const [
    deleteSeatMatrix,
    { isLoading: isDeleting, error: deleteError, data: deleteData },
  ] = useSeatMatrixSearchDeleteMutation();
  const [selectedStates, setSelectedStates] = useState({
    label: "Karnataka",
    value: "Karnataka",
  });

  const [quota, setQuota] = useState(null);
  const [instituteType, setInstituteType] = useState(null);
  const [course, setCourse] = useState(null);
  const [category, setCategory] = useState(null);

  const [searchPayload, setSearchPayload] = useState(null);

  // console.log("stateOptions ", stateOptions)
  const [roundYearFilters, setRoundYearFilters] = useState({
    round: null,
    year: null,
  });

  // Convert state options from API to react-select format
  let formattedStateOptions =
    (stateOptions &&
      stateOptions?.map((state) => ({
        value: state,
        label: state,
      }))) ||
    [];

  formattedStateOptions.push({
    label: "All",
    value: [
      "Andaman and Nicobar Islands",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Bihar",
      "Chandigarh",
      "Chhattisgarh",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Puducherry",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ],
  });

  useEffect(() => {
    fetchSeatMatrixFilter({
      state: [selectedStates.label],
      counsellingType: [counselingIdType.value],
      degreeType: degreeTypeStatic.label,
    });
  }, [stateOptions, counselingIdType, degreeTypeStatic]);

  //   useEffect(() => {
  //   const filterData = {
  //     counsellingType: [counselingIdType.value],
  //     degreeType: degreeTypeStatic.label,
  //   };

  //   // Only add "state" if counsellingType is NOT "MCC"
  //   if (counselingIdType.value !== "MCC") {

  //     //@ts-ignore
  //     filterData.state = [selectedStates.label];
  //   }else {
  //         //@ts-ignore
  //     filterData.state = []
  //   }

  //   fetchSeatMatrixFilter(filterData);
  // }, [selectedStates, counselingIdType, degreeTypeStatic]);

  const convertObjectToArray = (data) => {
    if (!Array.isArray(data)) {
      return [];
    }

    const hasInvalidItem = data.some((item) => !item || item.value == null);

    if (hasInvalidItem) {
      return [];
    }

    return data.map((item) => item.value);
  };

  useEffect(() => {
    if (counselingIdType && degreeTypeStatic) {
      refetchStates();
    }
  }, [counselingIdType, degreeTypeStatic]);

  useEffect(() => {
    //@ts-ignore
    // console.log("data => ", data && data?.pagination?.totalRecords)
    const payload = {
      page: 1,
      //@ts-ignore
      itemsPerPage: 30,
      state:
        counselingIdType.value === "MCC"
          ? []
          : convertObjectToArray([selectedStates]),
      counsellingType: convertObjectToArray([counselingIdType]),
      course: convertObjectToArray([course]),
      degreeType: degreeTypeStatic?.label || "",
      quota: convertObjectToArray([quota]),
      instituteType: convertObjectToArray([instituteType]),
      category: convertObjectToArray([category]),
      // Optional fields:
      // instituteName: [],
      // horizontalCategory: [],
      sort: {
        year: 2023,
        round: 1,
        order: -1,
      },
      view: "table",
    };
    setSearchPayload(payload);
    triggerSeatMatrixSearch(payload);
  }, [
    selectedStates,
    counselingIdType,
    degreeTypeStatic,
    course,
    quota,
    instituteType,
    category,
    triggerSeatMatrixSearch,
  ]);

  const extractFromSeatMatrixData = (data, key) => {
    if (!Array.isArray(data)) return [];
    const entry = data.find((item) => item[key]);
    return entry?.[key] || [];
  };

  const toSelectOptions = (arr, accessor = "name") => {
    if (!Array.isArray(arr)) return [];
    return arr
      .map((item) => {
        if (typeof item === "string" || typeof item === "number") {
          return { label: item.toString(), value: item.toString() };
        }
        if (typeof item === "object" && item[accessor]) {
          return { label: item[accessor], value: item[accessor] };
        }
        return null;
      })
      .filter(Boolean);
  };

  const quotaOptions = toSelectOptions(
    extractFromSeatMatrixData(seatMatrixData, "quota")
  );
  const courseOptions = toSelectOptions(
    extractFromSeatMatrixData(seatMatrixData, "course")
  );
  const categoryOptions = toSelectOptions(
    extractFromSeatMatrixData(seatMatrixData, "category")
  );
  const instituteTypeOptions = toSelectOptions(
    extractFromSeatMatrixData(seatMatrixData, "instituteType")
  );

  const [deleteModal, setModal] = useState(false);

  const handleDelete = async () => {
    setModal(false);

    let payload: any = {
      state: convertObjectToArray([selectedStates]),
      counsellingType: convertObjectToArray([counselingIdType]),
      course: convertObjectToArray([course]),
      degreeType: degreeTypeStatic?.label || "",
      quota: convertObjectToArray([quota]),
      instituteType: convertObjectToArray([instituteType]),
      category: convertObjectToArray([category]),
      view: "table",
    };

    if (roundYearFilters.round && roundYearFilters.year) {
      payload.round = roundYearFilters.round;

      payload.year = roundYearFilters.year;
    }

    console.log("delete payload", payload);

    try {
      const response = await deleteSeatMatrix(payload).unwrap();
      console.log("✅ Deleted successfully:", response);
      setRoundYearFilters({ round: null, year: null });
      Swal.fire("Success", "Data deleted successfully", "success").then(() => {
        if (searchPayload) {
          triggerSeatMatrixSearch(searchPayload); // ✅ Refetch
        }
      });
    } catch (err) {
      console.error("❌ Error deleting data:", err);
      Swal.fire("Error", "Could not delete data", "error");
    }
  };

  if (isLoading) {
    return (
      <div className={styles.middle___}>
        <TailSpin />
      </div>
    );
  }

  const handleFilterChange = (key, value) => {
    setRoundYearFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <div className={styles.multiples_container}>
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
        <div className={styles.select___}>
          {counselingIdType.value && (
            //!== "MCC"
            <Select
              options={formattedStateOptions}
              value={selectedStates}
              onChange={setSelectedStates}
              placeholder="Select State(s)"
              className={styles.dropwDown__}
            />
          )}

          {categoryOptions.length > 0 && (
            <Select
              options={categoryOptions}
              value={category}
              onChange={setCategory}
              placeholder="Select Category"
              className={styles.dropwDown__}
            />
          )}
        </div>
        <div className={styles.select___}>
          {quotaOptions.length > 0 && (
            <Select
              options={quotaOptions}
              value={quota}
              onChange={setQuota}
              placeholder="Select Quota"
              className={styles.dropwDown__}
            />
          )}

          {courseOptions.length > 0 && (
            <Select
              options={courseOptions}
              value={course}
              onChange={setCourse}
              placeholder="Select Course"
              className={styles.dropwDown__}
            />
          )}
        </div>
        <div className={styles.select___}>
          {instituteTypeOptions.length > 0 && (
            <Select
              options={instituteTypeOptions}
              value={instituteType}
              onChange={setInstituteType}
              placeholder="Select Institute Type"
              className={styles.dropwDown__}
            />
          )}
        </div>

        <div>
          <FilterDropdowns
            round={roundYearFilters.round}
            year={roundYearFilters.year}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className={styles.column_table_container}>
        {isLoading ? (
          <p style={{ textAlign: "center", marginTop: "2rem" }}></p>
        ) : error ? (
          <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
            Error loading data: {JSON.stringify(error)}
          </p>
        ) : //@ts-ignore
        data?.data?.length > 0 ? (
          <>
            <div className={styles.button_container___}>
              <p className={styles.length_fnt_}>
                Number of data –{" "}
                <span className={styles.leng___}>
                  {
                    //@ts-ignore
                    data?.pagination?.totalRecords
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
            <DeleteTable
              data={
                //@ts-ignore
                data?.data
              }
              Loading={isLoading}
            />
          </>
        ) : (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            No data available
          </p>
        )}
      </div>

      <div>
        {/* {filterLoading && <p>Loading seat matrix...</p>}
        {filterError && <p>Error fetching seat matrix: {JSON.stringify(filterError)}</p>}
        {seatMatrixData && <pre>{JSON.stringify(seatMatrixData, null, 2)}</pre>} */}

        {/* {stateError && <p>Error loading states: {JSON.stringify(stateError)}</p>}
        {stateLoading && <p>Loading available states...</p>}
        {stateOptions && <pre>{JSON.stringify(stateOptions, null, 2)}</pre>} */}
      </div>
      <div>
        {/* {error && <p>Error loading states: {JSON.stringify(error)}</p>}
        {isLoading && <p>Loading available states...</p>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
      </div>

      <AreYouSure
        show={deleteModal}
        onHide={() => setModal(false)}
        onConfirm={handleDelete}
        title={`${
          //@ts-ignore
          data?.pagination?.totalRecords
        } records will be deleted.`}
      />
    </div>
  );
};

export default DeleteSeatMatrix;
