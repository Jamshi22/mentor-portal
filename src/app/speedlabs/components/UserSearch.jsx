"use client";
import { useState } from "react";
import styles from "../components/usersearch.module.css";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 


  const validatePhoneNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      setError("Please enter a phone number.");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    setError(""); 
    setIsSubmitting(true); 

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}speed-labs?phoneNumber=${phoneNumber}`
      );

      if (!response.ok) {
        throw new Error("User Not Yet asked for access");
      }

      const data = await response.json();

      if (data.message === "SpeedLabs detail retrieved successfully.") {
        setUserDetails(data.speedLabs);
        setError("");
        setPhoneNumber("");
      } else {
        setError("No details found for this phone number.");
        setUserDetails(null);
      }
    } catch (err) {
      setError(err.message);
      setUserDetails(null);
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleUpdateStatus = async () => {
    if (!userDetails || userDetails.status === true) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}speed-labs/${userDetails.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: true, 
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status.");
      }

      const updatedData = await response.json();

      if (updatedData.message === "speed labs updated successfully") {
        setUserDetails((prevState) => ({
          ...prevState,
          status: true,
        }));
        setError("");
      } else {
        setError("Failed to update status.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className={styles.main_container}>
    <div className={styles.UserSearchcontainer}>
      <h1 className={styles.User_details_title_heading}>SpeedLabs User Details</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="phoneNumber" className={styles.label}>
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            className={styles.input}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setUserDetails(null);
              setError("")
            }}
            placeholder="Enter phone number"
            maxLength="10"
          />
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {userDetails && (
        <div className={styles.details}>
          <h2>User Details</h2>
          <p>
            <strong>Name:</strong> {userDetails.User.first_name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.User.email || "N/A"}
          </p>
          <p>
            <strong>Phone Number:</strong> {userDetails.User.phone_number}
          </p>
          <p>
            <strong>Country Code:</strong> {userDetails.User.country_code}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {userDetails.status ? (
              <span style={{ color: "green" }}>Active</span>
            ) : (
              <span style={{ color: "red" }}>Inactive</span>
            )}
          </p>
          {/* <p>
            <strong>Created At:</strong>{" "}
            {new Date(userDetails.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(userDetails.updatedAt).toLocaleString()}
          </p> */}

          {/* If status is false, show the button to update */}
          {userDetails.status === false && (
            <button
              className={styles.updateButton}
              onClick={handleUpdateStatus}
            >
              Update Status to Active
            </button>
          )}
        </div>
      )}
    </div>
    </section>
  );
}
