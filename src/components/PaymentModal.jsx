import React, { useEffect, useRef, useState } from "react";
import "../styles/paymentmodal.css";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import SuccessMsg from "../utils/svgs/SuccessMsg";
import { useGetSubscriptionsQuery } from "../lib/services/subscriptionPlans";

// Add a simple tick SVG icon
const TickIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="green"
    className="bi bi-check-circle"
    viewBox="0 0 16 16"
  >
    <path d="M12.854 3.146a1 1 0 0 1 0 1.414L6.707 10.707a1 1 0 0 1-1.414 0L3.146 8.207a1 1 0 0 1 1.414-1.414L6 8.293l5.854-5.854a1 1 0 0 1 1.414 0z" />
  </svg>
);

const PaymentModal = ({ data, setUpgrade, fetchUserDetails }) => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedPlanName, setSelectedPlanName] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [coupon, setCoupon] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isPlanDropdownOpen, setIsPlanDropdownOpen] = useState(false);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employeeId, setEmployeeId] = useState("");

  // Refs for detecting clicks outside the dropdowns
  const planDropdownRef = useRef(null);
  const paymentDropdownRef = useRef(null);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(120); // 1 minute in seconds
  const [isResendVisible, setIsResendVisible] = useState(false); // Resend button visibility

  // Error states for each field
  const [planError, setPlanError] = useState("");
  const [paymentMethodError, setPaymentMethodError] = useState("");
  const [couponError, setCouponError] = useState("");
  const [apiError, setApiError] = useState("");
  const [verificationError, setVerificationError] = useState("");

  const { data: subscriptionPlan } = useGetSubscriptionsQuery({
    degree_type_name: data?.degreeType?.name,
    id: data?.subscriptionPlan?.id,
  });

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        planDropdownRef.current &&
        !planDropdownRef.current.contains(e.target)
      ) {
        setIsPlanDropdownOpen(false);
      }
      if (
        paymentDropdownRef.current &&
        !paymentDropdownRef.current.contains(e.target)
      ) {
        setIsPaymentDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan.id);
    setSelectedPlanName(plan.plan_name);
    setIsPlanDropdownOpen(false);
    setPlanError(""); // Clear error on valid selection
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setIsPaymentDropdownOpen(false);
    setPaymentMethodError(""); // Clear error on valid selection
  };

  const handleModalClose = () => setUpgrade(false);

  const togglePlanDropdown = (e) => {
    e.stopPropagation();
    setIsPlanDropdownOpen(!isPlanDropdownOpen);
    setIsPaymentDropdownOpen(false);
  };

  const togglePaymentDropdown = (e) => {
    e.stopPropagation();
    setIsPaymentDropdownOpen(!isPaymentDropdownOpen);
    setIsPlanDropdownOpen(false);
  };

  const handleCouponChange = (e) => {
    let value = e.target.value;

    value = value.toUpperCase();

    const isValidCoupon = /^[A-Z0-9]*$/.test(value);

    setCouponError(
      isValidCoupon ? "" : "only uppercase letters and numbers allowed"
    );

    setCoupon(value);
  };

  const handleVerificationCodeChange = (e) => {
    const value = e.target.value;

    // Check if input is numeric and 6 characters long
    if (!/^\d{0,6}$/.test(value)) {
      setVerificationError("Code must be a 6-digit number");
    } else {
      setVerificationError(""); // Reset error if valid
    }

    setVerificationCode(value);
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails && userDetails.employee && userDetails.employee[0]?.id) {
      setEmployeeId(userDetails?.employee[0]?.id);
    }
  }, []);

  const handleSubmitPayment = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsSubmitting(true);
    setApiError(""); // Reset API error

    // Field validation
    let hasError = false;
    if (!selectedPlan) {
      setPlanError("Please select a plan.");
      hasError = true;
    }
    if (!selectedPaymentMethod) {
      setPaymentMethodError("Please select a payment method.");
      hasError = true;
    }

    if (hasError) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}offline-payments`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assuming you are using token-based auth
          },

          body: JSON.stringify({
            EmployeeId: employeeId,
            UserId: data?.userId,
            payment_method: selectedPaymentMethod,
            coupon,
            SubscriptionPlanId: selectedPlan,
          }),
        }
      );

      const datas = await response.json();
      if (response.ok) {
        setPaymentId(datas?.paymentId);
        toast.info("Verification code sent to your email");
        setStep(2); // Move to verification step
        setTimeLeft(120); // Reset timer for 1 minute
        setIsResendVisible(false); // Hide resend button at first
      } else {
        setApiError(datas?.errors[0]?.msg || "Error submitting payment.");
      }
    } catch (error) {
      setApiError("Error submitting payment: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitVerification = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(""); // Reset API error

    // Validate that the code is 6 digits long
    if (verificationCode.length !== 6) {
      setVerificationError("Please enter a 6-digit verification code.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}verify-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assuming you are using token-based auth
          },
          body: JSON.stringify({
            paymentId,
            SubscriptionPlanId: selectedPlan,
            UserId: data?.userId,
            verification_code: verificationCode,
          }),
        }
      );

      const datas = await response.json();

      if (response.ok) {
        setStep(3); // Show success
        fetchUserDetails();
        setTimeout(() => setUpgrade(false), 1500);
      } else {
        setApiError(datas?.errors[0]?.msg || "Verification failed");
      }
    } catch (error) {
      setApiError("Error verifying code:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Timer countdown logic
  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsResendVisible(true); // Show resend button after countdown ends
    }
  }, [timeLeft, step]);

  const handleResendCode = async () => {
    // Resend the code by calling handleSubmitPayment and reset the timer
    await handleSubmitPayment();
    setTimeLeft(120); // Reset timer
    setIsResendVisible(false); // Hide resend button
  };

  return (
    <div className="payment-modal">
      {step === 1 && (
        <>
          <div className="close-payment-modal">
            <div className="close-icon" onClick={handleModalClose}>
              <IoMdClose />
            </div>
          </div>
          <h1>Payment</h1>

          <form className="payment-form" onSubmit={handleSubmitPayment}>
            {/* Plan Dropdown */}
            <label htmlFor="plan">Select Plan:</label>
            <div
              className={`custom-dropdown ${planError ? "dropdown-error" : ""}`}
              onClick={togglePlanDropdown}
              ref={planDropdownRef}
            >
              <div className="dropdown-header">
                {selectedPlanName || "Choose Plan"}
              </div>
              {isPlanDropdownOpen && (
                <div className="dropdown-options">
                  {subscriptionPlan?.data?.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => handlePlanSelect(plan)}
                      className="dropdown-item"
                    >
                      <span>{plan.plan_name}</span>
                      {selectedPlan === plan.id && <TickIcon />}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {planError && <p className="error-text">{planError}</p>}

            {/* Payment Method Dropdown */}
            <label htmlFor="paymentMethod">Payment Method:</label>
            <div
              className={`custom-dropdown ${
                paymentMethodError ? "dropdown-error" : ""
              }`}
              onClick={togglePaymentDropdown}
              ref={paymentDropdownRef}
            >
              <div className="dropdown-header">
                {selectedPaymentMethod || "Choose Payment Method"}
              </div>
              {isPaymentDropdownOpen && (
                <div className="dropdown-options">
                  {[
                    "credit card",
                    "debit card",
                    "upi",
                    "bank transfer",
                    "cash",
                    "other",
                  ].map((method) => (
                    <div
                      key={method}
                      onClick={() => handlePaymentMethodSelect(method)}
                      className="dropdown-item"
                    >
                      <span>{method}</span>
                      {selectedPaymentMethod === method && <TickIcon />}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {paymentMethodError && (
              <p className="error-text">{paymentMethodError}</p>
            )}

            {/* Coupon Input */}
            <label htmlFor="coupon">{"Coupon Number (Optional)"}</label>
            <input
              type="text"
              id="coupon"
              value={coupon}
              onChange={handleCouponChange}
              placeholder="Enter Coupon Number"
            />

            {couponError && <p className="error-text">{couponError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ backgroundColor: isSubmitting ? "gray" : "blue" }}
            >
              {isSubmitting ? "Submitting..." : "Submit Payment"}
            </button>
            {apiError && <p className="error-text">{apiError}</p>}
          </form>
        </>
      )}

      {step === 2 && (
        <form className="verification-form" onSubmit={handleSubmitVerification}>
          <div className="close-payment-modal">
            <div className="close-icon" onClick={handleModalClose}>
              <IoMdClose />
            </div>
          </div>
          <h3>Verification Code</h3>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            placeholder="Enter Verification Code"
            className={verificationError ? "input-error" : ""}
          />
          {verificationError && (
            <p className="error-text">{verificationError}</p>
          )}
          {/* Show error message */}
          {/* Display Timer */}
          {!isResendVisible ? (
            <p>
              Code expires in: {Math.floor(timeLeft / 60)}:
              {("0" + (timeLeft % 60)).slice(-2)}
            </p>
          ) : (
            <div className="resend_btn_container">
              <p>Code Expired :</p>
              <button
                type="button"
                className={isSubmitting ? "hideresendbtn" : "resendbtn"}
                onClick={handleResendCode}
              >
                Resend
              </button>
            </div>
          )}
          {/* Disable Submit Verification button when validation fails */}
          <button className="buttonNormal" type="submit">
            {isSubmitting ? "Submitting..." : "Submit Verification"}
          </button>
          {apiError && <p className="error-text">{apiError}</p>}
        </form>
      )}

      {step === 3 && (
        <div className="success-message">
          <SuccessMsg />
          <h2>Payment Successful!</h2>
        </div>
      )}
    </div>
  );
};

export default PaymentModal;
