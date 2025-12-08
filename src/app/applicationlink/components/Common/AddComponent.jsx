// import React, { useEffect, useState } from "react";
// import { Modal } from "react-bootstrap";
// import { RxFileText } from "react-icons/rx";
// import { HiOutlineExternalLink } from "react-icons/hi";
// import Toast, { toast } from "react-toastify";
// import SingleSelectDropdown from "../../../../components/SingleSelectDropdown";
// import {
//   useAddapplicationLinkMutation,
//   useGetApplicationlinkstatequeryQuery,
//   useUpdateapplicationLinkMutation,
// } from "../../../../lib/services/applicationLink";
// import {
//   useAddCouncelingLinkMutation,
//   useUpdateCouncelingLinkMutation,
// } from "../../../../lib/services/councelinglink";
// import styles from "./page.module.css";

// const AddApplicationCommon = ({
//   isOpen,
//   onClose,
//   refetch,
//   page,
//   applicationData,
//   update,
// }) => {
//   const [createapplicationLink] = useAddapplicationLinkMutation();
//   const [addCouncelingLink] = useAddCouncelingLinkMutation();
//   const [updateapplicationLink] = useUpdateapplicationLinkMutation();
//   const [updateCouncelingLink] = useUpdateCouncelingLinkMutation();

//   const [stateOptions, setStateOptions] = useState();
//   const [degreeTypeOptions, setDegreeTypeOptions] = useState();
//   const [states, setState] = useState("");
//   const [degreeType, setDegreeType] = useState("");

//   const { data: statedegreedata } = useGetApplicationlinkstatequeryQuery();

//   const [applicationerror, setapplicationerror] = useState({
//     titleError: "",
//     linkError: "",
//     state_idError: "",
//     degree_type_idError: "",
//     event_startError: "",
//     event_endError: "",
//   });

//   const [Applicationlink, setApplicationLink] = useState({
//     title: "",
//     link: "",
//     state_id: "",
//     degree_type_id: "",
//     event_start: "",
//     event_end: "",
//   });

//   useEffect(() => {
//     if (statedegreedata) {
//       setStateOptions(statedegreedata?.data?.states);
//       setDegreeTypeOptions(statedegreedata?.data?.degreeTypes);
//     }

//     if (isOpen && applicationData) {
//       setState(applicationData.StateId || "");
//       setDegreeType(applicationData.DegreeTypeId || "");

//       setApplicationLink({
//         id: applicationData?.id,
//         title: applicationData?.title || "",
//         link: applicationData?.link || "",
//         state_id: applicationData.StateId || "",
//         degree_type_id: applicationData.DegreeTypeId || "",
//         event_start: applicationData.event_start?.split(" ")[0] || "",
//         event_end: applicationData.event_end?.split(" ")[0] || "",
//       });
//     }
//   }, [statedegreedata, applicationData, isOpen]);

//   const validateField = (value, type) => {
//     const validations = {
//       title: {
//         // pattern: /^(?=.*[A-Za-z])[A-Za-z\s]+$/,
//         pattern: /.*/,
//         error: "*Title Cannot Be Empty",
//         field: "titleError",
//       },
//       link: {
//         pattern: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
//         error: "*Please Enter A Valid Link",
//         field: "linkError",
//       },
//       event_start: {
//         error: "*Start Date Cannot Be Empty",
//         field: "event_startError",
//       },
//       event_end: {
//         error: "*End Date Cannot Be Empty",
//         field: "event_endError",
//       },
//     };

//     const val = validations[type];
//     if (!value || (val.pattern && !val.pattern.test(value))) {
//       setapplicationerror((prev) => ({ ...prev, [val.field]: val.error }));
//       return false;
//     }
//     setapplicationerror((prev) => ({ ...prev, [val.field]: "" }));
//     return true;
//   };

//   const DropDownValueValidation = () => {
//     const errors = {
//       state_idError: !states ? "*State Cannot Be Empty" : "",
//       degree_type_idError: !degreeType ? "*Degree Cannot Be Empty" : "",
//     };

//     setapplicationerror((prev) => ({ ...prev, ...errors }));

//     return !errors.state_idError && !errors.degree_type_idError;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setApplicationLink((prev) => ({ ...prev, [name]: value }));
//     validateField(value, name);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const validations = [
//       validateField(Applicationlink.title, "title"),
//       validateField(Applicationlink.link, "link"),
//       validateField(Applicationlink.event_start, "event_start"),
//       validateField(Applicationlink.event_end, "event_end"),
//       DropDownValueValidation(),
//     ];

//     if (validations.includes(false)) return;

//     const formData = {
//       title: Applicationlink.title,
//       link: Applicationlink.link,
//       state_id: Applicationlink.state_id,
//       degree_type_id: degreeType,
//       event_start: Applicationlink.event_start,
//       event_end: Applicationlink.event_end,
//     };

//     try {
//       console.log("page ", page , update)
//       const result = page
//         ? await (update
//             ? updateapplicationLink({
//                 id: applicationData?.id,
//                 updateApplication: formData,
//               })
//             : createapplicationLink(formData)
//           ).unwrap()
//         : await (update
//             ? updateCouncelingLink({
//                 id: applicationData?.id,
//                 updateCommunity: formData,
//               })
//             : addCouncelingLink(formData)
//           ).unwrap();

//       if (result) {
//         toast.success(
//           update
//             ? page
//               ? "Update Application Link Successfully"
//               : "Update Counseling Link Successfully"
//             : page
//             ? "Application Link Added Successfully"
//             : "Counseling Link Added Successfully"
//         );

