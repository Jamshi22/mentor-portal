"use client";

import { useGetAllPaymentDropdownsQuery } from "../lib/services/paymentdropdowns";
import React, { useEffect, useState } from "react";
import MultiSelectDropdown from "../components/MultiSelectDropdown";
import styles from "../styles/paymentfilters.module.css";

const PaymentFilters = ({
  paymentMethod,
  setPaymentMethod,
  paymentStatus,
  setPaymentStatus,
  coupons,
  setCoupons,
  setCurrentPage, planeName, setPalnName
}) => {
  const [paymentOptions, setPaymentOptions] = useState();
  const [paymentStatusOption, setPaymentStatusOption] = useState();
  const [couponsOption, setCouponsOption] = useState();
  const [plansOption, setPlansOption] = useState();
  const {
    data: dropdownData,
    error,
    isLoading,
  } = useGetAllPaymentDropdownsQuery();

  // console.log(dropdownData, "dropdownData");

  useEffect(() => {
    setPaymentOptions(dropdownData?.data?.paymentMethods);
    setPaymentStatusOption(dropdownData?.data?.status);
    setCouponsOption(dropdownData?.data?.coupons);
    setPlansOption(dropdownData?.data?.subscriptionPlans
    )
  }, [dropdownData]);

  return (
    <div className={styles.filters_conatiner}>
      <div>
        <MultiSelectDropdown
          placeholders="Payment Method"
          options={paymentOptions}
          selectedOptions={paymentMethod}
          setSelectedOptions={setPaymentMethod}
          setCurrentPage={ setCurrentPage}
        />
      </div>

      <div>
        <MultiSelectDropdown
          placeholders="Payment Status"
          options={paymentStatusOption}
          selectedOptions={paymentStatus}
          setSelectedOptions={setPaymentStatus}
          setCurrentPage={ setCurrentPage}
        />
      </div>
      <div>
        <MultiSelectDropdown
          placeholders="Coupons"
          options={couponsOption}
          selectedOptions={coupons}
          setSelectedOptions={setCoupons}
          setCurrentPage={ setCurrentPage}
        />
      </div>
      <div>
        <MultiSelectDropdown
          placeholders="Plans"
          options={plansOption}
          selectedOptions={planeName}
          setSelectedOptions={setPalnName}
          setCurrentPage={ setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PaymentFilters;
