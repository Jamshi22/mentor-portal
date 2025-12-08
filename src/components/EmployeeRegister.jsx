"use client";

import React, { useState,useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Logo from "../utils/svgs/Logo";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useRegisterUserMutation } from "../lib/services/employeeRegister";
import { IoWarningOutline } from "react-icons/io5";
import "../styles/EmployeeRegister.css";
import { toast } from "react-toastify";

const EmployeeRegister = ({ showModal, setShowModal ,
  employehandleChange,
  employemailchange,}) => {
  const [registerUser, { data, isLoading, isError}] =
    useRegisterUserMutation();


    // Error Message Save
    const [employeeError,setEmployeeError] = useState('')

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullNamError: "",
    emailError: "",
    passwordError: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
    setFormErrors({
      emailError: "",
      passwordError: "",
    });
  };

  const handleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  /* Validation */
  const validateFullName = (fullName) => {
    const fullNameRegex = /^[A-Za-z]+( [A-Za-z]+){0,4}$/
    ;
    if (fullName === "") {
      setFormErrors((prev) => ({
        ...prev,
        fullNamError: "*Name cannot be empty.",
      }));
      return false;
    } else if (fullName.length > 30) {
      setFormErrors((prev) => ({
        ...prev,
        fullNamError: "*Name cannot be more than 30 characters.",
      }));
      return false;
    } else if (fullName.length < 4) {
      setFormErrors((prev) => ({
        ...prev,
        fullNamError: "*Name cannot be less than 4 characters.",
      }));
      return false;
    } else if (!fullNameRegex.test(fullName)) {
      setFormErrors((prev) => ({
        ...prev,
        fullNamError:
          "*Name cannot contain spaces, special characters, or numbers.",
      }));
      return false;
    }

    setFormErrors((prev) => ({
      ...prev,
      fullNamError: "",
    }));
    return true;
  };

  const validateEmail = (email) => {
    const EmailPattern = /^[a-zA-Z0-9._%+-]+@hellomentor\.in$/;
    if (!email) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "*Email cannot be empty",
      }));
      return false;
    } else if (!EmailPattern.test(email)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "*Please provide a valid email format",
      }));
      return false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "",
      }));
      return true;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "email") {
      validateEmail(value);
    } else if (name == "fullName") {
      validateFullName(value);
    }else if(name == 'password'){
      validatePassword(value)
    }
  };

  /* Generate Password */
  const generatePassword = (email) => {
    const specialCharacters = "!@#$%^&*"; 
    const numbers = "0123456789";
    const combinedChars = specialCharacters + numbers;
    

    let password = email.slice(0, 3);
    

    for (let i = 4; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * combinedChars.length);
      password += combinedChars.charAt(randomIndex);
    }
    
    return password;
  };
  
  

  const handleGeneratePassword = () => {
    if (!formData.email) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "*Without email, password cannot be generated",
      }));
      return false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "",
      }));
      const randomPassword = generatePassword(formData.email);
      setFormData((prevData) => ({
        ...prevData,
        password: randomPassword,
      }));
      setShowPassword(true);
      return true;
    }
  };

  const validatePassword = (password) => {
    if (!password ) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "*Password cannot be empty",
      }));
      return false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "",
      }));
       
      return true;
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const isValidFullName = validateFullName(formData.fullName);
    const isValidEmail = validateEmail(formData.email);
    const isValidPassword = validatePassword(formData.password);

    if (isValidEmail && isValidPassword && isValidFullName) {
      let result;
        result = await registerUser({
          fullname: formData.fullName,
          email: formData.email,
          password: formData.password,
        }).unwrap(); 
        toast.success("Employee Registered Successfully");


      setShowModal(false);
      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
      employehandleChange("");
      employemailchange("");
    }
  } catch (err) {
    console.log(err); 
    const errorMessages = err?.data?.errors?.map((error) => error.msg).join(", ");
    setEmployeeError(errorMessages)
    // toast.error(errorMessages);
  }
};

  
 
useEffect(()=>{
setFormData({
  fullName: "",
  email: "",
  password: "",
})

setFormErrors({
  fullNamError: "",
  emailError: "",
  passwordError: "",
})

setEmployeeError('')


},[showModal])

  return (
    <>
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header className="modal_header" closeButton></Modal.Header>
        <Modal.Body>
          <div className="employee-register-form">
            <div className="employee-register-form-logo-container">
              <Logo />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="employee-register-input-container">
                <label className="employee_label__">
                  {formErrors.fullNamError ? `FirstName*` : `FirstName`}
                </label>
                <div className="employee-register-input_icon_container">
                  <div className="employee-register-input-icon">
                    <FaUserCircle />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    className={
                      formErrors.fullNamError
                        ? `employee_register_input_validation_`
                        : `employee-register-input-box__`
                    }
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    maxLength={31}
                  />
                </div>
                {formErrors.fullNamError && (
                  <span className="employeeregister_error">
                    {formErrors.fullNamError}
                  </span>
                )}

                <label className="employee_label__">
                  {formErrors.emailError ? `Email*` : `Email`}
                </label>
                <div className="employee-register-input_icon_container">
                  <div className="employee-register-input-icon">
                    <MdEmail />
                  </div>
                  <input
                    type="text"
                    name="email"
                    className={
                      formErrors.emailError
                        ? `employee_register_input_validation_`
                        : `employee-register-input-box__`
                    }
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@hellomentor"
                  />
                </div>
                {formErrors.emailError && (
                  <span className="employeeregister_error">
                    {formErrors.emailError}
                  </span>
                )}

                <label className="employee_label__">
                  {formErrors.passwordError ? `Password*` : `Password`}
                </label>

                <div className="input_icon_container">
                  <div className="input-icon">
                    <RiLockPasswordFill color="black" />
                  </div>
                  <input
                    className={
                      formErrors.passwordError
                        ? `employee_register_input_validation_`
                        : `employee-register-input-box__`
                    }
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleInputChange}
                    value={formData.password}
                  />
                  <div className="input-eye-icon" onClick={handleShowPassword}>
                    {showPassword ? <FaEye /> : <FaRegEyeSlash />}
                  </div>
                </div>
                {formErrors.passwordError && (
                  <span className="employeeregister_error">
                    {formErrors.passwordError}
                  </span>
                )}
                <div>
                  <span
                    type="button"
                    className="generate_password"
                    onClick={handleGeneratePassword}
                  >
                    Generate Password
                  </span>
                </div>
              </div>
              <div className="employee-register_btn-container">
                <button className="employee-register_btn_open" type="submit">
                  Submit
                </button>
                <div className='employee-validation-error__'>
                  {employeeError &&  <p className='employee-validation-error-fnt'><IoWarningOutline color="red"/> {" "}{employeeError}</p>}
                 
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmployeeRegister;
