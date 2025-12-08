import React from "react";
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
// Add Important Link Mutation
import { useAddimportantLinkMutation } from "../../../../../../../lib/services/importantLink";
import { useGetApplicationlinkstatequeryQuery } from "../../../../../../../lib/services/applicationLink";
//Update Important Link
import { useUpdateimportantLinkMutation } from "../../../../../../../lib/services/importantLink";
// AddCommunity Link Mutation
import { useAddCommunityLinkMutation } from "../../../../../../../lib/services/communityLink";
// // Update Counceling Link
// import { useUpdateCouncelingLinkMutation } from "../../../../lib/services/councelinglink";
import SingleSelectDropdown from "../../../../../../../components/SingleSelectDropdown";
import Toast, { toast } from "react-toastify";
import styles from "./common.module.css";

const AddImportanLinkcommon = ({
  isOpen,
  onClose,
  refetch,
  page,
  applicationData,
  update,
}) => {
  const [createimportantLink] = useAddimportantLinkMutation();
  // Add Important Link Add
  const [importantLinkcreate] = useAddimportantLinkMutation();
  // add Community Link Add

  // Update Important  Link
  const [updateimportantLink, { isLoading: applicationEdit }] =
    useUpdateimportantLinkMutation();

  //Update Counseling Link
  //   const [updateCouncelingLink] = useUpdateCouncelingLinkMutation();

  const [stateOptions, setStateOptions] = useState();
  const [degreeTypeOptions, setDegreeTypeOptions] = useState();
  const [states, setState] = useState("");
  const [degreeType, setDegreeType] = useState("");
  const {
    data: statedegreedata,
    error,
    isLoading,
  } = useGetApplicationlinkstatequeryQuery();

  useEffect(() => {
    if (statedegreedata) {
      setStateOptions(statedegreedata?.data?.states);
      setDegreeTypeOptions(statedegreedata?.data?.degreeTypes);
    }

    if (isOpen && applicationData) {
      setState(applicationData.StateId || "");
      setDegreeType(applicationData.DegreeTypeId || "");

      setImportantLink({
        id: applicationData?.id,
        title: applicationData?.title || "",
        link: applicationData?.link || "",
        state_id: applicationData.StateId || "",
        tag: applicationData.tag || "",
        degree_type_id: applicationData.DegreeTypeId || "",
        event_start: applicationData?.event_start?.substring(0, 10) || "",
        event_end: applicationData.event_end?.substring(0, 10) || "",
      });
    }
  }, [statedegreedata, applicationData, isOpen]);

  useEffect(() => {}, [applicationData]);

  // ImportantLinkError Validation
  const [importantLinkError, setImportantLinkError] = useState({
    titleError: "",
    linkError: "",
    tagError: "",
    state_idError: "",
    degree_type_idError: "",
    event_startError: "",
    event_endError: "",
  });

  const [ImportantLink, setImportantLink] = useState({
    title: "",
    link: "",
    tag: "",
    state_id: "",
    degree_type_id: "",
    event_start: "",
    event_end: "",
  });

  const validateTitle = (value) => {
    const Patter = /^(?=.*[A-Za-z])[A-Za-z\s]+$/;
    if (!value) {
      setImportantLinkError((prevError) => ({
        ...prevError,
        titleError: "*Title Cannot Be Empty",
      }));
      return false;
    } else if (value.length > 120) {
      setImportantLinkError((prevError) => ({
        ...prevError,
        titleError: "*Title Cannot Be More Than 120 words",
      }));
      return false;
    }
    setImportantLinkError((prevState) => ({
      ...prevState,
      titleError: "",
    }));
    return true;
  };

  const validateLink = (value) => {
    const pattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
    if (!value) {
      setImportantLinkError((prevState) => ({
        ...prevState,
        linkError: "*Link Cannot Be Empty",
      }));
      return false;
    } else if (!pattern.test(value)) {
      setImportantLinkError((prevState) => ({
        ...prevState,
        linkError: "*Please Enter A Valid Link",
      }));
      return false;
    }
    setImportantLinkError((prevState) => ({
      ...prevState,
      linkError: "",
    }));
    return true;
  };

  const validateTag = (value) => {
    const Patter = /^(?=.*[A-Za-z])[A-Za-z\s]+$/;
    if (!value) {
      setImportantLinkError((prevError) => ({
        ...prevError,
        tagError: "*Tag Cannot Be Empty",
      }));
      return false;
    } else if (value.length > 120) {
      setImportantLinkError((prevError) => ({
        ...prevError,
        tagError: "*Tag Cannot Be More Than 120 words",
      }));
      return false;
    } else if (!Patter.test(value)) {
      setImportantLinkError((prevError) => ({
        ...prevError,
        tagError: "*Tag cannot contain special characters or numbers",
      }));
      return false;
    }
    setImportantLinkError((prevState) => ({
      ...prevState,
      tagError: "",
    }));
    return true;
  };

  const validateEventStart = (value) => {
    if (!value) {
      setImportantLinkError((prevState) => ({
        ...prevState,
        event_startError: "*Start Date Cannot Be Empty",
      }));
      return false;
    }

    setImportantLinkError((prevState) => ({
      ...prevState,
      event_startError: "",
    }));
    return true;
  };

  const validateEventEndDate = (value) => {
    if (!value) {
      setImportantLinkError((prevState) => ({
        ...prevState,
        event_endError: "*End Date Cannot Be Empty",
      }));
      return false;
    }
    setImportantLinkError((prevState) => ({
      ...prevState,
      event_endError: "",
    }));
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "webinar_start_time" || name === "webinar_end_time") {
      const convertedTime = convertTo24HourFormat(value);
      setImportantLink((prevState) => ({
        ...prevState,
        [name]: convertedTime,
      }));
    } else {
      setImportantLink((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    if (name == "title") validateTitle(value);
    if (name == "link") validateLink(value);
    if (name == "tag") validateTag(value);
    if (name == "event_start") validateEventStart(value);
    if (name == "event_end") validateEventEndDate(value);
  };

  const DropDownValueValidation = () => {
    if (!states) {
      setImportantLinkError((prevState) => ({
        ...prevState,
        state_idError: "*State Cannot Be Empty",
      }));
      return false;
    } else {
      setImportantLinkError((prevState) => ({
        ...prevState,
        state_idError: "",
      }));
      return true;
    }
  };

  const DegreeTypeValidation = () => {
    if (!degreeType) {
      setImportantLinkError((prevState) => ({
        ...prevState,
        degree_type_idError: "*Degree Cannot Be Empty",
      }));
      return false;
    } else {
      setImportantLinkError((prevState) => ({
        ...prevState,
        degree_type_idError: "",
      }));
      return true;
    }
  };

  // Sending the Form data
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const TitleError = validateTitle(ImportantLink.title);
    const LinkError = validateLink(ImportantLink.link);
    const TagError = validateTag(ImportantLink.tag);
    const Event_Start_error = validateEventStart(ImportantLink.event_start);
    const Event_end_error = validateEventEndDate(ImportantLink.event_end);
    const State_id_validation = DropDownValueValidation(ImportantLink.state_id);
    const Degree_id_validation = DegreeTypeValidation(degreeType);

    if (
      !TitleError ||
      !LinkError ||
      !TagError ||
      !Event_Start_error ||
      !Event_end_error ||
      !State_id_validation ||
      !Degree_id_validation
    ) {
      return;
    }

    const formData = {
      title: ImportantLink.title,
      link: ImportantLink.link,
      tag: ImportantLink.tag,
      state_id: ImportantLink.state_id,
      degree_type_id: degreeType,
      event_start: ImportantLink.event_start,
      event_end: ImportantLink.event_end,
    };

    try {
      console.log("update ", update)
      if (page == null) {
        const UpdateLinkData = update
          ? updateimportantLink({
              id: applicationData?.id,
              updateImportantlink: formData,
            })
          : updateCouncelingLink({
              id: applicationData?.id,
              updateCommunity: formData,
            });

        const UpdateLink = await UpdateLinkData.unwrap();
        if (UpdateLink) {
          refetch();
          toast.success(
            update
              ? "Update Important Link Successfully"
              : "Update Counseling Link  Successfully"
          );
          onClose();
          setState("");
          setDegreeType("");
          setImportantLink({
            title: "",
            link: "",
            tag: "",
            state_id: "",
            degree_type_id: "",
            event_start: "",
            event_end: "",
          });
          setImportantLinkError({
            titleError: "",
            linkError: "",
            state_idError: "",
            degree_type_idError: "",
            event_startError: "",
            event_endError: "",
          });
        }
      } else {
        {
          // console.log(formData, "formData");
        }
        const PostLinkData = page
          ? createimportantLink(formData)
          : addCommunityLink(formData);
        const Response = await PostLinkData.unwrap();

        if (Response) {
          // console.log(Response, "Response ");
          refetch();
          toast.success(
            page
              ? "Important Link Added Successfully"
              : "Community Link Added Successfully"
          );
          onClose();
          setState("");
          setDegreeType("");
          setImportantLink({
            title: "",
            link: "",
            state_id: "",
            degree_type_id: "",
            event_start: "",
            event_end: "",
          });
          setImportantLinkError({
            titleError: "",
            linkError: "",
            state_idError: "",
            degree_type_idError: "",
            event_startError: "",
            event_endError: "",
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error || "Something Went Wrong");
    }
  };

  const handleClose = () => {
    setImportantLink({
      title: "",
      link: "",
      state_id: "",
      degree_type_id: "",
      event_start: "",
      event_end: "",
    });
    setImportantLinkError({
      titleError: "",
      linkError: "",
      state_idError: "",
      degree_type_idError: "",
      event_startError: "",
      event_endError: "",
    });
    onClose(false);
  };

  return (
    <>
      <Modal
        show={isOpen}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          className={styles.modal_header__}
          closeButton
          style={{ textAlign: "center" }}
        >
          <Modal.Title className={styles.title}>
            {applicationData?.title
              ? update
                ? "Update Important Link"
                : "Update Counselling Link"
              : page
              ? "Add Important Link"
              : "Add Community Link"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.recorded_webinar_body}>
          <form onSubmit={handleFormSubmit} className={styles.upcoming_form}>
            <div className={styles.upcoming_form_webinar_row}>
              <div controlId="formDegreeType">
                <label className={styles.label_fnt_webinar}>Degree</label>
                <SingleSelectDropdown
                  placeholder="Degree Type"
                  webinarstyle={true}
                  options={degreeTypeOptions}
                  selectedOption={degreeType}
                  setSelectedOption={(value) => {
                    setDegreeType(value);
                    setImportantLink((prevState) => ({
                      ...prevState,
                      degree_type_id: value,
                    }));
                  }}
                />

                {importantLinkError.degree_type_idError && (
                  <span className={styles.errorValidation}>
                    {importantLinkError.degree_type_idError}
                  </span>
                )}
              </div>

              <div controlId="formState">
                <label className={styles.label_fnt_webinar}>State</label>
                <SingleSelectDropdown
                  className={styles.drop_down_container}
                  placeholder="State"
                  options={stateOptions}
                  webinarstyle={true}
                  selectedOption={states}
                  setSelectedOption={(value) => {
                    setState(value);
                    setImportantLink((prevState) => ({
                      ...prevState,
                      state_id: value,
                    }));
                  }}
                />
                {importantLinkError.state_idError && (
                  <span className={styles.errorValidation}>
                    {importantLinkError.state_idError}
                  </span>
                )}
              </div>
            </div>

            <div controlId="formTitle">
              <label className={styles.label_fnt_webinar} htmlFor="title">
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter title"
                name="title"
                value={ImportantLink.title}
                onChange={handleInputChange}
                className={importantLinkError.titleError ? styles.error_input__ : styles.form_input_title_input}
                maxLength={122}
              />
            </div>

            {importantLinkError.titleError && (
              <span className={styles.errorValidation}>
                {importantLinkError.titleError}
              </span>
            )}

            <div controlId="formTitle">
              <label className={styles.label_fnt_webinar} htmlFor="title">
                Link
              </label>
              <input
                id="link"
                type={"text" || "url"}
                placeholder="Enter Link"
                name="link"
                value={ImportantLink.link}
                onChange={handleInputChange}
                className={importantLinkError.linkError ? styles.error_input__ : styles.form_input_title_input}
              />
            </div>

            {importantLinkError.linkError && (
              <span className={styles.errorValidation}>
                {importantLinkError.linkError}
              </span>
            )}

            <div controlId="formTitle">
              <label className={styles.label_fnt_webinar} htmlFor="tag">
                Tag
              </label>
              <input
                id="text"
                type={"text"}
                placeholder="Enter Tag"
                name="tag"
                value={ImportantLink.tag}
                onChange={handleInputChange}
                className={importantLinkError.tagError ? styles.error_input__ : styles.form_input_title_input}
              />
            </div>

            {importantLinkError.tagError && (
              <span className={styles.errorValidation}>
                {importantLinkError.tagError}
              </span>
            )}

            <div className={styles.webinar_input_half}>
              <div controlId="formStartDate">
                <label
                  className={styles.label_fnt_webinar}
                  htmlFor="ConductedDate"
                >
                  Event Start
                </label>
                <input
                  id="event_start"
                  type="date"
                  name="event_start"
                  value={ImportantLink.event_start}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={importantLinkError.event_startError ? styles.error_input__ : styles.form_input_title_input_half}
                />
                {importantLinkError.event_startError && (
                  <span className={styles.errorValidation}>
                    {importantLinkError.event_startError}
                  </span>
                )}
              </div>

              <div controlId="formStartDate">
                <label className={styles.label_fnt_webinar} htmlFor="event_end">
                  Event End
                </label>
                <input
                  id="event_end"
                  type="date"
                  name="event_end"
                  value={ImportantLink.event_end}
                  min={
                    new Date(Date.now() + 86400000).toISOString().split("T")[0]
                  }
                  onChange={handleInputChange}
                  className={importantLinkError.event_endError ? styles.error_input__ : styles.form_input_title_input_half}
                />
                {importantLinkError.event_endError && (
                  <span className={styles.errorValidation}>
                    {importantLinkError.event_endError}
                  </span>
                )}
              </div>
            </div>

            <button type="submit" className="mt-4">
              {applicationData?.title
                ? update
                  ? "Update Important Link"
                  : "Update Community Link"
                : page
                ? "Add Important Link"
                : "Add Community Link"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddImportanLinkcommon;
