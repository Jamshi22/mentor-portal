import React from "react";
import Navbars from "../../components/Navbars";
import Sidebars from "../../components/Sidebars";
import styles from "../page.module.css";
import EmployeeTable from '../../components/EmployeeTable'

const Employee = () => {
  return (
    <div className={styles.containers}>
      <Sidebars />
      <div className={styles.mainContent}>
        <Navbars />
        <div className={styles.contents}>
          <EmployeeTable/>
        </div>
      </div>
    </div>
  );
};

export default Employee;
