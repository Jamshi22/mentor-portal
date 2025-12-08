"use client";
import React  from "react";
import Sidebars from "../../components/Sidebars";
import Navbars from "../../components/Navbars";
import styles from "../page.module.css";
import CommunityLinksTable from "./components/CommunityTable";
import { useState } from "react";

const CommunityLink = () =>{
    return (
        <section className={styles.containers}>
        <Sidebars />
        <div className={styles.mainContent_applicationLink}>
          <Navbars />
         <CommunityLinksTable/>
        </div>
      </section>
    )
}





export default CommunityLink




