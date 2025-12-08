import React from "react";
import Sidebars from "../../components/Sidebars";
import Navbars from "../../components/Navbars";
import styles from "../page.module.css";
import Leads from "../../components/Leads";

const LeadsPage = () => {
  return (
    <div className={styles.containers}>
      <Sidebars />
      <div className={styles.mainContent}>
        <Navbars />
        <div className={styles.contents}>
          {/* <Leads /> */}
        </div>
      </div>
    </div>
  );
};

export default LeadsPage;
