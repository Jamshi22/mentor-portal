"use client";
import { useState, useRef } from "react";
import styles from "./formComponent.module.css";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import DeleteClosingRank from "./Component/DeleteComponent/DeleteClosingRank";
import { useUploadRankDetailsMutation } from "../../../lib/services/Uploaderservice/UploadClosingRank";

const RankUploader = () => {
  const [view, setView] = useState("upload");
  const [formData, setFormData] = useState({
    file: null,
    iscreatedFlag: true,
    degreeType: "",
    degree: "",
    counsellingType: "",
  });

  const [uploadRankDetails] = useUploadRankDetailsMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage("");
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const startTime = Date.now();
    const interval = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    const data = new FormData();
    data.append("file", formData.file);
    data.append("iscreatedFlag", formData.iscreatedFlag);
    data.append("degreeType", formData.degreeType);
    data.append("degree", formData.degree);
    data.append("counsellingType", formData.counsellingType);

    try {
      const response = await uploadRankDetails(data).unwrap();
      setMessage(response?.message || "Upload successful.");
    } catch (err) {
      const errorHtml = err?.data || "";
      const parser = new DOMParser();
      const doc = parser.parseFromString(errorHtml, "text/html");
      const preTagContent = doc.querySelector("pre")?.textContent;
      setMessage(preTagContent || "Upload failed.");
    } finally {
      clearInterval(interval);
      setIsSubmitting(false);
      setTimeElapsed(0);
      setFormData({
        file: null,
        iscreatedFlag: true,
        degreeType: "",
        degree: "",
        counsellingType: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };

  return (
    <section className={styles.main_container__}>
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

      {view === "upload" ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Upload Rank Details</h2>
          <div>
            <label htmlFor="file" className={styles.label}>
              Upload File:
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

          {formData.degreeType === "UG" && (
            <div>
              <label htmlFor="degree" className={styles.label}>
                UG Degree:
              </label>
              <select
                name="degree"
                id="degree"
                value={formData.degree}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="">Select UG Degree</option>
                <option value="MBBS">MBBS</option>
                <option value="BDS">BDS</option>
                <option value="BAMS">BAMS</option>
                <option value="BHMS">BHMS</option>
                <option value="BUMS">BUMS</option>
                <option value="BVSc">BVSc</option>
              </select>
            </div>
          )}

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
              <option value="MCC">Central Counselling Bodies</option>
              <option value="State">State Counselling Bodies</option>
            </select>
          </div>

          <div className={styles.submitButtonWrapper}>
            <button
              type="submit"
              className={`${styles.button} ${
                isSubmitting ? styles.submitting : ""
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
              color: message?.includes("successfully") ? "green" : "red",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        </form>
      ) : (
        <div className={styles.table_container___}>
          <DeleteClosingRank onClose={() => setView("upload")} />
        </div>
      )}
    </section>
  );
};

export default RankUploader;
