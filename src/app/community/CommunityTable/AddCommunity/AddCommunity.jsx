import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useGetApplicationlinkstatequeryQuery } from "../../../../lib/services/applicationLink";
import {
  useAddCommunityLinkMutation,
  useUpdateCommunityLinkMutation,
} from "../../../../lib/services/communityLink";
import SingleSelectDropdown from "../../../../components/SingleSelectDropdown";
import { toast } from "react-toastify";
import styles from "./community.module.css";
import LoadingDots from "../../../../components/LoadingDots";

const AddCommunityPage = ({
  isOpen,
  onClose,
  refetch,
  create,
  communityLinkData,
}) => {
  const [addCommunityLink] = useAddCommunityLinkMutation();
  const [updateCommunityLink, { isLoading }] = useUpdateCommunityLinkMutation();

  const [stateOptions, setStateOptions] = useState();
  const [degreeTypeOptions, setDegreeTypeOptions] = useState();

  const [communityLink, setCommunityLink] = useState({
    channel_name: "",
    stateId: "",
    degreeTypeId: "",
    whatsApp_link: "",
    whatsApp_subscribers_count: 0,
    telegram_link: "",
    telegram_subscribers_count: 0,
  });

  const [errors, setErrors] = useState({});

  const { data: statedegreedata } = useGetApplicationlinkstatequeryQuery();

  useEffect(() => {
    if (statedegreedata) {
      setStateOptions(statedegreedata?.data?.states || "");
      setDegreeTypeOptions(statedegreedata?.data?.degreeTypes || "");
    }

    if (!create && communityLinkData) {
      setCommunityLink({
        channel_name: communityLinkData.channel_name || "",
        stateId: communityLinkData.stateId || "",
        degreeTypeId: communityLinkData.degreeTypeId || "",
        whatsApp_link: communityLinkData.whatsApp_link || "",
        whatsApp_subscribers_count:
          communityLinkData.whatsApp_subscribers_count || 0,
        telegram_link: communityLinkData.telegram_link || "",
        telegram_subscribers_count:
          communityLinkData.telegram_subscribers_count || 0,
      });
    }
  }, [statedegreedata, communityLinkData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommunityLink((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!communityLink.channel_name)
      newErrors.channel_name = "*Channel name is required";
    if (!communityLink.stateId) newErrors.stateId = "*State is required";
    if (!communityLink.degreeTypeId)
      newErrors.degreeTypeId = "*Degree type is required";
    if (!communityLink.whatsApp_link)
      newErrors.whatsApp_link = "*WhatsApp link is required";
    if (!communityLink.telegram_link)
      newErrors.telegram_link = "*Telegram link is required";

    if (
      communityLink.whatsApp_subscribers_count === "" ||
      isNaN(communityLink.whatsApp_subscribers_count) ||
      Number(communityLink.whatsApp_subscribers_count) < 0
    ) {
      newErrors.whatsApp_subscribers_count =
        "*WhatsApp subscribers must be a non-negative number";
    }

    if (
      communityLink.telegram_subscribers_count === "" ||
      isNaN(communityLink.telegram_subscribers_count) ||
      Number(communityLink.telegram_subscribers_count) < 0
    ) {
      newErrors.telegram_subscribers_count =
        "*Telegram subscribers must be a non-negative number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (create) {
        const response = await addCommunityLink(communityLink).unwrap();
        if (response) {
          toast.success("Community Link Added Successfully");
        }
      } else {
        const response = await updateCommunityLink({
          id: communityLinkData.id,
          updateCommunityLink: communityLink,
        }).unwrap();

        if (response) {
          toast.success("Community Link Updated Successfully");
        }
      }

      refetch();
      onClose();
      setCommunityLink({
        channel_name: "",
        stateId: "",
        degreeTypeId: "",
        whatsApp_link: "",
        whatsApp_subscribers_count: 0,
        telegram_link: "",
        telegram_subscribers_count: 0,
      });
      setErrors({});
    } catch (error) {
      const errorDetails = error.data?.errors?.[0]?.details || [];
      errorDetails.forEach((item) => {
        toast.error(
          item.message ||
            "Something went wrong while submitting the community link."
        );
      });
    }
  };

  if (isLoading) {
    return <LoadingDots />;
  }

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={styles.modal_header__}>
        <Modal.Title className={styles.title}>
          {create ? "Add Community Link" : "Update Community Link"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.recorded_webinar_body}>
        <form onSubmit={handleFormSubmit} className={styles.upcoming_form}>
          <div className={styles.upcoming_form_webinar_row}>
            <div>
              <label className={styles.label_fnt_webinar}>Degree</label>
              <SingleSelectDropdown
                placeholder="Degree Type"
                webinarstyle={true}
                options={degreeTypeOptions}
                selectedOption={communityLink.degreeTypeId}
                setSelectedOption={(value) =>
                  setCommunityLink((prev) => ({
                    ...prev,
                    degreeTypeId: value,
                  }))
                }
              />
              {errors.degreeTypeId && (
                <span className={styles.errorValidation}>
                  {errors.degreeTypeId}
                </span>
              )}
            </div>

            <div>
              <label className={styles.label_fnt_webinar}>State</label>
              <SingleSelectDropdown
                placeholder="State"
                webinarstyle={true}
                options={stateOptions}
                selectedOption={communityLink.stateId}
                setSelectedOption={(value) =>
                  setCommunityLink((prev) => ({
                    ...prev,
                    stateId: value,
                  }))
                }
              />
              {errors.stateId && (
                <span className={styles.errorValidation}>{errors.stateId}</span>
              )}
            </div>
          </div>

          <div>
            <label className={styles.label_fnt_webinar}>Channel Name</label>
            <input
              type="text"
              name="channel_name"
              value={communityLink.channel_name}
              onChange={handleInputChange}
              className={styles.form_input_title_input}
              placeholder="Enter Channel Name"
            />
            {errors.channel_name && (
              <span className={styles.errorValidation}>
                {errors.channel_name}
              </span>
            )}
          </div>

          <div>
            <label className={styles.label_fnt_webinar}>WhatsApp Link</label>
            <input
              type="text"
              name="whatsApp_link"
              value={communityLink.whatsApp_link}
              onChange={handleInputChange}
              className={styles.form_input_title_input}
              placeholder="Enter WhatsApp Link"
            />
            {errors.whatsApp_link && (
              <span className={styles.errorValidation}>
                {errors.whatsApp_link}
              </span>
            )}
          </div>

          <div>
            <label className={styles.label_fnt_webinar}>
              WhatsApp Subscribers
            </label>
            <input
              type="number"
              name="whatsApp_subscribers_count"
              value={communityLink.whatsApp_subscribers_count}
              onChange={handleInputChange}
              className={styles.form_input_title_input}
            />
            {errors.whatsApp_subscribers_count && (
              <span className={styles.errorValidation}>
                {errors.whatsApp_subscribers_count}
              </span>
            )}
          </div>

          <div>
            <label className={styles.label_fnt_webinar}>Telegram Link</label>
            <input
              type="text"
              name="telegram_link"
              value={communityLink.telegram_link}
              onChange={handleInputChange}
              className={styles.form_input_title_input}
              placeholder="Enter Telegram Link"
            />
            {errors.telegram_link && (
              <span className={styles.errorValidation}>
                {errors.telegram_link}
              </span>
            )}
          </div>

          <div>
            <label className={styles.label_fnt_webinar}>
              Telegram Subscribers
            </label>
            <input
              type="number"
              name="telegram_subscribers_count"
              value={communityLink.telegram_subscribers_count}
              onChange={handleInputChange}
              className={styles.form_input_title_input}
            />
            {errors.telegram_subscribers_count && (
              <span className={styles.errorValidation}>
                {errors.telegram_subscribers_count}
              </span>
            )}
          </div>

          <button type="submit" className="mt-4">
            {create ? "Add Community Link" : "Update Community Link"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCommunityPage;
