"use client";

import React, { useEffect } from "react";
import styles from "../styles/coupontable.module.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Coupons from "./coupons";
import DeleteModal from "./deleteModal";
import {
  useCoupondetailsQuery,
  useCoupondeletedMutation,
} from "../lib/services/coupon";
import Pagination from "./Pagination";
import LoadingDots from "./LoadingDots";
import AreYouSure from "./AreYouSuremodal/AreYouSure";
import { toast } from "react-toastify";

const CouponsTables = () => {
  const [couponDeletedetails, setcoupondeletedetails] = useState(false);
  const [showModal, setShowModal] = useState();
  const [coupondeleted, { isLoading }] = useCoupondeletedMutation();

  // Delete Modal
  const [deleteModal, setModal] = useState(false);

  //This is the edit coupon.  Commenting  until further instructions.
  // const [couponEdit, setCouponEdit] = useState(false);
  const [id, setId] = useState();
  const [couponName, setcouponName] = useState();

  //This is the edit coupon.  Commenting  until further instructions.
  // const [couponEditData, setCouponEditData] = useState({
  //   couponId: "",
  //   couponName: "",
  //   couponDescription: "",
  //   couponValidFrom: null,
  //   couponValidTo: null,
  //   couponDiscount: "",
  // });

  const [deleteShow, setShowDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsInCurrentPage, setItemsInCurrentPage] = useState(0);

  //This is the edit coupon.  Commenting  until further instructions.
  // const handleEdit = (
  //   id,
  //   couponcode,
  //   description,
  //   validFrom,
  //   validto,
  //   coupone_applied,
  //   discount_value
  // ) => {
  //   setShowModal(true);
  //   setCouponEdit(true);
  //   setCouponEditData({
  //     couponId: id,
  //     couponName: couponcode,
  //     couponDescription: description,
  //     couponValidFrom: validFrom,
  //     couponValidTo: validto,
  //     couponDiscount: discount_value,
  //   });
  // };

  const {
    data: couponData,
    isLoading: couponLoading,
    isError: couponError,
    refetch,
  } = useCoupondetailsQuery({
    limit: pageSize,
    page: currentPage,
  });

  useEffect(() => {
    if (couponData?.coupons) {
      setCurrentPage(couponData?.coupons?.currentPage);
      setPageSize(couponData?.coupons?.itemPerPage);
      setTotalItems(couponData?.coupons?.totalItem);
      setTotalPages(couponData?.coupons?.totalPage);
      setItemsInCurrentPage(couponData?.coupons?.itemInCurrentPage);
    }
  }, [couponData]);

  // const handleDelete = (id, code) => {
  //   setcoupondeletedetails(true);
  //   setShowDelete(true);
  //   setId(id);
  //   setcouponName(code);
  // };

  // if (couponLoading) {
  //   return <LoadingDots/>;
  // }

  // if (couponError) {
  //   console.log(couponError);
  //   return <p>{couponError || "coupon code error"}</p>;
  // }

  const handleDelete = async () => {
    try {
      toast.dismiss();
      const result = await coupondeleted(id).unwrap();
      refetch();
      toast.success(
        result?.data?.message || "Coupon Code Deleted Successfully"
      );
      setModal(false);
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      {/* 
       //This is the edit coupon.  Commenting  until further instructions.
      <Coupons
        showModal={showModal}
        setShowModal={setShowModal}
        editCoupon={couponEdit}
        couponId={couponEditData.couponId}
        couponName={couponEditData.couponName}
        couponDescription={couponEditData.couponDescription}
        couponValid={couponEditData.couponValidFrom}
        couponValidTo={couponEditData.couponValidTo}
        couponDiscountt={couponEditData.couponDiscount}
        couponFetch={refetch}
      /> */}
      {/* 
      
      <DeleteModal
        show={deleteShow}
        onHide={setShowDelete}
        couponId={id}
        couponDelete={couponName}
        couponDeleted={couponDeletedetails}
        refetchdata={refetch}
      /> */}

      <AreYouSure
        show={deleteModal}
        onHide={() => setModal(false)}
        onConfirm={handleDelete}
        title={"Coupons"}
      />
      {couponData?.coupons?.coupons?.length === 0 ? (
        <p className={styles.nodata}>No Coupon Found Please Create Coupon...</p>
      ) : (
        <>
          <div className={styles.tableContainer}>
            <table className={styles.paymentTable}>
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Coupon Code</th>
                  <th>Plan Name</th>
                  <th>Description</th>
                  <th>Valid From</th>
                  <th>Valid Till</th>
                  <th>Coupon Used</th>
                  <th>Discount Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Add Coupon Data Here */}
                {couponData?.coupons?.coupons?.map((data, i) => {
                  return (
                    <>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{data.code}</td>
                        <td>{data.subscriptionDetails.plan_name}</td>
                        <td>{data.description}</td>
                        <td>
                          {new Date(data.validFrom).toLocaleDateString("en-GB")}
                        </td>
                        <td>
                          {new Date(data.validTill).toLocaleDateString("en-GB")}
                        </td>
                        <td>{data.coupon_applied_count}</td>
                        <td>{data.discountValue}</td>
                        <td>
                          {/* 
                           //This is the edit coupon.  Commenting  until further instructions.
                          
                          <span>
                            <MdEdit
                              onClick={(
                                id,
                                couponcode,
                                description,
                                validFrom,
                                validto,
                                coupone_applied,
                                discount_value
                              ) =>
                                handleEdit(
                                  data.id,
                                  data.code,
                                  data.description,
                                  data.validFrom,
                                  data.validTill,
                                  data.coupon_applied_count,
                                  data.discountValue,
                                  
                                 
                                )
                              }
                              size={20}
                              style={{ color: "#007bcb" }}
                            />
                          </span>{" "} */}
                          <MdDelete
                            onClick={() => {
                              setId(data.id); // store the coupon ID to delete
                              setcouponName(data.code); // optional: store name for UI
                              setcoupondeletedetails(true); // to tell the modal it’s for coupon
                              setModal(true); // open confirmation modal
                            }}
                            size={20}
                            style={{ color: "red", cursor: "pointer" }}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
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
          </div>
        </>
      )}
    </>
  );
};

export default CouponsTables;
