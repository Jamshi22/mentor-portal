// import React from "react";
// import { useState, useEffect } from "react";
// import { useGetStatesDegreeTyperecordedQuery } from "../../../../../../lib/services/webinarRecorded";
// import { useUpdateRecordMutation } from "../../../../../../lib/services/webinarRecorded";
// import styles from "./updatewebinar.module.css";
// import SingleSelectDropdown from "../../../../../../components/SingleSelectDropdown";
// import { Modal, Button, Form } from "react-bootstrap";
// import { FaPen } from "react-icons/fa";
// import {toast} from 'react-toastify'

// const UpdateRecordedWebinar = ({ isOpen, onClose, webinarData, refetch }) => {
//   const [updateRecord, { isLoading: loadingUpdate }] =
//     useUpdateRecordMutation();
//   const [stateOptions, setStateOptions] = useState([]);
//   const [degreeTypeOptions, setDegreeTypeOptions] = useState([]);
//   const [states, setState] = useState("");
//   const [degreeType, setDegreeType] = useState("");
//   const {
//     data: statedegreedata,
//     error,
//     isLoading,
//   } = useGetStatesDegreeTyperecordedQuery();

//   useEffect(() => {
//     if (statedegreedata) {
//       setStateOptions(statedegreedata?.data?.states);
//       setDegreeTypeOptions(statedegreedata?.data?.degreeTypes);
//     }

//     if (webinarData) {
//       // console.log(webinarData.StateId, "data");
//       // console.log(webinarData.DegreeTypeId, "data");
//       if (webinarData.StateId) {
//         setState(webinarData.StateId);
//       }
//       if (webinarData.DegreeTypeId) {
//         setDegreeType(webinarData.DegreeTypeId);
//       }

//       setWebinar({
//         title: webinarData.title,
//         webinar_link: webinarData.webinar_link,
//         agenda: webinarData.agenda,
//         state_id: webinarData.StateId, // Ensure StateId is valid
//         degree_type_id: webinarData.DegreeTypeId, // Ensure DegreeTypeId is valid
//         imageFile: null,
//         duration: webinarData.duration,
//         conducted_date: webinarData.conducted_date,
//         no_of_attendees: webinarData.no_of_attendees,
//         s3_image_url: webinarData.s3_image_url
//       });
//     }
//   }, [statedegreedata, webinarData]);

