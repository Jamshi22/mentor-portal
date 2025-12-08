"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../../../styles/profile.module.css";
import PaymentModal from "../../../components/PaymentModal";
import { GoArrowLeft } from "react-icons/go";

const UserProfile = () => {
  const router = useRouter();
  const params = useParams();
  const { userId } = params;
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [upgrade, setUpgrade] = useState(false);
  const handleClose = () => router.push("/dashboard");

  const handleUpdrade = () => {
    setUpgrade(true);
  };


  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}users?phoneNumber=${userId}`
      , {
        method:"GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assuming you are using token-based auth
        },
      }); // Replace with your API endpoint
      const data = await response.json();
      setUserDetails(data.user);
    } catch (err) {
      setError("Failed to fetch user details.");
    } finally {
      setIsLoading(false);
    }
  };

  // Call the API to fetch user details based on userId
  useEffect(() => {
    if (!userId) return; // Wait until userId is available

    fetchUserDetails();
  }, [userId]); // Fetch data whenever userId changes


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className={styles.singleprofile_container}>
        {/* <h1>User Profile</h1>
      {userDetails ? (
        <div>
          <p>First Name: {userDetails.first_name}</p>
          <p>Phone Number: {userDetails.phone_number}</p>
        </div>
      ) : (
        <p>No user found with ID: {userId}</p>
      )} */}
        <div className={styles.profile_Header}>
          {userDetails && (
            <div className={styles.profileName}>
              <div>
                <GoArrowLeft
                  onClick={handleClose}
                  style={{ fontSize: "26px" }}
                />
              </div>
              <h1 className={styles.profile_avatar}>
                {userDetails.first_name.slice(0, 1)}
              </h1>
              <h4>{userDetails.first_name}</h4>
              <h4>{userDetails.last_name}</h4>
            </div>
          )}

          <div className={styles.action_feilds}>
            {!/achieve/i.test(userDetails.subscriptionPlan?.plan_name) && (
              <button className={styles.upgrade_btn} onClick={handleUpdrade}>
                Upgrade
              </button>
            )}
            <button className={styles.edit_btn}>Edit</button>
          </div>
        </div>
        <div className={styles.profile_container}>
          <h4>Profile Details</h4>
          <div className={styles.cardContent}>
            <div className={styles.informationField}>
              <p>First Name</p>
              <p>-</p>
              <p>{userDetails.first_name ? userDetails.first_name : "-"}</p>
            </div>
            <div className={styles.informationField}>
              <p>Last Name</p>
              <p>-</p>
              <p>{userDetails.last_name ? userDetails.last_name : "-"}</p>
            </div>
            <div className={styles.informationField}>
              <p>Email</p>
              <p>-</p>
              <p>{userDetails.email ? userDetails.email : "-"}</p>
            </div>
            <div className={styles.informationField}>
              <p>Phone Number</p>
              <p>-</p>
              <p>{userDetails.phone_number ? userDetails.phone_number : "-"}</p>
            </div>

            <div className={styles.informationField}>
              <p>Degree Type</p>
              <p>-</p>
              <p>
                {userDetails?.degreeType?.name
                  ? userDetails?.degreeType?.name
                  : "-"}
              </p>
            </div>

            <div className={styles.informationField}>
              <p>Subscription Plan</p>
              <p>-</p>
              <p>
                {userDetails.subscriptionPlan?.plan_name
                  ? userDetails.subscriptionPlan?.plan_name
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        {upgrade && (
          <PaymentModal
            setUpgrade={setUpgrade}
            data={userDetails}
            fetchUserDetails={fetchUserDetails}
          />
        )}
      </div>
    </>
  );
};

export default UserProfile;
