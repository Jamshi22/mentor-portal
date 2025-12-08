import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useGetApplicationlinkstatequeryQuery } from "../../../../lib/services/applicationLink";
import {
  useAddExpertVideoMutation,
  useUpdateExpertVideoMutation,
} from "../../../../lib/services/externalLink";
import SingleSelectDropdown from "../../../../components/SingleSelectDropdown";
import { toast } from "react-toastify";
import styles from "./AddExpert.module.css";
import LoadingDots from "../../../../components/LoadingDots";

const AddUpdateExpertLink = ({
  isOpen,
  onClose,
  refetch,
  create,
  ExpertLinkData,
}) => {
  const [addExpertVideo] = useAddExpertVideoMutation();
  const [updateExpertVideo, { isLoading }] = useUpdateExpertVideoMutation();

  const [stateOptions, setStateOptions] = useState([]);
  const [degreeTypeOptions, setDegreeTypeOptions] = useState([]);

  const [ExpertLink, setExpertLink] = useState({
    title: "",
    description: "",
    link: "",
    degree_type_id: "",
  });

  const [errors, setErrors] = useState({});

  const { data: statedegreedata } = useGetApplicationlinkstatequeryQuery();

  useEffect(() => {
    if (statedegreedata) {
      setStateOptions(statedegreedata?.data?.states || []);
      setDegreeTypeOptions(statedegreedata?.data?.degreeTypes || []);
    }

    if (!create && ExpertLinkData) {
      setExpertLink({
        title: ExpertLinkData.title || "",
        description: ExpertLinkData.description || "",
        link: ExpertLinkData.link || "",
        degree_type_id: ExpertLinkData.degree_type_id || "",
        state_id: ExpertLinkData.state_id || "",
      });
    }
  }, [statedegreedata, ExpertLinkData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpertLink((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!ExpertLink.title) newErrors.title = "*Title is required";
    if (!ExpertLink.description)
      newErrors.description = "*Description is required";
    if (!ExpertLink.link) newErrors.link = "*Link is required";
    if (!ExpertLink.degree_type_id)
      newErrors.degree_type_id = "*Degree type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let response;
      if (create) {
        response = await addExpertVideo(ExpertLink).unwrap();

        toast.success("Expert Link Added Successfully");
      } else {
        response = await updateExpertVideo({
          id: ExpertLinkData.id,
          updatesexpertvideo: ExpertLink,
        }).unwrap();
        toast.success("Expert Link Updated Successfully");
      }

      refetch();
      onClose();
      setExpertLink({
        title: "",
        description: "",
        link: "",
        degree_type_id: "",
        state_id: "",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  if (isLoading) return <LoadingDots />;

  return (
    <Modal show={isOpen} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton className={styles.modal_header__}>
        <Modal.Title className={styles.title}>
          {create ? "Add Expert Link" : "Update Expert Link"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.recorded_webinar_body}>
        <form onSubmit={handleFormSubmit} className={styles.upcoming_form}>
          <div>
            <label className={styles.label_fnt_webinar}>Degree Type</label>
            <SingleSelectDropdown
              placeholder="Select Degree"
              webinarstyle={true}
              options={degreeTypeOptions}
              selectedOption={ExpertLink.degree_type_id}
              setSelectedOption={(value) =>
                setExpertLink((prev) => ({ ...prev, degree_type_id: value }))
              }
            />
            {errors.degree_type_id && (
              <span className={styles.errorValidation}>
                {errors.degree_type_id}
              </span>
            )}
          </div>

          <div>
            <label className={styles.label_fnt_webinar}>Title</label>
            <input
              type="text"
              name="title"
              value={ExpertLink.title}
              onChange={handleInputChange}
              className={styles.form_input_title_input}
              placeholder="Enter Title"
            />
            {errors.title && (
              <span className={styles.errorValidation}>{errors.title}</span>
            )}
          </div>

          <div>
            <label className={styles.label_fnt_webinar}>Description</label>
            <textarea
              typeof="text"
              rows={5}
              cols={5}
              name="description"
              value={ExpertLink.description}
              onChange={handleInputChange}
              className={styles.form_input_title_input}
              placeholder="Enter Description"
            />
            {errors.description && (
              <span className={styles.errorValidation}>
                {errors.description}
              </span>
            )}
          </div>

          <div>
            <label className={styles.label_fnt_webinar}>Link</label>
            <input
              type="text"
              name="link"
              value={ExpertLink.link}
              onChange={handleInputChange}
              className={styles.form_input_title_input}
              placeholder="Enter Link"
            />
            {errors.link && (
              <span className={styles.errorValidation}>{errors.link}</span>
            )}
          </div>

          <button type="submit" className="mt-4">
            {create ? "Add Expert Link" : "Update Expert Link"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUpdateExpertLink;
