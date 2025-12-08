"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./seatmetrixUploader.module.css";
import { states } from "./states";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import DeleteSeatMatrix from "./components/DeleteSeatMetrix/DeleteSeatMatrix";
import { useSeatMatrixFilterQuery } from "../../../lib/services/Uploaderservice/UploadClosingRank";

const SeatMatrix = () => {
  const [formData, setFormData] = useState({
    excel: null,
    excelName: "",
    year: "",
    view: "",
    counsellingType: "",
    degreeType: "",
    course: "",
    state: "", // Added state field
  });

  // State for tracking loading status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Handler for file input change
  const handleFileChange = (e) => {
    setMessage("");
    setFormData({ ...formData, excel: e.target.files[0] });
  };

  // Reference for the file input
  const fileInputRef = useRef(null);

  const yearRegex = /^\d{1,4}$/;

  // Handler for input and dropdown change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the year input when it changes
    if (name === "year") {
      if (!yearRegex.test(value)) {
        setMessage("Please enter a valid year with up to four digits.");
      } else {
        setMessage("");
      }
    }

    // If the counsellingType changes and it is 'MCC', set state to 'excel'
    if (name === "counsellingType" && value === "MCC") {
      setFormData({ ...formData, [name]: value, state: "excel" }); // Automatically set state to 'excel' for MCC
    } else {
      setFormData({ ...formData, [name]: value }); // For other fields, update normally
    }

    setMessage(""); // Clear any existing messages
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before form submission
    if (formData.year.length > 4 || formData.year < 1) {
      setMessage("Please enter a valid year with up to four digits.");
      return;
    }
    setMessage("");
    setIsSubmitting(true);

    // Start the timer for uploading
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000)); // Update time in seconds
    }, 1000);

    const data = new FormData();
    data.append("excel", formData.excel);
    data.append("excelName", formData.excelName);
    data.append("year", formData.year);
    data.append("view", formData.view);
    data.append("counsellingType", formData.counsellingType);
    data.append("degreeType", formData.degreeType);
    data.append("course", formData.course);
    data.append("state", formData.state || "");

    // console.log(formData, "formdata");

    // const url = "https://portal.hellomentor.in/apim/v1/seat-matrix";
    // const url = 
    const url = process.env.NEXT_PUBLIC_UPLOAD_MONGODB

    try {
      const response = await fetch(
        `${url}seat-matrix`,
        // "https://uploader.hellomentor.online/apim/v1/seat-matrix",
        {
          method: "PUT", // Changed to PUT method
          body: data, // FormData should automatically set the correct content type
        }
      );
      if (!response.ok) {
        // Handle errors that aren't 2xx range
        const errorData = await response.json();
        setMessage(errorData?.error || "Something went wrong");
      } else {
        const result = await response.json();
        setMessage(`${result?.length} seat-matrix added successfully`);
      }
    } catch (error) {
      // Catching and displaying errors, including network issues or response issues
      setMessage(`Error: ${error || "Unknown error"}`);
    } finally {
      clearInterval(interval);
      setIsSubmitting(false);
      setTimeElapsed(0); // Reset the time after submission is complete

      // Reset form state
      setFormData({
        excel: null,
        excelName: "",
        year: "",
        view: "",
        counsellingType: "",
        degreeType: "",
        course: "",
        state: "",
      });

      // Manually reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };
  
  const [view, setView] = useState("upload");

  return (
    <div>
      <div className={styles.button_container}>
        <button
          type="button"
          className={styles.upload_btn}
          onClick={() => setView("upload")}
        >
          <FaUpload className={styles.icon} />
          Upload
        </button>
        <button
          type="button"
          className={styles.delete_btn}
          onClick={() => setView("delete")}
        >
          <FaTrashAlt className={styles.icon} />
          Delete
        </button>
      </div>
      {
        view === "delete" ?
          <DeleteSeatMatrix /> :
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Upload Seat-Matrix Details</h2>

            {/* File input */}
            <div>
              <label htmlFor="file" className={styles.label}>
                Upload Excel File:
              </label>
              <input
                type="file"
                id="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                required
                className={styles.input}
              />
            </div>

            {/* Excel Name */}
            <div>
              <label htmlFor="excelName" className={styles.label}>
                Excel Name:
              </label>
              <input
                type="text"
                id="excelName"
                name="excelName"
                value={formData.excelName}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            {/* Year */}
            <div>
              <label htmlFor="year" className={styles.label}>
                Year:
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                max="2030" // Limit the input to 4 digits max
                min="2010" // Ensure it is at least 1
                className={styles.input}
              />
            </div>

            {/* View Dropdown */}
            <div>
              <label htmlFor="view" className={styles.label}>
                View:
              </label>
              <select
                name="view"
                id="view"
                value={formData.view}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="">Select View</option>
                <option value="table">Table</option>
                <option value="graph">Graph</option>
              </select>
            </div>

            {/* Degree Type Dropdown */}
            <div>
              <label htmlFor="degreeType" className={styles.label}>
                Degree Type:
              </label>
              <select
                name="degreeType"
                id="degreeType"
                value={formData.degreeType}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="">Select Degree Type</option>
                <option value="PG">PG</option>
                <option value="UG">UG</option>
              </select>
            </div>

            {/* Conditionally rendered Degree Dropdown */}
            {formData.degreeType === "UG" && (
              <div>
                <label htmlFor="course" className={styles.label}>
                  UG Degree:
                </label>
                <select
                  name="course"
                  id="course"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                  className={styles.select}
                >
                  <option value="">Select UG Degree</option>
                  <option value="MBBS">MBBS</option>
                  <option value="BDS">BDS</option>
                </select>
              </div>
            )}

            {/* Counselling Type Dropdown */}
            <div>
              <label htmlFor="counsellingType" className={styles.label}>
                Counselling Type:
              </label>
              <select
                name="counsellingType"
                id="counsellingType"
                value={formData.counsellingType}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="">Select Counselling Type</option>
                <option value="MCC">MCC</option>
                <option value="State">State</option>
              </select>
            </div>

            {/* Conditionally rendered State Dropdown */}
            {formData.counsellingType === "State" && (
              <div>
                <label htmlFor="state" className={styles.label}>
                  State:
                </label>
                <select
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className={styles.select}
                >
                  <option value="">Select State</option>
                  {states.sort().map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Submit Button */}
            <div className={styles.submitButtonWrapper}>
              <button
                type="submit"
                className={`${styles.button} ${isSubmitting ? styles.submitting : ""
                  }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    <span>Submitting... ({timeElapsed}s)</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>

            <p
              style={{
                color: message?.includes("seat-matrix added successfully")
                  ? "green"
                  : "red",
                textAlign: "center",
              }}
            >
              {message}
            </p>
          </form>
      }
    </div>
  );
};

export default SeatMatrix;
