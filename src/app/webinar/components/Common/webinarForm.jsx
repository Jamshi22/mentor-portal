// import React from "react";
// import { useEffect, useState } from "react";
// import { Modal } from "react-bootstrap";
// import { useAddRecordedWebinarMutation } from "../../../../lib/services/webinarRecorded";
// import { useGetStatesDegreeTyperecordedQuery } from "../../../../lib/services/webinarRecorded";
// import SingleSelectDropdown from "../../../../components/SingleSelectDropdown";
// import styles from "./page.module.css";
// //for webinar
// import { useAddWebinarMutation } from "../../../../lib/services/webinar";
// // Update Webinar
// import { useUpdateRecordMutation } from "../../../../lib/services/webinarRecorded";



// const WebinarFormAdd = ({
//   isOpen,
//   onClose,
//   refetch,
//   webinarDetails,
//   update,
//   webinarData,
//   webinarType
// }) => {
//   const [createrecordedwebinar] = useAddRecordedWebinarMutation();
//   // For Webinar
//   // Update Recorded Webinar
//   const [updateRecord, { isLoading: loadingUpdate }] =
//     useUpdateRecordMutation();
//   const [createWebinar] = useAddWebinarMutation();
//   const [stateOptions, setStateOptions] = useState();
//   const [degreeTypeOptions, setDegreeTypeOptions] = useState();
//   // const [isOpenForRegistrationOptions, setIsOpenForRegistrationOptions] = useState([true,false]);

//   const [isOpenForRegistration, setIsOpenForRegistration] = useState(true);

//   const [states, setState] = useState("");
//   const [degreeType, setDegreeType] = useState("");
//   const {
//     data: statedegreedata,
//     error,
//     isLoading,
//   } = useGetStatesDegreeTyperecordedQuery();

//   const isOpenForRegistrationOptions = [{
//     id: 1,
//     name: "true"
//   },
//   {
//     id: 2,
//     name: "false"
//   }]


//   useEffect(() => {
//     if (statedegreedata) {
//       setStateOptions(statedegreedata?.data?.states);
//       setDegreeTypeOptions(statedegreedata?.data?.degreeTypes);

//       if (webinarData) {
//         setRecordedWebinar({
//           title: webinarData.title,
//           webinar_link: webinarData.webinar_link,
//           agenda: webinarData.agenda,
//           state_id: webinarData.StateId, // Ensure StateId is valid
//           degree_type_id: webinarData.DegreeTypeId, // Ensure DegreeTypeId is valid
//           imageFile: null,
//           duration: webinarData.duration,
//           conducted_date: webinarData.conducted_date,
//           no_of_attendees: webinarData.no_of_attendees,
//         });
//       }
//     }
//   }, [statedegreedata, webinarData]);

//   // Recorded Webinar Field
//   const [recordedWebinar, setRecordedWebinar] = useState({
//     title: "",
//     webinar_link: "",
//     agenda: "",
//     state_id: "",
//     degree_type_id: "",
//     imageFile: null,
//     duration: "",
//     conducted_date: "",
//     no_of_attendees: "",
//     // this state from upcoming webinar
//     webinar_start_date: "",
//     webinar_start_time: "",
//     webinar_end_date: "",
//     webinar_end_time: "",
//     webinarNumber: "",
//   });


//   // webinar sendind the data

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     // console.log(name, value, "sending the value and name");

//     // Handle invalid webinarNumber: skip setting state
//     if (name === "webinarNumber" && !/^\d+$/.test(value)) {
//       return null;
//     }

//     const updatedValue =
//       name === "webinar_start_time" || name === "webinar_end_time"
//         ? convertTo24HourFormat(value)
//         : value;

//     setRecordedWebinar((prevState) => ({
//       ...prevState,
//       [name]: updatedValue,
//     }));
//   };

//   const convertTo24HourFormat = (time12hr) => {
//     const [time, modifier] = time12hr.split(" ");
//     let [hours, minutes] = time.split(":");
//     let seconds = "00";

//     if (modifier) {
//       if (modifier === "PM" && hours !== "12") {
//         hours = (parseInt(hours) + 12).toString();
//       }
//       if (modifier === "AM" && hours === "12") {
//         hours = "00";
//       }
//     }

