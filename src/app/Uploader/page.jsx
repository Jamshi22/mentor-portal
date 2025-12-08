"use client";

import React, { useState } from "react";
import styles from "../page.module.css";
import Sidebars from "../../components/Sidebars";
import Navbars from "../../components/Navbars";
import RankUploader from "./rank-uploader/page";
import SeatMatrix from "./seatMatrix-uploader/page";
import FeeStipendBondUploader from "./feeStipendBond-uploader/FeeStipendBondUploader";


const Uploader = () => {
  const [activeTab, setActiveTab] = useState("closing-rank");

  const renderComponent = () => {
    switch (activeTab) {
      case "closing-rank":
        return <RankUploader />;
      case "seat-matrix":
        return <SeatMatrix />;
      case "fee-stipend":
        return <FeeStipendBondUploader />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.containers}>
      <Sidebars />
      <div className={styles.mainContent}>
        <Navbars />

        <div className={styles.main_container}>
          <div className={styles.toogle_container}>
            <p
              className={
                activeTab === "closing-rank"
                  ? styles.toogle_fnt_active
                  : styles.toogle_fnt
              }
              onClick={() => setActiveTab("closing-rank")}
            >
              Closing Rank Uploader
            </p>
            <p
              className={
                activeTab === "seat-matrix"
                  ? styles.toogle_fnt_active
                  : styles.toogle_fnt
              }
              onClick={() => setActiveTab("seat-matrix")}
            >
              Seat Matrix Uploader
            </p>
            <p
              className={
                activeTab === "fee-stipend"
                  ? styles.toogle_fnt_active
                  : styles.toogle_fnt
              }
              onClick={() => setActiveTab("fee-stipend")}
            >
              Fee Stipend Bond Uploader
            </p>
          </div>

          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Uploader;
