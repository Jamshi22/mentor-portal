import { useEffect, useRef, useState } from "react";
import styles from "../styles/multiSelectDropdown.module.css";

const MultiSelectDropdown = ({
  placeholders,
  options,
  selectedOptions, // paymentStatus in this case
  setSelectedOptions, // setPaymentStatus in this case
  setCurrentPage,
}) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [displayedOptions, setDisplayedOptions] = useState(""); // To show names in the dropdown

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setCurrentPage(1);

    const isPlansDropdown = placeholders === "Plans" ;
    const selectedValue = isPlansDropdown
      ? option.id
      : option.name.toLowerCase();
    const displayValue = option.name; // Always display the name

    const selectedArray = selectedOptions ? selectedOptions.split(",") : [];
    const displayArray = displayedOptions ? displayedOptions.split(",") : [];

    if (selectedArray.includes(selectedValue)) {
      // Remove the option if already selected
      const updatedSelectedArray = selectedArray.filter(
        (item) => item !== selectedValue
      );
      const updatedDisplayArray = displayArray.filter(
        (item) => item !== displayValue
      );
      setSelectedOptions(updatedSelectedArray.join(",")); // Update the selected value (IDs or names)
      setDisplayedOptions(updatedDisplayArray.join(",")); // Update the displayed names
    } else {
      // Add the option if not already selected
      setSelectedOptions([...selectedArray, selectedValue].join(",")); // Store the IDs or names
      setDisplayedOptions([...displayArray, displayValue].join(",")); // Store the names for display
    }
  };

  // Adjust the display based on the number of selected items
  const displayArray = displayedOptions.split(",");
  const primaryDisplay = displayArray[0] || placeholders;
  const additionalDisplay =
    displayArray.length > 1 ? `+${displayArray.length - 1} more` : "";

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

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.dropdownToggle} onClick={toggleDropdown}>
        {primaryDisplay}

        <span className={styles.icon}>
          {additionalDisplay && (
            <span className={styles.greyText}> {additionalDisplay}</span>
          )}
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
        <div className={styles.dropdownMenu}>
          {options?.map((option) => {
            const isPlansDropdown = placeholders === "Plans";
            const isSelected = selectedOptions
              .split(",")
              .includes(
                isPlansDropdown ? option.id : option.name.toLowerCase()
              );

            return (
              <div
                key={option.id} // Changed to use ID as key
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

export default MultiSelectDropdown;
