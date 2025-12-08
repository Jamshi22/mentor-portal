import React, { useState } from 'react';
import { useStopwatch } from "react-timer-hook";
import styles from "./fee.module.css";
import StateDropdown from '../../../components/StateDropDown/StateDropDown';
import { useFeeStipendBondUploaderMutation } from '../../../lib/services/Uploaderservice/UploadClosingRank';
import { FaTrashAlt, FaUpload } from 'react-icons/fa';
import Swal from 'sweetalert2';
import DeleteFeeStipendBond from './components/DeleteFeeStipendBond/DeleteFeeStipendBond';

const FeeStipendBondUploader = () => {
    const [state, setState] = useState("Karnataka");
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        file: null as File | null,
        isCreatedFlag: true,
        degreeType: "",
        degree: "",
        counsellingType: "",
    });

    const {
        seconds,
        minutes,
        hours,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    const [uploadFeeStipendBond] = useFeeStipendBondUploaderMutation();

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setState(e.target.value);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "file" ? files?.[0] || null : value,
        }));
    };

    const handleSubmit = async () => {
        setIsUploading(true);
        start(); // start timer
        const data = new FormData();

        if (formData.file) {
            data.append("file", formData.file);
        }

        data.append("iscreatedFlag", formData.isCreatedFlag.toString());
        data.append("degreeType", formData.degreeType);
        // data.append("degree", formData.degree);
        data.append("counsellingType", formData.counsellingType);
        if (formData.counsellingType !== "MCC") {
            data.append("state", state);
        }
        // console.log("formdata => ", formData)
        // console.log("data => ", data)

        try {
            const response = await uploadFeeStipendBond(data).unwrap();
            // console.log("upload response ", response)
            Swal.fire("Success", "Data uploaded successfully", "success")
        } catch (error) {
            // toast.error(error?.data?.message || "Upload failed. Please try again.");
            console.error("❌ Error deleting data:", error);
            Swal.fire("Error", "Could not delete data", "error");
        } finally {
            setIsUploading(false);
            pause(); // stop timer
        }
    };

    const [view, setView] = useState("upload");

    return (
        <div className={styles.mainContainer}>
            {/*  */}
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
                view === "upload" ?

                    <div className={styles.uploadContainer}>
                        <h2>Fee Stipend Bond Uploader</h2>

                        <div className={styles.uploadInnerContainer}>
                            {/* File Input */}
                            <div className={styles.inputStylesContainer}>
                                <label htmlFor="file">Upload File:</label>
                                <input name="file" onChange={handleChange} id="file" type="file" />
                            </div>

                            {/* Degree Type Dropdown */}
                            <div className={styles.inputStylesContainer}>
                                <label htmlFor="degreeType">Degree Type:</label>
                                <select onChange={handleChange} name="degreeType" id="degreeType">
                                    <option value="">Select Degree Type</option>
                                    <option value="PG">PG</option>
                                    <option value="UG">UG</option>
                                </select>
                            </div>

                            {/* Counselling Type Dropdown */}
                            <div className={styles.inputStylesContainer}>
                                <label htmlFor="counsellingType">Counselling Type:</label>
                                <select onChange={handleChange} name="counsellingType" id="counsellingType">
                                    <option value="">Select Counselling Type</option>
                                    <option value="MCC">Central Counselling Bodies</option>
                                    <option value="State">State Counselling Bodies</option>
                                </select>
                            </div>

                            {/* State Dropdown Component */}
                            <div className={styles.inputStylesContainer}>
                                <StateDropdown
                                    value={state}
                                    onChange={handleStateChange}
                                    required
                                    className={styles.select}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className={styles.inputStylesContainer}>
                                {/* <button onClick={handleSubmit}> {isUploading ? `${hours }: ${minutes}: ${seconds}`:"Upload"}</button> */}
                                <button onClick={isUploading ? undefined : handleSubmit}>
                                    {isUploading
                                        ? hours > 0
                                            ? `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
                                            : `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`
                                        : "Upload"}
                                </button>

                            </div>
                        </div>
                    </div>
                    :
                    <DeleteFeeStipendBond />

            }
        </div>
    );
};

export default FeeStipendBondUploader;