//         refetch();
//         handleClose();
//       }
//     } catch (error) {
//       toast.error(error?.message || "Something Went Wrong");
//     }
//   };

//   const handleClose = () => {
//     setApplicationLink({
//       title: "",
//       link: "",
//       state_id: "",
//       degree_type_id: "",
//       event_start: "",
//       event_end: "",
//     });
//     setapplicationerror({
//       titleError: "",
//       linkError: "",
//       state_idError: "",
//       degree_type_idError: "",
//       event_startError: "",
//       event_endError: "",
//     });
//     setState("");
//     setDegreeType("");
//     onClose(false);
//   };

//   return (
//     <Modal show={isOpen} onHide={handleClose} size="lg" centered>
//       <Modal.Header className={styles.modal_header__} closeButton>
//         <Modal.Title className={styles.title}>
//           {applicationData?.title
//             ? update
//               ? "Update Application Link"
//               : "Update Counselling Link"
//             : page
//             ? "Add Application Link"
//             : "Add Counselling Link"}
//         </Modal.Title>
//       </Modal.Header>

//       <Modal.Body className={styles.recorded_webinar_body}>
//         <form onSubmit={handleFormSubmit} className={styles.upcoming_form}>
//           <div className={styles.upcoming_form_webinar_row}>
//             <div>
//               <label className={styles.label_fnt_webinar}>Degree</label>
//               <SingleSelectDropdown
//                 placeholder="Degree Type"
//                 webinarstyle={true}
//                 options={degreeTypeOptions}
//                 selectedOption={degreeType}
//                 setSelectedOption={(value) => {
//                   setDegreeType(value);
//                   setApplicationLink((prev) => ({
//                     ...prev,
//                     degree_type_id: value,
//                   }));
//                 }}
//               />
//               {applicationerror.degree_type_idError && (
//                 <span className={styles.errorValidation}>
//                   {applicationerror.degree_type_idError}
//                 </span>
//               )}
//             </div>
//             <div>
//               <label className={styles.label_fnt_webinar}>State</label>
//               <SingleSelectDropdown
//                 placeholder="State"
//                 webinarstyle={true}
//                 options={stateOptions}
//                 selectedOption={states}
//                 setSelectedOption={(value) => {
//                   setState(value);
//                   setApplicationLink((prev) => ({ ...prev, state_id: value }));
//                 }}
//               />
//               {applicationerror.state_idError && (
//                 <span className={styles.errorValidation}>
//                   {applicationerror.state_idError}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Title */}
//           <div>
//             <label className={styles.label_fnt_webinar}>Title</label>
//             <div className={styles.input_container}>
//               <input
//                 type="text"
//                 name="title"
//                 value={Applicationlink.title}
//                 onChange={handleInputChange}
//                 className={
//                   applicationerror.titleError
//                     ? styles.error_input__
//                     : styles.form_input_title_input
//                 }
//                 placeholder="Enter title"
//                 maxLength={122}
//               />
//               <span className={styles.form_icons___}>
//                 <RxFileText size={20} />
//               </span>
//             </div>
//             {applicationerror.titleError && (
//               <span className={styles.errorValidation}>
//                 {applicationerror.titleError}
//               </span>
//             )}
//           </div>

//           {/* Link */}
//           <div>
//             <label className={styles.label_fnt_webinar}>Link</label>
//             <div className={styles.input_container}>
//               <input
//                 type="text"
//                 name="link"
//                 value={Applicationlink.link}
//                 onChange={handleInputChange}
//                 className={
//                   applicationerror.linkError
//                     ? styles.error_input__
//                     : styles.form_input_title_input
//                 }
//                 placeholder="Enter Link"
//               />
//               <span className={styles.form_icons___}>
//                 <HiOutlineExternalLink size={20} />
//               </span>
//             </div>
//             {applicationerror.linkError && (
//               <span className={styles.errorValidation}>
//                 {applicationerror.linkError}
//               </span>
//             )}
//           </div>

//           <div className={styles.webinar_input_half}>
//             <div>
//               <label className={styles.label_fnt_webinar}>Event Start</label>
//               <input
//                 type="date"
//                 name="event_start"
//                 value={Applicationlink.event_start}
//                 min={new Date().toISOString().split("T")[0]}
//                 onChange={handleInputChange}
//                 className={
//                   applicationerror.event_startError
//                     ? styles.error_input__
//                     : styles.form_input_title_input_half
//                 }
//               />
//               {applicationerror.event_startError && (
//                 <span className={styles.errorValidation}>
//                   {applicationerror.event_startError}
//                 </span>
//               )}
//             </div>
//             <div>
//               <label className={styles.label_fnt_webinar}>Event End</label>
//               <input
//                 type="date"
//                 name="event_end"
//                 value={Applicationlink.event_end}
//                 min={
//                   new Date(Date.now() + 86400000).toISOString().split("T")[0]
//                 }
//                 onChange={handleInputChange}
//                 className={
//                   applicationerror.event_endError
//                     ? styles.error_input__
//                     : styles.form_input_title_input_half
//                 }
//               />
//               {applicationerror.event_endError && (
//                 <span className={styles.errorValidation}>
//                   {applicationerror.event_endError}
//                 </span>
//               )}
//             </div>
//           </div>

//           <button type="submit" className="mt-4">
//             {applicationData?.title
//               ? update
//                 ? "Update Application Link"
//                 : "Update Counselling Link"
//               : page
//               ? "Add Application Link"
//               : "Add Counselling Link"}
//           </button>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AddApplicationCommon;


