// import React, { useEffect, useState } from "react";
// import { Modal } from "react-bootstrap";
// import { useUpdateWebinarMutation } from "../../../../lib/services/webinar";
// import { useGetStatesDegreeTypeQuery } from "../../../../lib/services/webinar";
// import styles from "./updateWebinar.module.css";
// import SingleSelectDropdown from "../../../../components/SingleSelectDropdown";
// import { toast } from 'react-toastify'

// const UpdateWebinarModal = ({ isOpen, onClose, webinarData, refetch, webinarType }) => {
//   const [updateWebinar, { isLoading: loadingUpdate }] = useUpdateWebinarMutation();
//   const [stateOptions, setStateOptions] = useState([]);
//   const [degreeTypeOptions, setDegreeTypeOptions] = useState([]);
//   const [states, setState] = useState("");
//   const [degreeType, setDegreeType] = useState("");
//   const { data: statedegreedata, error, isLoading } = useGetStatesDegreeTypeQuery();

//   useEffect(() => {
//     if (statedegreedata) {
//       setStateOptions(statedegreedata?.data?.states);
//       setDegreeTypeOptions(statedegreedata?.data?.degreeTypes);
//     }

//     if (webinarData) {
//       setState(webinarData.StateId);
//       setDegreeType(webinarData.DegreeTypeId);
//       setWebinar({
//         title: webinarData?.title,
//         webinar_link: webinarData?.webinar_link || webinarData?.webinarLink,
//         agenda: webinarData?.agenda || webinarData?.description,
//         webinar_start_date: webinarData.webinar_start_date?.split("T")[0] || formatDateForInput(webinarData?.startDate),
//         webinar_start_time: webinarData.webinar_start_time?.slice(0, -3) || formatTimeForInput(webinarData?.startDate),
//         webinar_end_date: webinarData.webinar_end_date?.split("T")[0] || formatDateForInput(webinarData?.endDate),
//         webinar_end_time: webinarData.webinar_end_time?.slice(0, -3) || formatTimeForInput(webinarData?.endDate),
//         state_id: webinarData.StateId,
//         degree_type_id: webinarData.DegreeTypeId,
//         imageFile: null,
//         thumbnail_image_name: webinarData.thumbnail_image_name,  // Assuming you have this field
//         s3_image_url: webinarData.s3_image_url || webinarData?.thumbnail, // Get the s3 image URL
//         webinar_number: webinarData?.webinarNumber
//       });
//     }
//   }, [statedegreedata, webinarData]);


//     // Helper function to format date to YYYY-MM-DD for input type="date"
//     const formatDateForInput = (dateString) => {
//         if (!dateString) return '';
//         const date = new Date(dateString);
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     };

//     // Helper function to format time to HH:MM for input type="time"
//     const formatTimeForInput = (dateString) => {
//         if (!dateString) return '';
//         const date = new Date(dateString);
//         const hours = String(date.getHours()).padStart(2, '0'); // Get 24-hour format
//         const minutes = String(date.getMinutes()).padStart(2, '0');
//         return `${hours}:${minutes}`;
//     };

//   const [webinar, setWebinar] = useState({
//     webinar_number: "",
//     title: "",
//     webinar_link: "",
//     agenda: "",
//     webinar_start_date: "",
//     webinar_start_time: "",
//     webinar_end_date: "",
//     webinar_end_time: "",
//     state_id: "",
//     degree_type_id: "",
//     imageFile: null,
//     thumbnail_image_name: "",
//     s3_image_url: "",
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

//     const formData = new FormData();
//     formData.append("state_id", webinar.state_id);
//     formData.append("degree_type_id", webinar.degree_type_id);
//     formData.append("title", webinar.title);
//     formData.append("webinar_link", webinar.webinar_link);
//     formData.append("agenda", webinar.agenda);


//     if (webinarType === "upcoming") {
//       formData.append("StateId", webinar?.state_id);
//       formData.append("DegreeTypeId", webinar?.degree_type_id);
//       formData.append("webinarLink", webinar?.webinar_link);
//       formData.append("description", webinar?.agenda);
//       // Combine date and time, then convert to ISO string
//       const webinarStartISO = new Date(`${webinar?.webinar_start_date}T${webinar?.webinar_start_time}`).toISOString();
//       const webinarEndISO = new Date(`${webinar?.webinar_end_date}T${webinar?.webinar_end_time}`).toISOString();

