"use client";
import React from "react";
import Sidebars from "../../components/Sidebars";
import Navbars from "../../components/Navbars";
import styles from "../page.module.css";
import ApplicationLink from "./components/application/ApplicationLink";
import CounselingLink from "./components/Counseling/CounselingLink";
import ImportantLink from './components/ImportantLink/ImportantLink'
import { useState } from "react";
import NewsLinks from "./components/NewsLinks/NewsLinks";

const page = () => {
  const [active, setActive] = useState("Counselling Links");

  return (
    <>
      <section className={styles.containers}>
        <Sidebars />
        <div className={styles.mainContent_applicationLink}>
          <Navbars />
          <div className={styles.content____}>
            <div className={styles.tab_container}>
              <p
                className={
                  active === "Application Links"
                    ? styles.tab_active
                    : styles.tab_inactive
                }
                onClick={() => setActive("Application Links")}
              >
                Application Links
              </p>
              <p
                className={
                  active === "Counselling Links"
                    ? styles.tab_active
                    : styles.tab_inactive
                }
                onClick={() => setActive("Counselling Links")}
              >
                Counselling Links
              </p>
              <p
                className={
                  active === "Important Links"
                    ? styles.tab_active
                    : styles.tab_inactive
                }
                onClick={() => setActive("Important Links")}
              >
                Important Links
              </p>
              <p
                className={
                  active === "News Links"
                    ? styles.tab_active
                    : styles.tab_inactive
                }
                onClick={() => setActive("News Links")}
              >
                News Links
              </p>
            </div>
          </div>
          <div className={styles.tab_container_main}>
            {active === "Application Links" && <ApplicationLink />}
            {active === "Counselling Links" && <CounselingLink />}
            {active === "Important Links" && <ImportantLink />}
            {active === "News Links" && <NewsLinks />}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;