//   const [webinar, setWebinar] = useState({
//     title: "",
//     webinar_link: "",
//     agenda: "",
//     state_id: "",
//     degree_type_id: "",
//     imageFile: null,
//     duration: "",
//     conducted_date: "",
//     no_of_attendees: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setWebinar((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setWebinar((prevState) => ({
//           ...prevState,
//           imageFile: file,
//           thumbnail_image_name: file.name,
//           s3_image_url: reader.result, // Update to preview the selected file
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     if (!webinar.state_id || !webinar.degree_type_id) {
//       console.error("State ID and Degree Type ID are required");
//       return; // Prevent form submission if IDs are missing
//     }

//     const formData = new FormData();
//     formData.append("state_id", webinar.state_id);
//     formData.append("degree_type_id", webinar.degree_type_id);
//     formData.append("title", webinar.title);
//     formData.append("webinar_link", webinar.webinar_link);
//     formData.append("agenda", webinar.agenda);
//     formData.append("duration", webinar.duration);
//     formData.append("conducted_date", webinar.conducted_date);
//     formData.append("no_of_attendees", webinar.no_of_attendees);

//     if (webinar.imageFile) {
//       formData.append("image", webinar.imageFile);
//     }

//     // console.log(formData, "Edited FormData");

//     try {
//       await updateRecord({
//         id: webinarData?.id,
//         updateWebinardata: formData,
//       }).unwrap();
//       refetch();
//       toast.dismiss();
//       toast.success("Updated Recorded Webinar Successfully");
//       onClose();
//       setWebinar({
//         title: "",
//         webinar_link: "",
//         agenda: "",
//         state_id: "",
//         degree_type_id: "",
//         imageFile: null,
//         duration: "",
//         conducted_date: "",
//         no_of_attendees: "",
//       });
//     } catch (error) {
//       console.error("Failed to update webinar:", error);
//     }
//   };

//   return (
//     <>
//       <Modal show={isOpen} onHide={onClose} size="lg">
//         <Modal.Header
//           className={styles.modal_header__}
//           closeButton
//           style={{ textAlign: "center" }}
//         >
//           <Modal.Title className={styles.title}>
//             Edit Recorded Webinar
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
//                   selectedOption={degreeType} // Pass the selected degree type
//                   setSelectedOption={(value) => {
//                     setDegreeType(value); // Update degree type in state
//                     setWebinar((prevState) => ({
//                       ...prevState,
//                       degree_type_id: value, // Set degree_type_id in webinar state
//                     }));
//                   }}
//                 />
//               </div>
//               <div controlId="formState">
//                 <label className={styles.label_fnt_webinar}>State</label>
//                 <SingleSelectDropdown
//                   placeholder="State"
//                   className={styles.drop_down_container}
//                   options={stateOptions}
//                   webinarstyle={true}
//                   selectedOption={states} // Pass the selected state
//                   setSelectedOption={(value) => {
//                     setState(value); // Update state in state
//                     setWebinar((prevState) => ({
//                       ...prevState,
//                       state_id: value, // Set state_id in webinar state
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
//                 value={webinar.title}
//                 className={styles.form_input_title_input}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div controlId="formAgenda">
//               <label className={styles.label_fnt_webinar} htmlFor="Agenda">
//                 Agenda
//               </label>
//               <textarea
//                 id="Agenda"
//                 type="text"
//                 rows={4}
//                 placeholder="Enter agenda"
//                 name="agenda"
//                 value={webinar.agenda}
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
//                   type="url"
//                   placeholder="Enter webinar link"
//                   name="webinar_link"
//                   value={webinar.webinar_link}
//                   onChange={handleInputChange}
//                   className={styles.form_input_title_input_half}
//                   required
//                 />
//               </div>

//               <div controlId="formStartDate">
//                 <label
//                   className={styles.label_fnt_webinar}
//                   htmlFor="ConductedDate"
//                 >
//                   Conducted Date
//                 </label>
//                 <input
//                   id="ConductedDate"
//                   type="date"
//                   name="conducted_date"
//                   value={webinar.conducted_date}
//                   onChange={handleInputChange}
//                   className={styles.form_input_title_input_half}
//                   required
//                 />
//               </div>
//             </div>

//             <div className={styles.webinar_input_half}>
//               <div controlId="formTitle">
//                 <label className={styles.label_fnt_webinar} htmlFor="Duration">
//                   Duration
//                 </label>
//                 <input
//                   id="Duration"
//                   type="text"
//                   placeholder="Enter Duration"
//                   name="duration"
//                   value={webinar.duration}
//                   onChange={handleInputChange}
//                   className={styles.form_input_title_input_half}
//                   required
//                 />
//               </div>

//               <div controlId="formTitle">
//                 <label
//                   className={styles.label_fnt_webinar}
//                   htmlFor="NoOfAttendess"
//                 >
//                   No of attendees
//                 </label>
//                 <input
//                   id="NoOfAttendess"
//                   type="text"
//                   placeholder="No of attendees"
//                   name="no_of_attendees"
//                   value={webinar.no_of_attendees}
//                   onChange={handleInputChange}
//                   className={styles.form_input_title_input_half}
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
//                 {webinar.imageFile ? (
//                   <img
//                     src={URL.createObjectURL(webinar.imageFile)}
//                     alt="Selected Thumbnail"
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 ) : webinar.s3_image_url?
//                 (
//                   <img
//                     src={webinar.s3_image_url}
//                     alt="Selected Thumbnail"
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 )
                
//                 :(
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

//               {webinar.thumbnail_image_name && (
//                 <div>
//                   <small>Selected file: {webinar.thumbnail_image_name}</small>
//                 </div>
//               )}
//             </div>

//             <button type="submit">Add Webinar</button>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default UpdateRecordedWebinar;


