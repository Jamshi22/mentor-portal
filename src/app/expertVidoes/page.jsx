"use client";

import React from "react";
import Sidebars from "../../components/Sidebars";
import Navbars from "../../components/Navbars";
import styles from "../page.module.css";
import ExpertVideo from './expertVideo'
const ExpertVideos = () => {
  return (
    <>
      <div className={styles.containers}>
        <Sidebars />
        <div className={styles.mainContent}>
          <Navbars />
          <ExpertVideo/>
        </div>
      </div>
    </>
  );
};

export default ExpertVideos;
