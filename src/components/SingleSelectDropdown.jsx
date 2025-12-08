import { useEffect, useRef, useState } from "react";
import styles from "../styles/multiSelectDropdown.module.css";

const SingleSelectDropdown = ({

  placeholder,
  options,
  webinarstyle,  // Add Webinar Props for custom changes in the webinar and recorded webinar form
  selectedOption, // single selected option
  setSelectedOption, // function to update selected option
}) => {
  // console.log("options => ", options)
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.id); // Set the selected option by ID or name
    setIsOpen(false); // Close the dropdown after selection
  };



  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const primaryDisplay =
    options?.find((option) => option.id === selectedOption)?.name ||
    placeholder;

  return (
    <div className={webinarstyle ? styles.dropdown__ : styles.dropdown} ref={dropdownRef}>
      <div className={webinarstyle ? styles.webinarRecorded : styles.dropdownToggle} onClick={toggleDropdown}>
       {primaryDisplay} 
        <span className={styles.icon}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={styles.arrowIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={styles.arrowIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </span>
      </div>
      {isOpen && (
        <div className={webinarstyle ? styles.dropdownMenuWebinar : styles.dropdownMenu}>
          {options?.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <div
                key={option.id}
                className={`${styles.dropdownItem} ${
                  isSelected ? styles.selected : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
                {isSelected && (
                  <span className={styles.checkIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className={styles.checkmark}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12l5 5L20 7"
                      />
                    </svg>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SingleSelectDropdown;
