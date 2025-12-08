import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Logo from "../utils/svgs/Logo";
import { useRouter } from "next/navigation";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import PhoneInput from "react-phone-input-2"; // Import PhoneInput component
import "react-phone-input-2/lib/style.css"; // Import PhoneInput styles
import "../styles/registerlead.css";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";

const RegisterLead = ({ showModal, setShowModal }) => {



  // Error message 
  const [registerleaderror,setregistererror] = useState('')

  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    phoneNumber: "",
    selectedStream: "0a15ec41-1773-431a-8e0c-a19ba369fdc7",
  });

  const [formErrors, setFormErrors] = useState({
    firstNameError: "",
    secondNameError: "",
    emailError: "",
    phoneNumberError: "",
  });

  const router = useRouter();

  const handleModalClose = () => {
    setShowModal(false);
    setFormErrors({
      firstNameError: "",
      secondNameError: "",
      emailError: "",
      phoneNumberError: "",
    });
  };

  const validateFirstName = (firstName) => {
    const FirstNameregex = /^[A-Za-z]+( [A-Za-z]+)?$/;
    if (!firstName) {
      setFormErrors((prev) => ({
        ...prev,
        firstNameError: "*First Name Cannot Be Empty",
      }));
      return false;
    } else if (firstName.length > 20) {
      setFormErrors((prev) => ({
        ...prev,
        firstNameError: "Name cannot be more than 20 characters",
      }));
      return false;
    } else if (firstName.length < 4) {
      setFormErrors((prev) => ({
        ...prev,
        firstNameError: "Name cannot be less than 4 characters",
      }));
      return false;
    } else if (!FirstNameregex.test(firstName)) {
      setFormErrors((prev) => ({
        ...prev,
        firstNameError:
          "Name cannot have spaces, special characters, or numbers",
      }));
      return false;
    }
    setFormErrors((prev) => ({ ...prev, firstNameError: "" }));
    return true;
  };

  const validateSecondName = (secondName) => {
    const SecondNameregex = /^[A-Za-z]+( {1,3}[A-Za-z]+){0,2}$/;
    if (!secondName) {
      setFormErrors((prev) => ({
        ...prev,
        secondNameError: "*Last Name Cannot Be Empty",
      }));
      return false;
    } else if (secondName.length > 20) {
      setFormErrors((prev) => ({
        ...prev,
        secondNameError: "Last Name cannot be more than 20 characters",
      }));
      return false;
    } else if (!SecondNameregex.test(secondName)) {
      setFormErrors((prev) => ({
        ...prev,
        secondNameError:
          "Last Name cannot have spaces, special characters, or numbers",
      }));
      return false;
    }
    setFormErrors((prev) => ({ ...prev, secondNameError: "" }));
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]{2,63}\.(com|net|in)$/;
    if (!email) {
      setFormErrors((prev) => ({ ...prev, emailError: "*Email is required." }));
      return false;
    } else if (!emailRegex.test(email)) {
      setFormErrors((prev) => ({
        ...prev,
        emailError: "Please provide a valid email format.",
      }));
      return false;
    }

    setFormErrors((prev) => ({ ...prev, emailError: "" }));
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "firstName") validateFirstName(value);
    if (name === "secondName") validateSecondName(value);
    if (name === "email") validateEmail(value);
    if (name === "phonenumber") validatePhoneNumber(value);
  };

  const handlePhoneNumberChange = (value) => {
    validatePhoneNumber(value);
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
  };

  const handleStreamChange = (e) => {
    setFormData((prev) => ({ ...prev, selectedStream: e.target.value }));
  };

  const validatePhoneNumber = (value) => {
    if (!value) {
      setFormErrors((prev) => ({
        ...prev,
        phoneNumberError: "*PhoneNumber Cannot Be Empty.",
      }));
      return false;
    }
    setFormErrors((prev) => ({ ...prev, phoneNumberError: "" }));
    return true;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const isFirstName = validateFirstName(formData.firstName);
    const isLastName = validateSecondName(formData.secondName);
    const isEmail = validateEmail(formData.email);
    const isPhoneNumber = validatePhoneNumber(formData.phoneNumber);

    if (isFirstName && isLastName && isEmail && isPhoneNumber) {
      const requestBody = {
        phone_number: formData.phoneNumber.slice(2),
        first_name: formData.firstName,
        email: formData.email,
        degreeTypeId: formData.selectedStream,
        last_name: formData.secondName,
        country_code: `+${formData.phoneNumber.slice(0,2)}`,
      };

  

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assuming you are using token-based auth
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        // console.log(data)

        if (response.ok) {
          toast.success(data.message || "Lead Created Successfully");
          router.push("/dashboard");
          setFormData({
            firstName: "",
            secondName: "",
            email: "",
            phoneNumber: "",
            selectedStream: "0a15ec41-1773-431a-8e0c-a19ba369fdc7",
          });
          setShowModal(false);
        } else {
          setregistererror(data?.errors[0]?.msg || "Error processing request")
          // console.log(data?.errors[0]?.msg || "Error processing request")
        }
      } catch (error) {
        setregistererror("Error submitting form:", error.message)
        // console.log(error.message)
      }
    }
  };

  useEffect(()=>{
   setFormData({
    firstName: "",
    secondName: "",
    email: "",
    phoneNumber: "",
    selectedStream: "0a15ec41-1773-431a-8e0c-a19ba369fdc7",
   })

   setFormErrors({
    firstNameError: "",
    secondNameError: "",
    emailError: "",
    phoneNumberError: "",
   })

   setregistererror('')

  },[showModal])
  return (
    <>
      <Modal show={showModal}  onHide={handleModalClose} centered>
        <Modal.Header className="modal_header" closeButton></Modal.Header>
        <div className="register-form">
          <div className="register-form-logo-container">
            <Logo />
          </div>
          <form onSubmit={handleRegisterSubmit}>
            <div className="register-input-container">
              <label className="register-input-form-label">
                {formErrors.firstNameError ? `FirstName*` : `FirstName`}
              </label>
              <div className="register-input_icon_container">
                <div className="register-input-icon">
                  <FaUser />
                </div>
                <input
                  type="text"
                  minLength={4}
                  placeholder="First name"
                  className={
                    formErrors.firstNameError
                      ? `register_input_container_box_validation_error`
                      : `register_input_container_box`
                  }
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  maxLength={30}
                />
              </div>
              {formErrors.firstNameError && (
                <span className="errormessage_lead">
                  {formErrors.firstNameError}
                </span>
              )}

              <label className="register-input-form-label">
                {formErrors.secondNameError ? `LastName*` : `LastName`}
              </label>
              <div className="register-input_icon_container">
                <div className="register-input-icon">
                  <FaUserFriends />
                </div>
                <input
                  type="text"
                  className={
                    formErrors.secondNameError
                      ? `register_input_container_box_validation_error`
                      : `register_input_container_box`
                  }
                  placeholder="Last name"
                  name="secondName"
                  value={formData.secondName}
                  onChange={handleChange}
                  maxLength={30}
                />
              </div>
              {formErrors.secondNameError && (
                <span className="errormessage_lead">
                  {formErrors.secondNameError}
                </span>
              )}

              <label className="register-input-form-label">
                {formErrors.emailError ? `Email*` : `Email`}
              </label>
              <div className="register-input_icon_container">
                <div className="register-input-icon">
                <MdEmail />
                </div>
                <input
                  type="text"
                  className={
                    formErrors.emailError
                      ? `register_input_container_box_validation_error`
                      : `register_input_container_box`
                  }
                  placeholder="example@gmail.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {formErrors.emailError && (
                <span className="errormessage_lead">
                  {formErrors.emailError}
                </span>
              )}

              <label className="register-input-form-label">
                {formErrors.phoneNumberError ? `Phone Number*` : `Phone Number`}
              </label>
              <div className="register-input_icon_container">
                <PhoneInput
                  country={"in"}
                  countryCodeEditable={false}
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  inputStyle={{ width: "100%" }}
                  name="phonenumber"
                />
              </div>
              {formErrors.phoneNumberError && (
                <span className="errormessage_phone_number_error">
                  {formErrors.phoneNumberError}
                </span>
              )}
            </div>

            <div className="register-stream-heading">
              <p>Select Client Stream</p>
            </div>

            <div className="register-stream-select">
              <div className="register-ug-btn">
                <input
                  type="radio"
                  value="0a15ec41-1773-431a-8e0c-a19ba369fdc7"
                  checked={
                    formData.selectedStream ===
                    "0a15ec41-1773-431a-8e0c-a19ba369fdc7"
                  }
                  onChange={handleStreamChange}
                />
                <span className="register-stream-radio-text">UG</span>
              </div>

              <div className="register-ug-btn">
                <input
                  type="radio"
                  value="8423d9c7-23f0-4880-974e-4164b9b9e853"
                  checked={
                    formData.selectedStream ===
                    "8423d9c7-23f0-4880-974e-4164b9b9e853"
                  }
                  onChange={handleStreamChange}
                />
                <span className="register-stream-radio-text">PG</span>
              </div>
            </div>

            <div className="register_btn-container">
              <button className="register_btn_open" type="submit">
                Submit
              </button>
              <div className='register_btn_validation_container'>
               {registerleaderror && <p className='register_validation_fnt'> <IoWarningOutline color="red"/>{" "}{registerleaderror}</p>}
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default RegisterLead;