//       formData.append("startDate", webinarStartISO);
//       formData.append("endDate", webinarEndISO);
//     }
//     formData.append("webinar_start_date", webinar.webinar_start_date);
//     formData.append("webinar_start_time", webinar.webinar_start_time);
//     formData.append("webinar_end_date", webinar.webinar_end_date);
//     formData.append("webinar_end_time", webinar.webinar_end_time);
//     formData.append("webinarNumber", webinar.webinar_number);

//     // Combine date and time, then convert to ISO string
//     const webinarStartISO = new Date(`${webinar?.webinar_start_date}T${webinar?.webinar_start_time}`).toISOString();
//     const webinarEndISO = new Date(`${webinar?.webinar_end_date}T${webinar?.webinar_end_time}`).toISOString();

//     formData.append("startDate", webinarStartISO);
//     formData.append("endDate", webinarEndISO);

//     if (webinar.imageFile) {
//       formData.append("image", webinar.imageFile);
//     }

//     try {
//       await updateWebinar({ id: webinarData.id, updateWebinardata: formData }).unwrap();
//       refetch();
//       toast.dismiss()
//       toast.success("Updated Webinar Successfully")
//       onClose();
//     } catch (error) {
//       console.error("Failed to update webinar:", error);
//     }
//   };

//   return (
//     <Modal show={isOpen} onHide={onClose} size="lg">
//       <Modal.Header
//         className={styles.modal_header__}
//         closeButton
//         style={{ textAlign: "center" }}
//       >
//         <Modal.Title className={styles.title}>Add Webinar </Modal.Title>
//       </Modal.Header>
//       <Modal.Body className={styles.recorded_webinar_body}>
//         <form onSubmit={handleFormSubmit} className={styles.upcoming_form}>
//           <div className={styles.upcoming_form_webinar_row}>
//             <div controlId="formDegreeType">
//               <label className={styles.label_fnt_webinar}>Degree Type</label>
//               <SingleSelectDropdown
//                 placeholder="Degree Type"
//                 webinarstyle={true}
//                 options={degreeTypeOptions}
//                 selectedOption={degreeType} // Pass the selected degree type
//                 setSelectedOption={(value) => {
//                   setDegreeType(value); // Update degree type in state
//                   setWebinar((prevState) => ({
//                     ...prevState,
//                     degree_type_id: value, // Set degree_type_id in webinar state
//                   }));
//                 }}
//               />
//             </div>
//             <div controlId="formState">
//               <label className={styles.label_fnt_webinar}>State</label>
//               <SingleSelectDropdown
//                 className={styles.drop_down_container}
//                 placeholder="State"
//                 webinarstyle={true}
//                 options={stateOptions}
//                 selectedOption={states} // Pass the selected state
//                 setSelectedOption={(value) => {
//                   setState(value); // Update state in state
//                   setWebinar((prevState) => ({
//                     ...prevState,
//                     state_id: value, // Set state_id in webinar state
//                   }));
//                 }}
//               />
//             </div>
//           </div>
//           <div controlId="formTitle">
//             <label className={styles.label_fnt_webinar} htmlFor="title">
//               Title
//             </label>
//             <input
//               id="title"
//               type="text"
//               placeholder="Enter title"
//               name="title"
//               value={webinar.title}
//               onChange={handleInputChange}
//               required
//               className={styles.form_input_title_input}
//             />
//           </div>

//           <div controlId="formAgenda">
//             <label className={styles.label_fnt_webinar} htmlFor="Agenda">
//               Agenda
//             </label>
//             <textarea
//               id="Agenda"
//               as="textarea"
//               rows={4}
//               placeholder="Enter agenda"
//               name="agenda"
//               value={webinar.agenda}
//               onChange={handleInputChange}
//               className={styles.recorded_webinar_input_text_area}
//               required
//             ></textarea>
//           </div>