//     return `${hours}:${minutes}:${seconds}`;
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setRecordedWebinar((prevState) => ({
//         ...prevState,
//         imageFile: file,
//         thumbnail_image_name: file.name,
//       }));
//     }
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     console.log("webinar type ", webinarType)
//     const formData = new FormData();

//     formData.append("state_id", recordedWebinar?.state_id);
//     formData.append("degree_type_id", recordedWebinar?.degree_type_id);
//     formData.append("title", recordedWebinar?.title);
//     formData.append("agenda", recordedWebinar?.agenda);
//     formData.append("webinar_link", recordedWebinar?.webinar_link);


//     formData.append("duration", recordedWebinar?.duration);
//     formData.append("conducted_date", recordedWebinar?.conducted_date);
//     formData.append("no_of_attendees", recordedWebinar?.no_of_attendees);
//     // upcoming webinar

//     if (webinarType === "upcoming") {
//       formData.append("StateId", recordedWebinar?.state_id);
//       formData.append("DegreeTypeId", recordedWebinar?.degree_type_id);
//       formData.append("webinarLink", recordedWebinar?.webinar_link);
//       formData.append("description", recordedWebinar?.agenda);
//       // Combine date and time, then convert to ISO string
//       const webinarStartISO = new Date(`${recordedWebinar?.webinar_start_date}T${recordedWebinar?.webinar_start_time}`).toISOString();
//       const webinarEndISO = new Date(`${recordedWebinar?.webinar_end_date}T${recordedWebinar?.webinar_end_time}`).toISOString();

//       formData.append("startDate", webinarStartISO);
//       formData.append("endDate", webinarEndISO);
//     }

//     formData.append("isOpenForRegistration", isOpenForRegistration);
//     formData.append("webinarNumber", recordedWebinar?.webinarNumber);

//     if (recordedWebinar?.imageFile) {
//       formData.append("image", recordedWebinar?.imageFile);
//     }

//     // const WebinarResponse = null // webinarDetails ? createrecordedwebinar(formData) : createWebinar(formData);
//     const WebinarResponse = webinarDetails ? createrecordedwebinar(formData) : createWebinar(formData);
//     // console.log("form data => ", formData)
//     try {
//       const successData = await WebinarResponse;
//       // console.log("==========================>", successData)

//       if (successData.error) {
//         toast.error(
//           `Webinar Failed to Create ${JSON.stringify(successData.error.data.errors)}`
//         );
//       } else {
//         toast.success(
//           webinarDetails
//             ? "Recorded Webinar Added Successfully"
//             : "Webinar Added Successfully"
//         );
//       }
//       refetch();
//       toast.dismiss();

//       onClose();
//       setState("");
//       setDegreeType("");
//       setRecordedWebinar({
//         title: "",
//         webinar_link: "",
//         agenda: "",
//         state_id: "",
//         degree_type_id: "",
//         imageFile: null,
//         duration: "",
//         conducted_date: "",
//         no_of_attendees: "",
//         webinar_start_date: "",
//         webinar_start_time: "",
//         webinar_end_date: "",
//         webinar_end_time: "",
//       });
//     } catch (error) {
//       console.log(error, "error");
//       console.error(
//         webinarDetails
//           ? `Recorded Webinar Failed to Create ${error}`
//           : `Webinar Added Successfully ${error}`
//       );
//       toast.error(
//         webinarDetails
//           ? `Recorded Webinar Failed to Create ${error}`
//           : `Webinar Added Successfully ${error}`
//       );
//     }
//   };

//   const handleClick = () => {
//     onClose()
//   }

//   return (
//     <>
//       <Modal
//         show={isOpen}
//         onHide={handleClick}
//         size="lg"
//         centered
//         aria-labelledby="contained-modal-title-vcenter"
//       >
//         <Modal.Header
//           className={styles.modal_header__}
//           onClick={handleClick}
//           closeButton
//           style={{ textAlign: "center", borderBottom: "none" }}
//         >
//           <Modal.Title className={styles.title}>
//             {webinarDetails ? "Add Recorded Webinar" : "Add Webinar"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className={styles.recorded_webinar_body}>
//           <form onSubmit={handleFormSubmit} className={styles.upcoming_form}>
//             <div className={styles.upcoming_form_webinar_row}>
//               <div controlId="formDegreeType">
//                 <label className={styles.label_fnt_webinar}>Degree Type</label>
//                 <SingleSelectDropdown
//                   placeholder="Degree Type"
//                   webinarstyle={true}
//                   options={degreeTypeOptions}
//                   selectedOption={degreeType}
//                   setSelectedOption={(value) => {
//                     setDegreeType(value);
//                     setRecordedWebinar((prevState) => ({
//                       ...prevState,
//                       degree_type_id: value,
//                     }));
//                   }}
//                 />
//               </div>
//               <div controlId="formState">
//                 <label className={styles.label_fnt_webinar}>State</label>
//                 <SingleSelectDropdown
//                   className={styles.drop_down_container}
//                   placeholder="State"
//                   options={stateOptions}
//                   webinarstyle={true}
//                   selectedOption={states}
//                   setSelectedOption={(value) => {
//                     setState(value);
//                     setRecordedWebinar((prevState) => ({
//                       ...prevState,
//                       state_id: value,
//                     }));
//                   }}
//                 />
//               </div>
//             </div>

//             <div controlId="formTitle">
//               <label className={styles.label_fnt_webinar} htmlFor="title">
//                 Title
//               </label>
//               <input
//                 id="title"
//                 type="text"
//                 placeholder="Enter title"
//                 name="title"
//                 value={recordedWebinar.title}
//                 onChange={handleInputChange}
//                 className={styles.form_input_title_input}
//                 required
//               />
//             </div>

//             <div controlId="formAgenda">
//               <label className={styles.label_fnt_webinar} htmlFor="Agenda">
//                 Description
//               </label>
//               <textarea
//                 id="Agenda"
//                 type="text"
//                 rows={4}
//                 placeholder="Enter agenda"
//                 name="agenda"
//                 value={recordedWebinar?.agenda}
//                 onChange={handleInputChange}
//                 className={styles.recorded_webinar_input_text_area}
//                 required
//               ></textarea>
//             </div>

//             <div className={styles.webinar_input_half}>
//               <div controlId="formWebinarLink">
//                 <label
//                   className={styles.label_fnt_webinar}
//                   htmlFor="webinarLink"
//                 >
//                   Webinar Link
//                 </label>
//                 <input
//                   id="webinarLink"
//                   type={"url"}
//                   placeholder="Enter webinar link"
//                   name="webinar_link"
//                   value={recordedWebinar?.webinar_link}
//                   onChange={handleInputChange}
//                   className={styles.form_input_title_input_half}
//                 />
//               </div>
//               {webinarDetails ? (
//                 <div controlId="formStartDate">
//                   <label
//                     className={styles.label_fnt_webinar}
//                     htmlFor="ConductedDate"
//                   >
//                     Conducted Date
//                   </label>
//                   <input
//                     id="ConductedDate"
//                     type="date"
//                     name="conducted_date"
//                     value={recordedWebinar?.conducted_date}
//                     onChange={handleInputChange}
//                     className={styles.form_input_title_input_half}
//                     required
//                   />
//                 </div>
//               ) : (
//                 <div controlId="formStartDate">
//                   <label
//                     className={styles.label_fnt_webinar}
//                     htmlFor="StartDate"
//                   >
//                     Start Date
//                   </label>
//                   <input
//                     id="StartDate"
//                     type="date"
//                     name="webinar_start_date"
//                     value={recordedWebinar?.webinar_start_date}
//                     onChange={handleInputChange}
//                     className={styles.form_input_title_input_half}
//                     required
//                   />
//                 </div>
//               )}
//             </div>
//             {webinarDetails ? (
//               <div className={styles.webinar_input_half}>
//                 <div controlId="formTitle">
//                   <label
//                     className={styles.label_fnt_webinar}
//                     htmlFor="Duration"
//                   >
//                     Duration
//                   </label>
//                   <input
//                     id="Duration"
//                     type="text"
//                     placeholder="Enter Duration"
//                     name="duration"
//                     value={recordedWebinar?.duration}
//                     onChange={handleInputChange}
//                     className={styles.form_input_title_input_half}
//                     required
//                   />
//                 </div>

//                 <div controlId="formTitle">
//                   <label
//                     className={styles.label_fnt_webinar}
//                     htmlFor="NoOfAttendess"
//                   >
//                     No of attendees
//                   </label>
//                   <input
//                     id="NoOfAttendess"
//                     type="text"
//                     placeholder="No of attendees"
//                     name="no_of_attendees"
//                     value={recordedWebinar?.no_of_attendees}
//                     onChange={handleInputChange}
//                     className={styles.form_input_title_input_half}
//                     required
//                   />
//                 </div>
//               </div>
//             ) : (
//               <div className={styles.webinar_input_three_section}>
//                 <div controlId="formStartTime">
//                   <label
//                     className={styles.label_fnt_webinar}
//                     htmlFor="StartTime"
//                   >
//                     Start Time
//                   </label>
//                   <input
//                     type="time"
//                     id="StartTime"
//                     name="webinar_start_time"
//                     value={recordedWebinar?.webinar_start_time}
//                     onChange={handleInputChange}
//                     className={styles.form_input_title_input_half_time}
//                     required
//                   />
//                 </div>

//                 <div controlId="formEndDate">
//                   <label className={styles.label_fnt_webinar} htmlFor="EndDate">
//                     End Date
//                   </label>
//                   <input
//                     type="date"
//                     id="EndDate"
//                     name="webinar_end_date"
//                     value={recordedWebinar?.webinar_end_date}
//                     onChange={handleInputChange}
//                     className={styles.form_input_title_input_half_time}
//                     required
//                   />
//                 </div>

//                 <div controlId="formEndTime">
//                   <label className={styles.label_fnt_webinar} htmlFor="EndTime">
//                     End Time
//                   </label>
//                   <input
//                     type="time"
//                     id="EndTime"
//                     name="webinar_end_time"
//                     value={recordedWebinar?.webinar_end_time}
//                     onChange={handleInputChange}
//                     className={styles.form_input_title_input_half_time}
//                     required
//                   />
//                 </div>
//               </div>
//             )}




//             <div className={styles.upcoming_form_webinar_row} controlId="formDegreeType">
//               <div>
//                 <label className={styles.label_fnt_webinar}>Is Open For Registration</label>
//                 <SingleSelectDropdown
//                   placeholder="false"
//                   webinarstyle={true}
//                   options={isOpenForRegistrationOptions}
//                   selectedOption={isOpenForRegistration}
//                   setSelectedOption={(value) => {
//                     setIsOpenForRegistration(value)
//                   }}
//                 />

//               </div>

//               <div controlId="formTitle">
//                 <label className={styles.label_fnt_webinar} htmlFor="title">
//                   Webinar Number
//                 </label>
//                 <input
//                   id="title"
//                   type="text"
//                   placeholder="Enter title"
//                   name="webinarNumber"
//                   value={recordedWebinar?.webinarNumber}
//                   onChange={handleInputChange}
//                   className={styles.form_input_title_input}
//                   required
//                 />
//               </div>
//             </div>









//             <div controlId="formThumbnail">
//               <label className={styles.label_fnt_webinar} htmlFor="Thumbnail">
//                 Thumbnail Image
//               </label>
//               <div
//                 onClick={() => document.getElementById("fileInput").click()}
//                 className={styles.thumbnail__}
//               >
//                 {recordedWebinar?.imageFile ? (
//                   <img
//                     src={URL.createObjectURL(recordedWebinar?.imageFile)}
//                     alt="Selected Thumbnail"
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 ) : (
//                   <span className={styles.thumbnail_text__}>100 * 100</span>
//                 )}
//               </div>

//               <input
//                 type="file"
//                 id="fileInput"
//                 name="image"
//                 onChange={handleFileChange}
//                 accept="image/*"
//                 style={{ display: "none" }}
//               />

//               {recordedWebinar?.thumbnail_image_name && (
//                 <div>
//                   <small>
//                     Selected file: {recordedWebinar?.thumbnail_image_name}
//                   </small>
//                 </div>
//               )}
//             </div>

//             <button type="submit">
//               {webinarDetails ? "Add Recorded Webinar" : "Add Webinar"}
//             </button>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default WebinarFormAdd;



import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useAddRecordedWebinarMutation, useGetStatesDegreeTyperecordedQuery, useUpdateRecordMutation } from "../../../../lib/services/webinarRecorded";
import { useAddWebinarMutation } from "../../../../lib/services/webinar";
import SingleSelectDropdown from "../../../../components/SingleSelectDropdown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";

const WebinarFormAdd = ({
  isOpen,
  onClose,
  refetch,
  // webinarDetails,
  update,
  webinarData,
  webinarType,
}) => {
  const [createrecordedwebinar] = useAddRecordedWebinarMutation();
  const [createWebinar] = useAddWebinarMutation();
  const [updateRecord] = useUpdateRecordMutation();

  const [stateOptions, setStateOptions] = useState([]);
  const [degreeTypeOptions, setDegreeTypeOptions] = useState([]);

  const [isOpenForRegistration, setIsOpenForRegistration] = useState(null);
  const [states, setState] = useState("");
  const [degreeType, setDegreeType] = useState("");

  const { data: statedegreedata } = useGetStatesDegreeTyperecordedQuery();

  const isOpenForRegistrationOptions = [
    { id: 1, name: "true" },
    { id: 2, name: "false" },
  ];

  const [recordedWebinar, setRecordedWebinar] = useState({
    title: "",
    webinar_link: "",
    agenda: "",
    state_id: "",
    degree_type_id: "",
    imageFile: null,
    duration: "",
    conducted_date: "",
    no_of_attendees: "",
    webinar_start_date: "",
    webinar_start_time: "",
    webinar_end_date: "",
    webinar_end_time: "",
    webinarNumber: "",
  });

  useEffect(() => {
    if (statedegreedata) {
      setStateOptions(statedegreedata?.data?.states);
      setDegreeTypeOptions(statedegreedata?.data?.degreeTypes);

      if (webinarData) {
        setRecordedWebinar({
          title: webinarData.title || "",
          webinar_link: webinarData.webinar_link || "",
          agenda: webinarData.agenda || "",
          state_id: webinarData.StateId || "",
          degree_type_id: webinarData.DegreeTypeId || "",
          imageFile: null,
          duration: webinarData.duration || "",
          conducted_date: webinarData.conducted_date || "",
          no_of_attendees: webinarData.no_of_attendees || "",
          webinar_start_date: "",
          webinar_start_time: "",
          webinar_end_date: "",
          webinar_end_time: "",
          webinarNumber: webinarData.webinarNumber || "",
        });
      }
    }
  }, [statedegreedata, webinarData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "webinarNumber" && !/^\d*$/.test(value)) {
      return;
    }

    const updatedValue =
      name === "webinar_start_time" || name === "webinar_end_time"
        ? convertTo24HourFormat(value)
        : value;

    setRecordedWebinar((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const convertTo24HourFormat = (time12hr) => {
    if (!time12hr) return "";
    const [time, modifier] = time12hr.split(" ");
    let [hours, minutes] = time.split(":");
    let seconds = "00";

    if (modifier) {
      if (modifier === "PM" && hours !== "12") {
        hours = (parseInt(hours) + 12).toString();
      }
      if (modifier === "AM" && hours === "12") {
        hours = "00";
      }
    }

    return `${hours}:${minutes}:${seconds}`;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setRecordedWebinar((prev) => ({
        ...prev,
        imageFile: file,
        thumbnail_image_name: file.name,
      }));
    }
  };

  const resetForm = () => {
    setState("");
    setDegreeType("");
    setIsOpenForRegistration(null);
    setRecordedWebinar({
      title: "",
      webinar_link: "",
      agenda: "",
      state_id: "",
      degree_type_id: "",
      imageFile: null,
      duration: "",
      conducted_date: "",
      no_of_attendees: "",
      webinar_start_date: "",
      webinar_start_time: "",
      webinar_end_date: "",
      webinar_end_time: "",
      webinarNumber: "",
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("state_id", recordedWebinar?.state_id);
    formData.append("degree_type_id", recordedWebinar?.degree_type_id);
    formData.append("title", recordedWebinar?.title);
    formData.append("agenda", recordedWebinar?.agenda);
    formData.append("webinar_link", recordedWebinar?.webinar_link);
    formData.append("duration", recordedWebinar?.duration);
    formData.append("conducted_date", recordedWebinar?.conducted_date);
    formData.append("no_of_attendees", recordedWebinar?.no_of_attendees);
    formData.append("webinarNumber", recordedWebinar?.webinarNumber);

    if (webinarType === "upcoming") {
      formData.append("StateId", recordedWebinar?.state_id);
      formData.append("DegreeTypeId", recordedWebinar?.degree_type_id);
      formData.append("webinarLink", recordedWebinar?.webinar_link);
      formData.append("description", recordedWebinar?.agenda);

      const webinarStartISO = new Date(
        `${recordedWebinar?.webinar_start_date}T${recordedWebinar?.webinar_start_time}`
      ).toISOString();
      const webinarEndISO = new Date(
        `${recordedWebinar?.webinar_end_date}T${recordedWebinar?.webinar_end_time}`
      ).toISOString();

      formData.append("startDate", webinarStartISO);
      formData.append("endDate", webinarEndISO);
    }

    formData.append(
      "isOpenForRegistration",
      isOpenForRegistration?.name === "true"
    );

    if (recordedWebinar?.imageFile) {
      formData.append("image", recordedWebinar?.imageFile);
    }

    console.log("formdata => ", formData)

    try {
      let successData;

      if (update) {
        successData = await updateRecord({
          id: webinarData?.id,
          body: formData,
        });
      } else if (webinarType === "recorded") {
        successData = await createrecordedwebinar(formData);
      } else {
        successData = await createWebinar(formData);
      }

      if (successData.error) {
        toast.error(
          `Webinar Failed: ${JSON.stringify(successData.error.data.errors)}`
        );
      } else {
        toast.success(
          update ? "Webinar Updated Successfully" : "Webinar Added Successfully"
        );
      }

      refetch();
      onClose();
      resetForm();
    } catch (err) {
      toast.error("Something went wrong: " + err);
    }
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      size="lg"
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header
        className={styles.modal_header__}
        closeButton
        style={{ textAlign: "center", borderBottom: "none" }}
      >
        <Modal.Title className={styles.title}>
          {update
            ? "Update Webinar"
            : webinarType === "recorded"
              ? "Add Recorded Webinar"
              : "Add Webinar"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.recorded_webinar_body}>
        <form onSubmit={handleFormSubmit} className={styles.upcoming_form}>
          {/* Degree + State */}
          <div className={styles.upcoming_form_webinar_row}>
            <div>
              <label className={styles.label_fnt_webinar}>Degree Type</label>
              <SingleSelectDropdown
                placeholder="Degree Type"
                webinarstyle={true}
                options={degreeTypeOptions}
                selectedOption={degreeType}
                setSelectedOption={(value) => {
                  setDegreeType(value);
                  setRecordedWebinar((prev) => ({
                    ...prev,
                    degree_type_id: value,
                  }));
                }}
              />
            </div>
            <div>
              <label className={styles.label_fnt_webinar}>State</label>
              <SingleSelectDropdown
                className={styles.drop_down_container}
                placeholder="State"
                options={stateOptions}
                webinarstyle={true}
                selectedOption={states}
                setSelectedOption={(value) => {
                  setState(value);
                  setRecordedWebinar((prev) => ({
                    ...prev,
                    state_id: value,
                  }));
                }}
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className={styles.label_fnt_webinar} htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              name="title"
              value={recordedWebinar.title}
              onChange={handleInputChange}
              className={styles.form_input_title_input}
              required
            />
          </div>

          {/* Agenda */}
          <div>
            <label className={styles.label_fnt_webinar} htmlFor="Agenda">
              Description
            </label>
            <textarea
              id="Agenda"
              rows={4}
              placeholder="Enter agenda"
              name="agenda"
              value={recordedWebinar?.agenda}
              onChange={handleInputChange}
              className={styles.recorded_webinar_input_text_area}
              required
            ></textarea>
          </div>

          {/* Webinar Link + Dates */}
          <div className={styles.webinar_input_half}>
            <div>
              <label className={styles.label_fnt_webinar} htmlFor="webinarLink">

                {
                  webinarType === "recorded" ?
                    "Vimeo Link Id" :
                    "Webinar Link"
                }
              </label>
              <input
                id="webinarLink"
                type={webinarType === "recorded"? "text":"url"}
                placeholder="Enter webinar link"
                name="webinar_link"
                value={recordedWebinar?.webinar_link}
                onChange={handleInputChange}
                className={styles.form_input_title_input_half}
              />
            </div>

            {webinarType === "recorded" ? (
              <div>
                <label
                  className={styles.label_fnt_webinar}
                  htmlFor="ConductedDate"
                >
                  Conducted Date
                </label>
                <input
                  id="ConductedDate"
                  type="date"
                  name="conducted_date"
                  value={recordedWebinar?.conducted_date}
                  onChange={handleInputChange}
                  className={styles.form_input_title_input_half}
                  required
                />
              </div>
            ) : (
              <div>
                <label className={styles.label_fnt_webinar} htmlFor="StartDate">
                  Start Date
                </label>
                <input
                  id="StartDate"
                  type="date"
                  name="webinar_start_date"
                  value={recordedWebinar?.webinar_start_date}
                  onChange={handleInputChange}
                  className={styles.form_input_title_input_half}
                  required
                />
              </div>
            )}
          </div>

          {/* Recorded vs Upcoming extra fields */}
          {webinarType === "recorded" ? (
            <div className={styles.webinar_input_half}>
              <div>
                <label className={styles.label_fnt_webinar} htmlFor="Duration">
                  Duration
                </label>
                <input
                  id="Duration"
                  type="text"
                  placeholder="Enter Duration"
                  name="duration"
                  value={recordedWebinar?.duration}
                  onChange={handleInputChange}
                  className={styles.form_input_title_input_half}
                  required
                />
              </div>
              <div>
                <label
                  className={styles.label_fnt_webinar}
                  htmlFor="NoOfAttendess"
                >
                  No of attendees
                </label>
                <input
                  id="NoOfAttendess"
                  type="text"
                  placeholder="No of attendees"
                  name="no_of_attendees"
                  value={recordedWebinar?.no_of_attendees}
                  onChange={handleInputChange}
                  className={styles.form_input_title_input_half}
                  required
                />
              </div>
            </div>
          ) : (
            <div className={styles.webinar_input_three_section}>
              <div>
                <label className={styles.label_fnt_webinar} htmlFor="StartTime">
                  Start Time
                </label>
                <input
                  type="time"
                  id="StartTime"
                  name="webinar_start_time"
                  value={recordedWebinar?.webinar_start_time}
                  onChange={handleInputChange}
                  className={styles.form_input_title_input_half_time}
                  required
                />
              </div>
              <div>
                <label className={styles.label_fnt_webinar} htmlFor="EndDate">
                  End Date
                </label>
                <input
                  type="date"
                  id="EndDate"
                  name="webinar_end_date"
                  value={recordedWebinar?.webinar_end_date}
                  onChange={handleInputChange}
                  className={styles.form_input_title_input_half_time}
                  required
                />
              </div>
              <div>
                <label className={styles.label_fnt_webinar} htmlFor="EndTime">
                  End Time
                </label>
                <input
                  type="time"
                  id="EndTime"
                  name="webinar_end_time"
                  value={recordedWebinar?.webinar_end_time}
                  onChange={handleInputChange}
                  className={styles.form_input_title_input_half_time}
                  required
                />
              </div>
            </div>
          )}

          {/* Registration + Number */}
          <div className={styles.upcoming_form_webinar_row}>
            <div>
              <label className={styles.label_fnt_webinar}>
                Is Open For Registration
              </label>
              <SingleSelectDropdown
                placeholder="Select"
                webinarstyle={true}
                options={isOpenForRegistrationOptions}
                selectedOption={isOpenForRegistration}
                setSelectedOption={(value) => setIsOpenForRegistration(value)}
              />
            </div>

            <div>
              <label className={styles.label_fnt_webinar} htmlFor="webinarNum">
                Webinar Number
              </label>
              <input
                id="webinarNum"
                type="text"
                placeholder="Enter Webinar Number"
                name="webinarNumber"
                value={recordedWebinar?.webinarNumber}
                onChange={handleInputChange}
                className={styles.form_input_title_input}
                required
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className={styles.label_fnt_webinar} htmlFor="Thumbnail">
              Thumbnail Image
            </label>
            <div
              onClick={() => document.getElementById("fileInput").click()}
              className={styles.thumbnail__}
            >
              {recordedWebinar?.imageFile ? (
                <img
                  src={URL.createObjectURL(recordedWebinar?.imageFile)}
                  alt="Selected Thumbnail"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span className={styles.thumbnail_text__}>100 * 100</span>
              )}
            </div>

            <input
              type="file"
              id="fileInput"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />

            {recordedWebinar?.thumbnail_image_name && (
              <div>
                <small>
                  Selected file: {recordedWebinar?.thumbnail_image_name}
                </small>
              </div>
            )}
          </div>

          <button type="submit">
            {update
              ? "Update Webinar"
              : webinarType === "recorded"
                ? "Add Recorded Webinar"
                : "Add Webinar"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default WebinarFormAdd;
