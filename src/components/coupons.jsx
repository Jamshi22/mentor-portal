"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import Logo from "../utils/svgs/Logo";
import { RiCoupon3Line } from "react-icons/ri";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { BiSolidRightArrow } from "react-icons/bi";
import { RiCoupon2Fill } from "react-icons/ri";
import { RiDiscountPercentFill } from "react-icons/ri";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import "../styles/coupon.css";

import { TailSpin } from "react-loader-spinner";

/* Rtk Query Both Register Coupon and Edit Coupon */
import {
  useCreateCouponMutation,
  // useCouponeditMutation,
} from "../lib/services/coupon";

/* RTK Query for The Subscription plan Field */
import { useGetPlanDetailsQuery } from "../lib/services/subscriptionPlans";
import LoadingDots from "./LoadingDots";

const Coupons = ({
  showModal,
  setShowModal,
  editCoupon,
  couponId,
  couponName,
  couponDescription,
  couponValid,
  couponValidTo,
  couponDiscountt,
  couponFetch,
}) => {
  const [createCoupon, { isLoading }] = useCreateCouponMutation();

  /* Coupon Modal Error */
  const [couponerror,setCouponerror] = useState('')

  // /* Edit Coupon Rtk */
  //This is the edit coupon.  Commenting  until further instructions.
  // const [couponedit, { isLoading: couponLoading }] = useCouponeditMutation();

  /* Subscription Plan Details */
  const { data: subscriptionPlanData, isLoading: SubscriptionPlanLoading } =
    useGetPlanDetailsQuery();

  const [formData, setFormData] = useState({
    couponscode: "",
    description: "",
    discount: "",
    subscription: "",
    subscriptionId: '',
    startDate: null,
    expireDate: null,
  });

  

  const [formErrors, setFormErrors] = useState({
    couponscodeError: "",
    descriptionError: "",
    discountError: "",
    subscriptionError: "",
    startDateError:"",
    expireDateError:""
  });

  /* Validation Functions */
  const validateCouponCode = (code) => {
    const couponCodePattern = /^[A-Z0-9]+$/;
    if (!code) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        couponscodeError: "*Coupon Code Cannot Be Empty",
      }));
      return false;
    } else if (!couponCodePattern.test(code)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        couponscodeError:
          "*Coupon Code must contain only uppercase letters and numbers",
      }));
      return false;
    } else if (code.length > 15) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        couponscodeError: "*Coupon Code Cannot be More than 15 Characters",
      }));
      return false;
    } else if (!/[A-Za-z]/.test(code) || !/[0-9]/.test(code)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        couponscodeError: "*Coupon Code Must Contain Both Letters and Numbers",
      }));
      return false;
    }
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      couponscodeError: "",
    }));
    return true;
  };

  const validateDescription = (desc) => {
    if (!desc) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        descriptionError: "*Description Cannot Be Empty",
      }));
      return false;
    }
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      descriptionError: "",
    }));
    return true;
  };

  const validateDiscount = (disc) => {
    const pattern = /^\d+$/;

    if (!disc) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        discountError: "*Discount Cannot Be Empty",
      }));
      return false;
    } else if (!pattern.test(disc)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        discountError: "*Discount should contain numbers only.",
      }));
      return false;
    }

    const discountValue = parseInt(disc, 10);

    if (isNaN(discountValue) || discountValue < 1 || discountValue > 100) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        discountError: "*Discount must be a number between 1 and 100.",
      }));
      return false;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      discountError: "",
    }));
    return true;
  };

  /* Subscription Error Validation */
  const validateSubscription = (subscription) => {
    if (!subscription) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        subscriptionError: "*Please select a subscription plan.",
      }));
      return false;
    }
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      subscriptionError: "",
    }));
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));


    if (name === "couponscode") validateCouponCode(value);
    if (name === "description") validateDescription(value);
    if (name === "discount") validateDiscount(value);
    if (name === "subscription") validateSubscription(value);
  };

 
  const validateDateError = (date) =>{
     if(date == null){
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        startDateError: "*Start Date Cannot Be Empty.",
      }));
     }else{
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        startDateError: "",
      }));
      return true;
     }
  }

  const validateEndError = (date) =>{
    if(date == null){
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        expireDateError: "*Expire Date Cannot Be Empty.",
      }));
     }else{
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        expireDateError: "",
      }));
      return true;
     }
  }
  const handleDateChange = (date, field) => {
      if(field == 'startDate')  validateDateError(date)
      if(field == 'expireDate') validateEndError(date)
    setFormData((prevData) => ({
      ...prevData,
      [field]: date,
    }));
  };

  /* Date Formate Function */
  function FormateDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;

  }



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const isCouponCodeValid = validateCouponCode(formData.couponscode);
    const isDescriptionValid = validateDescription(formData.description);
    const isDiscountValid = validateDiscount(formData.discount);
    const isSubscriptionValid = validateSubscription(formData.subscription);
    const isStartDateError = validateDateError(formData.startDate)
    const isEndDateError = validateEndError(formData.expireDate)

    if (
      !isCouponCodeValid ||
      !isDescriptionValid ||
      !isDiscountValid ||
      !isSubscriptionValid || 
      !isStartDateError ||
      !isEndDateError
    ) {
      return;
    }

    try {
      {
        /* all the displayed toasts will be removed. using the toast dismiss */
      }
      toast.dismiss();
      //This is the edit coupon.  Commenting  until further instructions.
      // If editing an existing coupon
      // if (editCoupon) {
      //   const couponResult = await couponedit({
      //     id: couponId,
      //     body: {
      //       code: formData.couponscode,
      //       description: formData.description,
      //       discountValue: formData.discount,
      //       subscriptionPlan: formData.subscription,
      //       subscriptionId: formData.subscription,
      //       validFrom: FormateDate(formData.startDate),
      //       validTill: FormateDate(formData.expireDate),
      //     },
      //   }).unwrap();
      //   toast.success(couponResult?.message || "Coupon updated successfully");
      //   couponFetch();
      // } else {
      //   // If creating a new coupon
      //   const result = await createCoupon({
      //     couponCode: formData.couponscode,
      //     description: formData.description,
      //     discountValue: formData.discount,
      //     subscriptionPlan: formData.subscription,
      //     validFrom: FormateDate(formData.startDate),
      //     validTill: FormateDate(formData.expireDate),
      //     subscriptionId: formData.subscription,
      //   }).unwrap();

      //   toast.success(result?.message || "Coupon Created Successfully");
      // }


      const result = await createCoupon({
        couponCode: formData.couponscode,
        description: formData.description,
        discountValue: formData.discount,
        subscriptionPlan: formData.subscription,
        validFrom: FormateDate(formData.startDate),
        validTill: FormateDate(formData.expireDate),
        subscriptionId: formData.subscription,
      }).unwrap();

      toast.success(result?.message || "Coupon Created Successfully");


      // Close modal and reset form data and errors
      setShowModal(false);
      setFormData({
        couponscode: "",
        description: "",
        discount: "",
        subscription: "",
        startDate: null,
        expireDate: null,
      });
      setFormErrors({
        couponscodeError: "",
        descriptionError: "",
        discountError: "",
      });
    } catch (error) {
      console.log(error, 'error')
      setCouponerror(error)
      setCouponerror( error?.data?.errors?.[0]?.msg ||
        "Failed to process request. Please try again.")
        console.log( error?.data?.errors?.[0]?.msg ||
          "Failed to process request. Please try again.")
      // toast.error(
      //   error?.data?.errors?.[0]?.msg ||
      //   "Failed to process request. Please try again."
      // );
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    setFormErrors({
      couponscodeError: "",
      descriptionError: "",
      discountError: "",
    });
  };


  //This is the edit coupon.  Commenting  until further instructions.
  // useEffect(() => {
  //   if (editCoupon) {
  //     setFormData({
  //       couponscode: couponName || "",
  //       description: couponDescription || "",
  //       discount: couponDiscountt || "",
  //       subscription: "",
  //       startDate: couponValid || null,
  //       expireDate: couponValidTo || null,
  //     });
  //   }
  // }, [
  //   editCoupon,
  //   couponName,
  //   couponDescription,
  //   couponValid,
  //   couponValidTo,
  //   couponDiscountt,
  // ]);

  useEffect(()=>{
  setFormData({
    couponscode: "",
    description: "",
    discount: "",
    subscription: "",
    subscriptionId: '',
    startDate: null,
    expireDate: null,
  })
setFormErrors({
  couponscodeError: "",
  descriptionError: "",
  discountError: "",
  subscriptionError: "",
})

setCouponerror('')
  },[showModal])


  if(isLoading){
    return (
      <div className='loaders____Container'>
        <TailSpin/>
      </div>
    )
  }


  return (
    <Modal
      show={showModal}
      onHide={handleModalClose}
      className="coupon_Login_container"
      centered
    >
      <Modal.Header className="couponheader" closeButton></Modal.Header>
      <Modal.Body>
        <div className="login-form">
          <div className="login-form-logo-container">
            <Logo />
          </div>
          <form onSubmit={handleSubmit}>
            <label className="coupon-form-label">
              {formErrors.couponscodeError ? `Coupon Code*` : `Coupon Code`}
            </label>
            <div className="input-container">
              <div className="input-with-icon">
                <div className='coupon_logo'>
                <RiCoupon2Fill />
                </div>
                <input
                  type="text"
                  className={formErrors.couponscodeError ? `coupon_code_erro_validation` : `coupon-input`}
                  placeholder="Coupon code"
                  name="couponscode"
                  value={formData.couponscode.toUpperCase()}
                  onChange={handleInputChange}
                  maxLength={16}
                  minLength={3}
                />
              </div>
              {formErrors.couponscodeError && (
                <span className="couponregister_error">
                  {formErrors.couponscodeError}
                </span>
              )}

              <label className="coupon-form-label">
                {formErrors.discountError ? `Discount*` : `Discount`}
              </label>
              <div className="input-with-icon">
              <div className='coupon_logo'>
              <RiDiscountPercentFill />
                </div>
                <input
                  type="text"
                  className={formErrors.discountError ? `coupon_code_erro_validation` : `coupon-input`}
                  placeholder="Discount %"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  maxLength={3}
                />
              </div>
              {formErrors.discountError && (
                <span className="couponregister_error">
                  {formErrors.discountError}
                </span>
              )}

              <div className="date-row">
                <div className="coupon_label_expire_container">
                  <label className="coupon-form-label">Valid From</label>

                  <div className="input-with-icon">
                    <div className='datePicker_logo'>
                    <BsCalendarDateFill />
                    </div>
                    <DatePicker
                      selected={formData.startDate}
                      onChange={(date) => handleDateChange(date, "startDate")}
                      className={formErrors.startDateError ? `coupon_code_erro_validation` : `coupon-input`}
                      minDate={new Date()}
                      placeholderText="Valid From"
                      dateFormat="dd/MM/yyyy"
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}

                    />
                  </div>
                  {formErrors.startDateError && (
                <span className="couponregister_error_datepicker">
                  {formErrors.startDateError}
                </span>
              )}
                </div>

                <div className="coupon_label_expire_container">
                  <label className="coupon-form-label">Expire To</label>
                  <div className="input-with-icon">
                    <div className='datePicker_logo'>
                    <BsCalendarDateFill />
                    </div>
                    <DatePicker
                      selected={formData.expireDate}
                      onChange={(date) => handleDateChange(date, "expireDate")}
                      className={formErrors.expireDateError ? `coupon_code_erro_validation` : `coupon-input`}
                      minDate={new Date()}
                      placeholderText="Expire To"
                      dateFormat="dd/MM/yyyy"
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                    />
                  </div>
                  {formErrors.expireDateError && (
                <span className="couponregister_error_datepicker">
                  {formErrors.expireDateError}
                </span>
              )}
                </div>
              </div>

              <div className="coupon-form-drop-down-container">
                <label htmlFor="subscript-plan" className="coupon-form-label">
                  {formErrors.subscriptionError
                    ? `Subscription Plan*`
                    : `Subscription Plan`}
                </label>
                <select
                  id="subscript-plan"
                  className={formErrors.subscriptionError ? `drop-down_error` : `drop-down`}
                  name="subscription"
                  value={formData.subscription}
                  onChange={handleInputChange}
                >

                  <option value=""  >Select a plan</option>
                  {SubscriptionPlanLoading ? (
                    <p>Loading...</p>
                  ) : (
                    subscriptionPlanData?.data?.subscriptionPlans?.map(
                      (plan) => {
                        return (
                          <>
                            <option key={plan.id} value={plan.id} >
                              <span>{plan.name}</span>
                            </option>
                          </>
                        );
                      }
                    )
                  )}
                </select>
              </div>
              {/* This is Subscription Error */}
              {formErrors.subscriptionError && (
                <span className="couponregister_error">
                  {formErrors.subscriptionError}
                </span>
              )}

              <label className="coupon-form-label">
                {formErrors.descriptionError ? `Description*` : `Description`}
              </label>
              <div className="input-with-icon">
                <div className='coupon_logo_text_area'>
                <MdDescription />
                  </div>
                <textarea
                  className={formErrors.descriptionError ? `coupon_code_erro_validation` : `coupon-input`}
                  placeholder="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              {formErrors.descriptionError && (
                <span className="couponregister_error">
                  {formErrors.descriptionError}
                </span>
              )}
            </div>
            <div className="btn-container">
              <button className="btn_open" type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </button>
              <div className='coupon_code_validation_container'>
                {couponerror && <p className='coupon-validation-error-fnt'><IoWarningOutline color="red"/>{' '}{couponerror}</p>}
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Coupons;
