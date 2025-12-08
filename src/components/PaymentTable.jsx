"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useGetAllPaymentsQuery } from "../lib/services/paymentservice";
import styles from "../styles/pamentTable.module.css";
import PaymentFilters from "../components/PaymentFilters";
import Pagination from "../components/Pagination";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import LoadingDots from "./LoadingDots";

const PaymentTable = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [coupons, setCoupons] = useState("");
  const [planeName, setPalnName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsInCurrentPage, setItemsInCurrentPage] = useState(0);

  // Sorting state
  const [sortKey, setSortKey] = useState("payment_method");
  const [sortOrder, setSortOrder] = useState("ASC");

  const {
    data: paymentData,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch, // refetch function can manually trigger a refresh
  } = useGetAllPaymentsQuery({
    limit: pageSize,
    page: currentPage,
    paymentMethod: paymentMethod || "",
    status: paymentStatus,
    coupon: coupons,
    sortDirection: sortOrder,
    sortBy: sortKey,
    subscriptionPlanId:planeName
  });

  useEffect(() => {
    if (paymentData) {
      setCurrentPage(paymentData?.data?.currentPage);
      setPageSize(paymentData?.data?.itemPerPage);
      setTotalItems(paymentData?.data?.totalItem);
      setTotalPages(paymentData?.data?.totalPage);
      setItemsInCurrentPage(paymentData?.data?.itemInCurrentPage);
    }
  }, [paymentData]);

  // Handle sorting logic and trigger refetch
  const handleSort = (key) => {
    setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    setSortKey(key);
  };

  // useEffect(() => {
  //   refetch();
  // }, [
  //   paymentMethod,
  //   paymentStatus,
  //   coupons,
  //   currentPage,
  //   pageSize,
  //   sortKey,
  //   sortOrder,
  //   refetch,
  // ]);

  const sortedPayments = useMemo(() => {
    if (!paymentData?.data?.payments) return [];

    const sorted = [...paymentData.data.payments].sort((a, b) => {
      const valueA =
        a[sortKey] ||
        a.userDetails[sortKey] ||
        a.subscriptionDetails[sortKey] ||
        a.employeeDetails[sortKey] ||
        a.coupon ||
        "";
      const valueB =
        b[sortKey] ||
        b.userDetails[sortKey] ||
        b.subscriptionDetails[sortKey] ||
        b.employeeDetails[sortKey] ||
        b.coupon ||
        "";

      if (valueA < valueB) return sortOrder === "ASC" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "ASC" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [paymentData, sortKey, sortOrder]);

  // Handle loading state
  if (isLoading) {
    return (
      <div>
        <LoadingDots />
      </div>
    ); // Replace with a spinner component for better UX
  }

  // Handle error state
  if (isError) {
    let errorMessage = "Something went wrong.";
    if (error.data.errors[0]?.msg) {
      errorMessage = error?.data?.errors[0]?.msg;
    } else if (error?.status) {
      errorMessage = `Error: ${error.status} - ${error.statusText}`;
    }
    return (
      <div className={styles.errorContainer}>
        <p>{errorMessage}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // Handle case where there is no data
  // if (!paymentData?.data?.payments?.length) {
  //   return <p>No payments found for the selected filters.</p>;
  // }

  const startIndex = (currentPage - 1) * pageSize + 1;
  let endIndex = currentPage * pageSize;
  if (endIndex > totalItems) {
    endIndex = totalItems;
  }

  const serialNumbers = [];
  for (let i = startIndex; i <= endIndex; i++) {
    serialNumbers.push(i);
  }

  return (
    <div>
      <PaymentFilters
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
        coupons={coupons}
        setCoupons={setCoupons}
        setCurrentPage={setCurrentPage}
        planeName={ planeName} setPalnName={setPalnName}
      />
      <div className={styles.table_main_container}>
        <div className={styles.tableContainer}>
          <table className={styles.paymentTable}>
            <thead>
              <tr>
                <th>
                  Sl No
                </th>
                <th onClick={() => handleSort("first_name")}>
                  User Name
                  {sortOrder === "ASC" && sortKey == "first_name" ? (
                  <FaLongArrowAltUp />
                ) : (
                  <FaLongArrowAltDown />
                )}
                </th>
                <th onClick={() => handleSort("email")}>
                  User Email
                  {sortOrder === "ASC" && sortKey == "email" ? (
                  <FaLongArrowAltUp />
                ) : (
                  <FaLongArrowAltDown />
                )}
                </th>
                <th>
                  User Phone{" "}
                  {/* {sortOrder === "ASC" ? (
                  <FaLongArrowAltUp />
                ) : (
                  <FaLongArrowAltDown />
                )} */}
                </th>
                <th onClick={() => handleSort("plan_name")}>
                  Plan Name{" "}
                  {sortOrder === "ASC" && sortKey == "plan_name" ? (
                    <FaLongArrowAltUp />
                  ) : (
                    <FaLongArrowAltDown />
                  )}
                </th>
                <th onClick={() => handleSort("amount")}>
                  Amount
                  {sortOrder === "ASC" && sortKey == "amount" ? (
                  <FaLongArrowAltUp />
                ) : (
                  <FaLongArrowAltDown />
                )}
                </th>
                <th onClick={() => handleSort("payment_method")}>
                  Payment Method
                  {sortOrder === "ASC" && sortKey == "payment_method" ? (
                    <FaLongArrowAltUp />
                  ) : (
                    <FaLongArrowAltDown />
                  )}
                </th>
                <th onClick={() => handleSort("employeeName")}>
                  Employee Name
                  {sortOrder === "ASC" && sortKey == "employeeName" ? (
                    <FaLongArrowAltUp />
                  ) : (
                    <FaLongArrowAltDown />
                  )}
                </th>
                <th>
                  Employee Email{" "}
                  {/* {sortOrder === "ASC" && sortKey == "employeeEmail" ?  (
                  <FaLongArrowAltUp />
                ) : (
                  <FaLongArrowAltDown />
                )} */}
                </th>
                <th onClick={() => handleSort("coupon")}>
                  Coupon{" "}
                  {sortOrder === "ASC" && sortKey == "coupon" ? (
                    <FaLongArrowAltUp />
                  ) : (
                    <FaLongArrowAltDown />
                  )}
                </th>
                <th onClick={() => handleSort("status")}>
                  Status{" "}
                  {sortOrder === "ASC" && sortKey == "status" ? (
                    <FaLongArrowAltUp />
                  ) : (
                    <FaLongArrowAltDown />
                  )}
                </th>
                <th onClick={() => handleSort("transaction_id")}>
                  Transaction ID
                  {sortOrder === "ASC" && sortKey == "transaction_id" ? (
                    <FaLongArrowAltUp />
                  ) : (
                    <FaLongArrowAltDown />
                  )}
                </th>
              </tr>
            </thead>
            <tbody className={styles.paymentTable_body}>
              {paymentData?.data?.payments?.length ? (
                sortedPayments.map((payment, index) => (
                  <tr key={payment.paymentId}>
                    <td>{serialNumbers[index]}</td>
                    <td className={styles.userDetails}>
                      {payment.userDetails.first_name}
                      {payment.userDetails.last_name}
                    </td>
                    <td>{payment.userDetails.email}</td>
                    <td>{payment.userDetails.phone_number}</td>
                    <td>{payment.subscriptionDetails.plan_name}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.payment_method}</td>
                    {/* <td>{payment.amount}</td> */}
                    <td>{payment.employeeDetails.employeeName}</td>
                    <td>{payment.employeeDetails.employeeEmail}</td>
                    <td>{payment.coupon || "N/A"}</td>
                    <td className={styles.status}>{payment.status}</td>
                    <td>{payment.transaction_id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className={styles.nodata_found}>
                    No Payments Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.table_pagination}>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            totalItems={totalItems}
          />
          {/* <div className={styles.pageInfo}>
            <p>
              Showing {startIndex} to {endIndex} of {totalItems} payments
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;