import React, { useState, useEffect } from "react";
import {
  useGetStatesDegreeTyperecordedQuery,
  useUpdateRecordMutation,
} from "../../../../../../lib/services/webinarRecorded";
import styles from "./updatewebinar.module.css";
import SingleSelectDropdown from "../../../../../../components/SingleSelectDropdown";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const UpdateRecordedWebinar = ({ isOpen, onClose, webinarData, refetch }) => {
  const [updateRecord, { isLoading: loadingUpdate }] = useUpdateRecordMutation();
  const [stateOptions, setStateOptions] = useState([]);
  const [degreeTypeOptions, setDegreeTypeOptions] = useState([]);
  const [states, setState] = useState("");
  const [degreeType, setDegreeType] = useState("");

  const { data: statedegreedata, isLoading } =
    useGetStatesDegreeTyperecordedQuery();

  const [webinar, setWebinar] = useState({
    title: "",
    webinar_link: "",
    agenda: "",
    state_id: "",
    degree_type_id: "",
    imageFile: null,
    duration: "",
    conducted_date: "",
    no_of_attendees: "",
    s3_image_url: "",
    thumbnail_image_name: "",
  });

  // Populate dropdowns + preload data when editing
  useEffect(() => {
    if (statedegreedata) {
      setStateOptions(statedegreedata?.data?.states || []);
      setDegreeTypeOptions(statedegreedata?.data?.degreeTypes || []);
    }

    if (webinarData) {
      setState(webinarData.StateId || "");
      setDegreeType(webinarData.DegreeTypeId || "");
      setWebinar({
        title: webinarData.title || "",
        webinar_link: webinarData.webinar_link || "",
        agenda: webinarData.agenda || "",
        state_id: webinarData.StateId || "",
        degree_type_id: webinarData.DegreeTypeId || "",
        imageFile: null,
        duration: webinarData.duration || "",
        conducted_date: webinarData.conducted_date || "",
        no_of_attendees: webinarData.no_of_attendees || "",
        s3_image_url: webinarData.s3_image_url || "",
        thumbnail_image_name: "",
      });
    }
  }, [statedegreedata, webinarData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWebinar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWebinar((prev) => ({
          ...prev,
          imageFile: file,
          thumbnail_image_name: file.name,
          s3_image_url: reader.result, // Preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!webinar.state_id || !webinar.degree_type_id) {
      toast.error("State and Degree Type are required");
      return;
    }

    const formData = new FormData();
    formData.append("state_id", webinar.state_id);
    formData.append("degree_type_id", webinar.degree_type_id);
    formData.append("title", webinar.title);
    formData.append("webinar_link", webinar.webinar_link);
    formData.append("agenda", webinar.agenda);
    formData.append("duration", webinar.duration);
    formData.append("conducted_date", webinar.conducted_date);
    formData.append("no_of_attendees", webinar.no_of_attendees);

    if (webinar.imageFile) {
      formData.append("image", webinar.imageFile);
    }

    try {
      await updateRecord({
        id: webinarData?.id,
        updateWebinardata: formData,
      }).unwrap();

      toast.success("Updated Recorded Webinar Successfully");
      refetch();
      onClose();

      // reset form
      setWebinar({
        title: "",
        webinar_link: "",
        agenda: "",
        state_id: "",
        degree_type_id: "",
        imageFile: null,
        duration: "",
        conducted_date: "",
        no_of_attendees: "",
        s3_image_url: "",
        thumbnail_image_name: "",
      });
      setState("");
      setDegreeType("");
    } catch (err) {
      toast.error("Failed to update webinar");
      console.error("Update error:", err);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="lg">
      <Modal.Header
        className={styles.modal_header__}
        closeButton
        style={{ textAlign: "center" }}
      >
        <Modal.Title className={styles.title}>Edit Recorded Webinar</Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.recorded_webinar_body}>
        <form onSubmit={handleFormSubmit} className={styles.upcoming_form}>
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
                  setWebinar((prev) => ({ ...prev, degree_type_id: value }));
                }}
              />
            </div>
            <div>
              <label className={styles.label_fnt_webinar}>State</label>
              <SingleSelectDropdown
                placeholder="State"
                webinarstyle={true}
                options={stateOptions}
                selectedOption={states}
                setSelectedOption={(value) => {
                  setState(value);
                  setWebinar((prev) => ({ ...prev, state_id: value }));
                }}
              />
            </div>
          </div>

          <div>
            <label className={styles.label_fnt_webinar} htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              name="title"
              value={webinar.title}
              className={styles.form_input_title_input}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className={styles.label_fnt_webinar} htmlFor="Agenda">
              Agenda
            </label>
            <textarea
              id="Agenda"
              rows={4}
              placeholder="Enter agenda"
              name="agenda"
              value={webinar.agenda}
              onChange={handleInputChange}
              className={styles.recorded_webinar_input_text_area}
              required
            />
          </div>

          <div className={styles.webinar_input_half}>
            <div>
              <label className={styles.label_fnt_webinar} htmlFor="webinarLink">
                Vimeo Link Id
              </label>
              <input
                id="webinarLink"
                type="text"
                placeholder="Enter webinar link"
                name="webinar_link"
                value={webinar.webinar_link}
                onChange={handleInputChange}
                className={styles.form_input_title_input_half}
                required
              />
            </div>

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
                value={webinar.conducted_date}
                onChange={handleInputChange}
                className={styles.form_input_title_input_half}
                required
              />
            </div>
          </div>

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
                value={webinar.duration}
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
                type="number"
                placeholder="No of attendees"
                name="no_of_attendees"
                value={webinar.no_of_attendees}
                onChange={handleInputChange}
                className={styles.form_input_title_input_half}
                required
              />
            </div>
          </div>

          <div>
            <label className={styles.label_fnt_webinar} htmlFor="Thumbnail">
              Thumbnail Image
            </label>
            <div
              onClick={() => document.getElementById("fileInput").click()}
              className={styles.thumbnail__}
            >
              {webinar.imageFile ? (
                <img
                  src={URL.createObjectURL(webinar.imageFile)}
                  alt="Thumbnail"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : webinar.s3_image_url ? (
                <img
                  src={webinar.s3_image_url}
                  alt="Thumbnail"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span className={styles.thumbnail_text__}>100 × 100</span>
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

            {webinar.thumbnail_image_name && (
              <div>
                <small>Selected file: {webinar.thumbnail_image_name}</small>
              </div>
            )}
          </div>

          <button type="submit" disabled={loadingUpdate}>
            {loadingUpdate ? "Updating..." : "Update Webinar"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateRecordedWebinar;
