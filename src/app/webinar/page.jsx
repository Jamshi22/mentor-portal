"use client";

import React, { useState } from "react";
import Navbars from "../../components/Navbars";
import Sidebars from "../../components/Sidebars";
import styles from "../page.module.css";
import UpComing from "./components/Upcoming/UpComing";
import Recorded from "./components/Recorded/component/recorded";
import { useGetUpcomingRecordedWebinarQuery } from "../../lib/services/webinarRecorded";
import { retry } from "@reduxjs/toolkit/query";
import LoadingDots from "../../components/LoadingDots";

const WebinarPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming"); // state to track the active tab

  const { isLoading } = useGetUpcomingRecordedWebinarQuery();

  if (isLoading) {
    return <LoadingDots />;
  }

  return (
    <div className={styles.containers}>
      <Sidebars />
      <div className={styles.mainContent}>
        <Navbars />
        <div className={styles.contents}>
          <div className={styles.tab_container}>
            <p
              className={
                activeTab === "upcoming"
                  ? styles.tab_active
                  : styles.tab_inactive
              }
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Webinar
            </p>
            <p
              className={
                activeTab === "recorded"
                  ? styles.tab_active
                  : styles.tab_inactive
              }
              onClick={() => setActiveTab("recorded")}
            >
              Recorded Webinar
            </p>
          </div>
          <div className={styles.tabContent}>
            {activeTab === "upcoming" ? <UpComing /> : <Recorded />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarPage;