//           <div className={styles.webinar_input_half}>
//             <div controlId="formWebinarLink">
//               <label className={styles.label_fnt_webinar} htmlFor="webinarLink">
//                 Webinar Link
//               </label>
//               <input
//                 type="url"
//                 id="webinarLink"
//                 placeholder="Enter webinar link"
//                 name="webinar_link"
//                 value={webinar.webinar_link}
//                 onChange={handleInputChange}
//                 className={styles.form_input_title_input_half}
//                 required
//               />
//             </div>

//             <div controlId="formStartDate">
//               <label
//                 className={styles.label_fnt_webinar}
//                 htmlFor="StartDate"
//               >
//                 Start Date
//               </label>
//               <input
//                 id="StartDate"
//                 type="date"
//                 name="webinar_start_date"
//                 value={webinar?.webinar_start_date}
//                 onChange={handleInputChange}
//                 className={styles.form_input_title_input_half}
//                 required
//               />
//             </div>
//           </div>

//           <div className={styles.webinar_input_three_section}>
//             <div controlId="formStartTime">
//               <label className={styles.label_fnt_webinar} htmlFor="StartTime">Start Time</label>
//               <input
//                 type="time"
//                 id='StartTime'
//                 name="webinar_start_time"
//                 value={webinar.webinar_start_time}
//                 onChange={handleInputChange}
//                 className={styles.form_input_title_input_half_time}
//                 required
//               />
//             </div>

//             <div controlId="formEndDate">
//               <label className={styles.label_fnt_webinar} htmlFor='EndDate'>End Date</label>
//               <input
//                 type="date"
//                 id='EndDate'
//                 name="webinar_end_date"
//                 value={webinar.webinar_end_date}
//                 onChange={handleInputChange}
//                 className={styles.form_input_title_input_half_time}
//                 required
//               />
//             </div>

//             <div controlId="formEndTime">
//               <label className={styles.label_fnt_webinar} htmlFor="EndTime">End Time</label>
//               <input
//                 type="time"
//                 id='EndTime'
//                 name="webinar_end_time"
//                 value={webinar.webinar_end_time}
//                 onChange={handleInputChange}
//                 className={styles.form_input_title_input_half_time}
//                 required
//               />
//             </div>
//           </div>

//           <div controlId="formTitle">
//             <label className={styles.label_fnt_webinar} htmlFor="title">
//               Webinar Number
//             </label>
//             <input
//               id="title"
//               type="text"
//               placeholder="Enter title"
//               name="webinar_number"
//               value={webinar.webinar_number}
//               onChange={handleInputChange}
//               className={styles.form_input_title_input}
//               required
//             />
//           </div>

//           <div controlId="formThumbnail">
//             <label className={styles.label_fnt_webinar} htmlFor="Thumbnail">
//               Thumbnail Image
//             </label>
//             <div
//               onClick={() => document.getElementById("fileInput").click()}
//               className={styles.thumbnail__}
//             >

//               {webinar.imageFile ? (
//                 <img
//                   src={URL.createObjectURL(webinar.imageFile)}
//                   alt="Selected Thumbnail"
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                   }}
//                 />
//               ) : webinar.s3_image_url ?
//                 (
//                   <img
//                     src={webinar?.s3_image_url}
//                     alt="Selected Thumbnail"
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 ) :
//                 (
//                   <span className={styles.thumbnail_text__}>100 * 100</span>
//                 )}
//             </div>

//             <input
//               type="file"
//               id="fileInput"
//               name="image"
//               onChange={handleFileChange}
//               accept="image/*"
//               style={{ display: "none" }}
//             />

//             {webinar.thumbnail_image_name && (
//               <div>
//                 <small>Selected file: {webinar.thumbnail_image_name}</small>
//               </div>
//             )}
//           </div>

//           <button type="submit">Add Webinar</button>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default UpdateWebinarModal;




import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useUpdateWebinarMutation, useGetStatesDegreeTypeQuery } from "../../../../lib/services/webinar";
import styles from "./updateWebinar.module.css";
import SingleSelectDropdown from "../../../../components/SingleSelectDropdown";
import { toast } from "react-toastify";

