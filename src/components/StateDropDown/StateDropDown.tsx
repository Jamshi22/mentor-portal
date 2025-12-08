import React from "react";
import styles from "./state.module.css"

interface StateDropdownProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  className?: string;
  label?: string;
}

const states = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const StateDropdown: React.FC<StateDropdownProps> = ({
  id = "state",
  name = "state",
  value,
  onChange,
  required = false,
  className = "",
  label = "State",
}) => {
  return (
    <div className={styles.inputStylesContainer}>
      <label htmlFor={id}>{label}:</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={className}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateDropdown;
