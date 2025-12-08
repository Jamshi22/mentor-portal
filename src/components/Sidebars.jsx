"use client";

import { useState, useEffect } from "react";
import { HiHome } from "react-icons/hi";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiCoupon2Fill } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { RiQuestionFill } from "react-icons/ri";
import { FaQuestion } from "react-icons/fa";
import { RiContactsBook3Fill } from "react-icons/ri";
import { FaCirclePlay } from "react-icons/fa6";
import { MdOutlineAddLink } from "react-icons/md";
import { SiGreatlearning } from "react-icons/si";
import { FaLink } from "react-icons/fa6";
import { IoMdCloudUpload } from "react-icons/io";

import {
  MdOutlineCurrencyRupee,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { HiCurrencyRupee } from "react-icons/hi2";
import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LeftLogo from "../utils/svgs/LeftLogo";
import { usePathname } from "next/navigation";
import LogoutModal from "./LogoutModal";
import nookies from "nookies"; // Import nookies to manage cookies
import { FcFaq } from "react-icons/fc";
import { RiWhatsappFill } from "react-icons/ri";

const Sidebars = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tooltip, setTooltip] = useState("");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false); // New state for HelpModal

  useEffect(() => {
    // Get user details from localStorage
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    // console.log("user details ", userDetails)
    if (userDetails && userDetails.employee && userDetails.employee[0]?.Roles) {
      // setRole(userDetails?.employee[0]?.Roles[0]?.roleName); // Set the user's role
      setRole(userDetails?.employee[0]?.Roles?.map(r => r.roleName)); // Set the user's role
    }
  }, []);

  const sidebarItems = [
    { name: "Dashboard", href: "/dashboard", icon: MdDashboard },
    { name: "Employees", href: "/employee", icon: BsFillPeopleFill }, // Only for super-admin
    { name: "Coupons", href: "/coupon", icon: RiCoupon2Fill }, // Only for super-admin
    { name: "Payment", href: "/payment", icon: HiCurrencyRupee },
    { name: "Webinar", href: "/webinar", icon: FaCirclePlay },
    { name: "Speed Labs", href: "/speedlabs", icon: SiGreatlearning },
    { name: "Link", href: "/applicationlink", icon: FaLink },
    { name: "Community", href: "/community", icon: RiWhatsappFill },
    { name: "Expert Videos", href: "/expertVidoes", icon: MdOutlineAddLink },
    { name: "Uploader", href: "/Uploader", icon: IoMdCloudUpload },
  ];

  // console.log("role => ", role)
  // Filter sidebar items based on role
  // const filteredSidebarItems = sidebarItems.filter(({ name }) => {
  //   if (role === "employee") {
  //     return    name === "Uploader"; // Show only Dashboard and Payment for employee
  //   }

  //   return true; // Show all items for super-admin

  // });

  // const roleNames = role?.map(r => r.roleName);

const filteredSidebarItems = sidebarItems.filter(({ name }) => {
  const hasEmployee = role.includes("employee");
  const hasWebinar = role.includes("hm-webinar-access");

  // if employee role → allow Uploader
  if (hasEmployee && name === "Uploader") return true;

  // if webinar role → allow webinar
  if (hasWebinar && name === "Webinar") return true;

  // if neither employee nor webinar, show all (super-admin or others)
  if (!hasEmployee && !hasWebinar) return true;

  return false;
});


  // console.log("filtered ", filteredSidebarItems)


  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    nookies.destroy(null, "authToken", { path: "/" }); // Clear cookie from root path
    router.push("/");
    localStorage.clear("userDetails");
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handlegetushelp = () => {
    router.push("/getHelp");
  };

  const handlefaqopen = () => {
    router.push("/faq");
  };

  return (
    <>
      <div
        className={`${styles.sidebars} ${isCollapsed ? styles.collapsed : ""}`}
      >
        <div className={styles.sidebar__top}>
          <Link href="/dashboard" className={styles.sidebar__logo}>
            <LeftLogo />
          </Link>
          <p
            className={
              isCollapsed ? styles.sidebar_logo_none : styles.sidebar__logo_name
            }
          >
            Dashboard
          </p>
        </div>
        <button className={styles.menuButton} onClick={toggleSidebar}>
          {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
        </button>

        <div className={styles.menu_container}>
          <ul className={styles.menu}>
            {filteredSidebarItems.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className={
                  pathname === href
                    ? styles.sidebar__link__active
                    : styles.sidebar__link
                }
                onMouseEnter={() => isCollapsed && setTooltip(name)}
                onMouseLeave={() => setTooltip("")}
              >
                <li className={styles.menulist}>
                  <span className={styles.sidebar__icon}>
                    <Icon />
                  </span>
                  <span
                    className={`${styles.sidebar__text} ${isCollapsed ? styles.collapsedText : ""
                      }`}
                  >
                    {name}
                  </span>
                  {isCollapsed && tooltip === name && (
                    <div className={styles.tooltip}>
                      <span>{name}</span>
                    </div>
                  )}
                </li>
              </Link>
            ))}
          </ul>

          {/* Get Help and Logout section */}
          <div>
            {/* <ul
              className={`${styles.gethelp_container} ${
                isCollapsed ? styles.collapsed_gethelp : ""
              }`}
              onClick={handlefaqopen} // Set handler for opening HelpModal
            >
              <li className={styles.gethelp_icon}>
                <img
                  width="23"
                  height="25"
                  src="https://img.icons8.com/ios-filled/50/faq.png"
                  alt="faq"
                />
              </li>
              <li
                className={`${styles.gethelp_text} ${
                  isCollapsed ? styles.collapsedText : ""
                }`}
              >
                FAQ
              </li>

              {isCollapsed && (
                <div className={styles.gethelptooltip}>
                  <span>FAQ</span>
                </div>
              )}
            </ul>

            <ul
              className={`${styles.gethelp_container} ${
                isCollapsed ? styles.collapsed_gethelp : ""
              }`}
              onClick={handlegetushelp} // Set handler for opening HelpModal
            >
              <li className={styles.gethelp_icon}>
                <FaQuestion /> 
              </li>
              <li
                className={`${styles.gethelp_text} ${
                  isCollapsed ? styles.collapsedText : ""
                }`}
              >
                Get Us Help
              </li>

              {isCollapsed && (
                <div className={styles.gethelptooltip}>
                  <span>Get Us Help</span>
                </div>
              )}
            </ul> */}

            <ul
              className={`${styles.logout_container} ${isCollapsed ? styles.collapsed_logout : ""
                }`}
              onClick={openLogoutModal}
            >
              <li className={styles.logout_icon}>
                <RiLogoutBoxRFill />
              </li>
              <li
                className={`${styles.logout_text} ${isCollapsed ? styles.collapsedText : ""
                  }`}
              >
                Logout
              </li>

              {isCollapsed && (
                <div className={styles.logouttooltip}>
                  <span>Logout</span>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>

      {isLogoutModalOpen && (
        <LogoutModal
          handleLogout={handleLogout}
          isLogoutModalOpen={isLogoutModalOpen}
          setIsLogoutModalOpen={setIsLogoutModalOpen}
          openLogoutModal={openLogoutModal}
          closeLogoutModal={closeLogoutModal}
        />
      )}

      {isHelpModalOpen && (
        <HelpModal
          isOpen={() => setIsHelpModalOpen(true)}
          onClose={() => setIsHelpModalOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebars;
