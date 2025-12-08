"use client";

import Navbars from "../../components/Navbars";
import Sidebars from "../../components/Sidebars";
import styles from "../page.module.css";
import Coupons from "../../components/coupons";
import { useState } from "react";
import React from "react";
import CouponsTables from '../../components/couponstable'
import { FaPlus } from "react-icons/fa6"; 
import { useCoupondetailsQuery } from "../../lib/services/coupon";

const CouponPage = () => {
  const [showModal, setShowModal] = useState(false);

  const {isLoading:couponLoading} = useCoupondetailsQuery()

  const handleModal = () => {
    setShowModal(true);
  };

  return (
    <>
    <div className={styles.containers}>
      <Sidebars />
      <div className={styles.mainContent}>
        <Navbars />
        <div className={styles.contents}>  
        <div className={styles.coupon_content}>
          <div>
         {couponLoading ? '' :  <button className={styles.btn_coupon_container} onClick={handleModal}>Create Coupon <FaPlus /></button>}  
          </div>
        </div>
        <div>
        <CouponsTables/>
        </div>
        </div>
      </div>
    </div>
      <Coupons showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default CouponPage;