const UpdateWebinarModal = ({ isOpen, onClose, webinarData, refetch, webinarType }) => {
  const [updateWebinar, { isLoading: loadingUpdate }] = useUpdateWebinarMutation();
  const { data: statedegreedata } = useGetStatesDegreeTypeQuery();

  const [stateOptions, setStateOptions] = useState([]);
  const [degreeTypeOptions, setDegreeTypeOptions] = useState([]);
  const [states, setState] = useState("");
  const [degreeType, setDegreeType] = useState("");

  // Helper functions
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  const formatTimeForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  const [webinar, setWebinar] = useState({
    webinar_number: "",
    title: "",
    webinar_link: "",
    agenda: "",
    webinar_start_date: "",
    webinar_start_time: "",
    webinar_end_date: "",
    webinar_end_time: "",
    state_id: "",
    degree_type_id: "",
    imageFile: null,
    thumbnail_image_name: "",
    s3_image_url: "",
  });

  useEffect(() => {
    if (statedegreedata) {
      setStateOptions(statedegreedata?.data?.states || []);
      setDegreeTypeOptions(statedegreedata?.data?.degreeTypes || []);
    }

    if (webinarData) {
      setState(webinarData.StateId);
      setDegreeType(webinarData.DegreeTypeId);
      setWebinar({
        title: webinarData?.title || "",
        webinar_link: webinarData?.webinar_link || webinarData?.webinarLink || "",
        agenda: webinarData?.agenda || webinarData?.description || "",
        webinar_start_date:
          webinarData.webinar_start_date?.split("T")[0] || formatDateForInput(webinarData?.startDate),
        webinar_start_time:
          webinarData.webinar_start_time?.slice(0, -3) || formatTimeForInput(webinarData?.startDate),
        webinar_end_date:
          webinarData.webinar_end_date?.split("T")[0] || formatDateForInput(webinarData?.endDate),
        webinar_end_time:
          webinarData.webinar_end_time?.slice(0, -3) || formatTimeForInput(webinarData?.endDate),
        state_id: webinarData.StateId || "",
        degree_type_id: webinarData.DegreeTypeId || "",
        imageFile: null,
        thumbnail_image_name: webinarData.thumbnail_image_name || "",
        s3_image_url: webinarData.s3_image_url || webinarData?.thumbnail || "",
        webinar_number: webinarData?.webinarNumber || "",
      });
    }
  }, [statedegreedata, webinarData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWebinar((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWebinar((prev) => ({
        ...prev,
        imageFile: file,
        thumbnail_image_name: file.name,
        s3_image_url: URL.createObjectURL(file),
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("state_id", webinar.state_id);
    formData.append("degree_type_id", webinar.degree_type_id);
    formData.append("title", webinar.title);
    formData.append("webinar_link", webinar.webinar_link);
    formData.append("agenda", webinar.agenda);
    formData.append("webinarNumber", webinar.webinar_number);

    if (webinarType === "upcoming") {
      formData.append("StateId", webinar.state_id);
      formData.append("DegreeTypeId", webinar.degree_type_id);
      formData.append("webinarLink", webinar.webinar_link);
      formData.append("description", webinar.agenda);
    }

    const webinarStartISO = new Date(`${webinar.webinar_start_date}T${webinar.webinar_start_time}`).toISOString();
    const webinarEndISO = new Date(`${webinar.webinar_end_date}T${webinar.webinar_end_time}`).toISOString();

    formData.append("startDate", webinarStartISO);
    formData.append("endDate", webinarEndISO);

    if (webinar.imageFile) {
      formData.append("image", webinar.imageFile);
    }

    try {
      await updateWebinar({ id: webinarData.id, updateWebinardata: formData }).unwrap();
      refetch();
      toast.success("Updated Webinar Successfully");
      onClose();
    } catch (err) {
      console.error("Failed to update webinar:", err);
      toast.error("Failed to update webinar. Please try again.");
    }
  };

  // console.log("webinar type modal ", webinarType)

  return (
    <Modal show={isOpen} onHide={onClose} size="lg">
      <Modal.Header className={styles.modal_header__} closeButton>
        <Modal.Title className={styles.title}>Update Webinar</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.recorded_webinar_body}>
        <form onSubmit={handleFormSubmit} className={styles.upcoming_form}>
          {/* Degree & State */}
          <div className={styles.upcoming_form_webinar_row}>
            <div>
              <label className={styles.label_fnt_webinar}>Degree Type</label>
              <SingleSelectDropdown
                placeholder="Degree Type"
                webinarstyle
                options={degreeTypeOptions}
                selectedOption={degreeType}
                setSelectedOption={(val) => {
                  setDegreeType(val);
                  setWebinar((prev) => ({ ...prev, degree_type_id: val }));
                }}
              />
            </div>
            <div>
              <label className={styles.label_fnt_webinar}>State</label>
              <SingleSelectDropdown
                placeholder="State"
                webinarstyle
                options={stateOptions}
                selectedOption={states}
                setSelectedOption={(val) => {
                  setState(val);
                  setWebinar((prev) => ({ ...prev, state_id: val }));
                }}
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className={styles.label_fnt_webinar} htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={webinar.title}
              onChange={handleInputChange}
              placeholder="Enter title"
              className={styles.form_input_title_input}
              required
            />
          </div>

          {/* Agenda */}
          <div>
            <label className={styles.label_fnt_webinar} htmlFor="agenda">Agenda</label>
            <textarea
              id="agenda"
              rows={4}
              name="agenda"
              value={webinar.agenda}
              onChange={handleInputChange}
              placeholder="Enter agenda"
              className={styles.recorded_webinar_input_text_area}
              required
            />
          </div>

          {/* Webinar Link & Start Date */}
          <div className={styles.webinar_input_half}>
            <div>
              <label className={styles.label_fnt_webinar} htmlFor="webinar_link">
          
                {
                  webinarType === "recorded" ?
                    "Vimeo Link Id" :
                    "Webinar Link"
                }
              </label>
              <input
                type={webinarType === "recorded"? "number":"url"}
                id="webinar_link"
                name="webinar_link"
                value={webinar.webinar_link}
                onChange={handleInputChange}
                placeholder="Enter webinar link"
                className={styles.form_input_title_input_half}
                required
              />
            </div>
            <div>
              <label className={styles.label_fnt_webinar} htmlFor="webinar_start_date">Start Date</label>
              <input
                type="date"
                id="webinar_start_date"
                name="webinar_start_date"
                value={webinar.webinar_start_date}
                onChange={handleInputChange}
                className={styles.form_input_title_input_half}
                required
              />
            </div>
          </div>

          {/* Time & End Date */}
          <div className={styles.webinar_input_three_section}>
            <div>
              <label className={styles.label_fnt_webinar} htmlFor="webinar_start_time">Start Time</label>
              <input
                type="time"
                id="webinar_start_time"
                name="webinar_start_time"
                value={webinar.webinar_start_time}
                onChange={handleInputChange}
                className={styles.form_input_title_input_half_time}
                required
              />
            </div>
            <div>
              <label className={styles.label_fnt_webinar} htmlFor="webinar_end_date">End Date</label>
              <input
                type="date"
                id="webinar_end_date"
                name="webinar_end_date"
                value={webinar.webinar_end_date}
                onChange={handleInputChange}
                className={styles.form_input_title_input_half_time}
                required
              />
            </div>
            <div>
              <label className={styles.label_fnt_webinar} htmlFor="webinar_end_time">End Time</label>
              <input
                type="time"
                id="webinar_end_time"
                name="webinar_end_time"
                value={webinar.webinar_end_time}
                onChange={handleInputChange}
                className={styles.form_input_title_input_half_time}
                required
              />
            </div>
          </div>

          {/* Webinar Number */}
          <div>
            <label className={styles.label_fnt_webinar} htmlFor="webinar_number">Webinar Number</label>
            <input
              id="webinar_number"
              type="text"
              name="webinar_number"
              value={webinar.webinar_number}
              onChange={handleInputChange}
              placeholder="Enter webinar number"
              className={styles.form_input_title_input}
              required
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className={styles.label_fnt_webinar} htmlFor="fileInput">Thumbnail Image</label>
            <div
              onClick={() => document.getElementById("fileInput").click()}
              className={styles.thumbnail__}
            >
              {webinar.s3_image_url ? (
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
              <small>Selected file: {webinar.thumbnail_image_name}</small>
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

export default UpdateWebinarModal;
