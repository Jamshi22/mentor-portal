"use client";

import Navbars from "../../components/Navbars";
import Sidebars from "../../components/Sidebars";
import styles from "../page.module.css";
import React, { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import nookies from "nookies"; // To manage cookies
import withAuth from "../../components/withAuth";

const Dashboard = () => {
  // const router = useRouter();

  // useLayoutEffect(() => {
  //   const cookies = nookies.get(null);
  //   const authToken = cookies.authToken;

  //   if (!authToken) {
  //     router.push("/");
  //   }
  // }, [router]);


    return (
      <div className={styles.containers}>
        <Sidebars />
        <div className={styles.mainContent}>
          <Navbars />
          <div className={styles.contents}>Dashboard</div>
        </div>
      </div>
    );
  

};

export default withAuth(Dashboard);
