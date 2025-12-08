import React from "react";
import Navbars from "../../components/Navbars";
import Sidebars from "../../components/Sidebars";
import styles from '../page.module.css'
import PaymentTable from "../../components/PaymentTable";

const PaymentPage = () => {
  return (
    <div className={styles.containers}>
      <Sidebars />
      <div className={styles.mainContent}>
        <Navbars />
        <div className={styles.contents}>
          <PaymentTable />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
