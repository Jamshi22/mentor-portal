"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchUsersQuery } from "../lib/services/user";
import styles from "../styles/Navbar.module.css";
import RegisterLead from "./RegisterLead";
import EmployeeRegister from "./EmployeeRegister";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

const Navbars = () => {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [employeeModal, setEmployeeModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [roles, setRoles] = useState("");
  const previousSearchResult = useRef(null); // Store the previous search result in a ref

  const {
    data: users,
    error,
    isLoading,
  } = useSearchUsersQuery(phoneNumber, {
    skip: !triggerSearch || !phoneNumber,
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails?.employee && userDetails?.employee[0]?.Roles) {
      setRoles(userDetails.employee[0]?.Roles[0]?.roleName);
    }
  }, []);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const phoneRegex = /^[0-9]{10}$/;

      if (phoneRegex.test(phoneNumber)) {
        setSearchResult(null);

        // Check if the current phone number matches the previous search result in the ref
        if (previousSearchResult.current?.phone_number !== phoneNumber) {
          setTriggerSearch(true);
          setErrorMessage("");
        } else {
          // If it matches the previous search result, don't trigger a new search and use the cached result
          setSearchResult(previousSearchResult.current);
          setTriggerSearch(false);
          setPhoneNumber("");
        }
      } else {
        setErrorMessage("Please enter a valid 10-digit phone number.");
        setTriggerSearch(false);
        setSearchResult(null);
      }
    },
    [phoneNumber]
  );

  useEffect(() => {
    if (triggerSearch) {
      setSearchResult(null);
      setErrorMessage("");
      setTriggerSearch(false);
    }

    if (
      error?.data?.errors[0]?.statusCode === 404 ||
      error?.data?.errors[0]?.status === "rejected"
    ) {
      setErrorMessage(error?.data?.errors[0]?.msg); // Set the error message
      // Clear the search result if no user is found
      setSearchResult(null);
      setTriggerSearch(false);
    }

    if (triggerSearch == true && users) {
      setSearchResult(users?.user || null);
      previousSearchResult.current = users?.user || null;
      setTriggerSearch(false);
      setPhoneNumber("");
      if (
        error?.data?.errors[0]?.statusCode === 404 ||
        error?.data?.errors[0]?.status === "rejected"
      ) {
        setErrorMessage(error?.data?.errors[0]?.msg); // Set the error message
        // Clear the search result if no user is found
        setSearchResult(null);
      }
    }
  }, [users, error]);

  const handleInputChange = (event) => {
    const { value } = event.target;

    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length <= 10) {
      setPhoneNumber(numericValue);
    }
    setErrorMessage("");
    setSearchResult(null);
  };

  const handleUserClick = (userId) => {
    router.push(`/profile/${userId}`);
  };

  console.log(triggerSearch, "trigger");

  return (
    <>
      <div className={styles.navbarconatiner}>
        <div className={styles.subContainer}>
          {roles == "employee" ? (
            ""
          ) : (
            <div className={styles.searchContainer}>
              <form className={styles.inputWithButton} onSubmit={handleSearch}>
                <input
                  type="tel"
                  placeholder="Search By PhoneNumber"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  className={styles.searchInput}
                  maxLength={10}
                />
                <button
                  type="submit"
                  disabled={searchResult?.phone_number === phoneNumber}
                  className={
                    searchResult?.phone_number === phoneNumber
                      ? styles.disable_btn
                      : styles.searchButton
                  }
                >
                  Search
                </button>
              </form>

              {errorMessage && (
                <p className={styles.errormessage}>{errorMessage}</p>
              )}

              {searchResult && (
                <div className={styles.user_search_list}>
                  {isLoading && <p>Loading...</p>}
                  <div
                    key={searchResult?.id}
                    className={styles.user_search_card}
                    onClick={() => handleUserClick(searchResult?.phone_number)}
                  >
                    <p className={styles.emailtext}>
                      {searchResult?.first_name}
                    </p>
                    <p className={styles.numberText}>
                      {searchResult?.phone_number}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {roles !== "employee" && (
            <div className={styles.employee_btn}>
              <button onClick={() => setEmployeeModal(true)}>
                Create Employee
              </button>
            </div>
          )}

          {roles !== "employee" && (
            <div className={styles.createlead_btn}>
              <button onClick={() => setShowModal(true)}>Create Lead</button>
            </div>
          )}
        </div>
      </div>
      <RegisterLead showModal={showModal} setShowModal={setShowModal} />
      <EmployeeRegister
        showModal={employeeModal}
        setShowModal={setEmployeeModal}
      />
    </>
  );
};

export default Navbars;
