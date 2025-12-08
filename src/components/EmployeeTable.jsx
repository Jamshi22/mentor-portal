"use client";

import React, { useEffect } from "react";
import styles from "../styles/employeetable.module.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EmployeeRegister from "./EmployeeRegister";
import { useState } from "react";
import DeleteModal from "./deleteModal";
import {
  useEmployedetailsQuery,
  useEmployedeleteMutation,
} from "../lib/services/employeeRegister";
import Pagination from "./Pagination";
import LoadingDots from "./LoadingDots";
import AreYouSure from "./AreYouSuremodal/AreYouSure";
import { toast } from "react-toastify";

const EmployableTable = ({ showModal, setShowModal }) => {
  const [showModall, setShowModall] = useState();
  const [id, setid] = useState();
  const [employeename, setEmployeename] = useState();
  const [full, setfull] = useState("");
  const [mail, setMail] = useState("");
  const [deleteShow, setShowDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsInCurrentPage, setItemsInCurrentPage] = useState(0);
  const [employedelete, { isLoading }] = useEmployedeleteMutation();

  // Delete Modal
  const [deleteModal, setModal] = useState(false);

  const {
    isLoading: employeeLoading,
    isError: employeeError,
    isSuccess: employeeSuccess,
    data: employeeDetails,
    refetch,
  } = useEmployedetailsQuery({
    limit: pageSize,
    page: currentPage,
  });

  useEffect(() => {
    if (employeeDetails?.employee) {
      setCurrentPage(employeeDetails?.employee?.currentPage);
      setPageSize(employeeDetails?.employee?.itemPerPage);
      setTotalItems(employeeDetails?.employee?.totalItem);
      setTotalPages(employeeDetails?.employee?.totalPage);
      setItemsInCurrentPage(employeeDetails?.employee?.itemInCurrentPage);
    }
  }, [employeeDetails]);

  const handleDelete = async () => {
    try {
      await employedelete(id).unwrap();
      toast.success("Employee Deleted Successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete employee");
      console.error(error);
    } finally {
      setModal(false);
    }
  };

  if (employeeLoading) {
    return <LoadingDots />;
  }

  if (employeeError) {
    // console.log(employeeError);
    return <p>{employeeError.message || "Data not found..."}</p>;
  }

  return (
    <>
      {/* <DeleteModal
        show={deleteShow}
        onHide={setShowDelete}
        employeeDeleteId={id}
        employeeDeletename={employeename}
        refetchEmployee={refetch}
      /> */}

      <AreYouSure
        show={deleteModal}
        onHide={() => setModal(false)}
        onConfirm={handleDelete}
        title={"Employee"}
      />

      {employeeDetails?.employee?.employees?.length === 0 ? (
        <p className={styles.nodata}>No employee found Please Register</p>
      ) : (
        <>
          {" "}
          <div className={styles.tableContainer}>
            <table className={styles.paymentTable}>
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Amount of Sales</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Mapping over employee data */}
                {employeeDetails?.employee?.employees?.map((data, index) => (
                  <tr key={data?.id}>
                    <td>{index + 1}</td>
                    <td>{data?.fullname}</td>
                    <td>{data?.email}</td>
                    <td>{data?.sales_count}</td>
                    <td>
                      <MdDelete
                        onClick={() => {
                          setid(data.id);
                          setEmployeename(data.fullname); // Optional: For display in modal
                          setModal(true); // Show the confirmation modal
                        }}
                        size={20}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.table_pagination}>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                totalItems={totalItems}
              />
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default EmployableTable;
