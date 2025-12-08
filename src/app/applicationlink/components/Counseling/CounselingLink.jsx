// import React from "react";
// import styles from "./councelingLink.module.css";
// import { MdAddLink } from "react-icons/md";
// import { useGetcouncelingLinkQuery } from "../../../../lib/services/councelinglink";
// import { toast } from "react-toastify";
// import { useState } from "react";
// import { useEffect } from "react";
// import LoadingDots from "../../../../components/LoadingDots";
// import CouncelingTable from "../counceling/councelingTable/councelingtable";
// import AddApplicationCommon from "../Common/AddComponent";
// import CommonButton from "../Common/Button/CommonButton";

// const Councelinglink = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(1);
//   const {
//     data: Councelinglinkdata,
//     error: CouncelingError,
//     isLoading,
//     refetch,
//   } = useGetcouncelingLinkQuery({
//     limit: limit,
//     page: page,
//   });

//   if (isLoading) {
//     return <LoadingDots />;
//   }
//   return (
//     <>
//       <section className={styles.container}>
//         <div className={styles.application_link_header_container}>
//           <CommonButton
//             text={"Add Counseling Link"}
//             onClick={() => setIsModalOpen(true)}
//           />
//         </div>
//         {Councelinglinkdata?.data?.length == 0 || CouncelingError ? (
//           <div className={styles.addwebinar_no_data_found}>
//             <p className={styles.addwebinar_no_data_found_fnt}>
//               No Data Found Please Add Counceling Link
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className={styles.table_scroll_container}>
//               <table className={styles.table}>
//                 <thead className={styles.table_head}>
//                   <tr>
//                     <th>Sl no</th>
//                     <th>Title</th>
//                     <th>Counseling Link</th>
//                     <th>State</th>
//                     <th>Degree</th>
//                     <th>Event Start Date</th>
//                     <th>Event End Date</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Councelinglinkdata?.data?.map((councelingLink, index) => (
//                     <CouncelingTable
//                       key={councelingLink.id}
//                       index={index}
//                       councelingLinkData={councelingLink}
//                       refetch={refetch}
//                       loading={isLoading}
//                     />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//         <AddApplicationCommon
//           page={false}
//           update={null}
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           refetch={refetch}
//         />
//       </section>
//     </>
//   );
// };

// export default Councelinglink;


"use client";

import React, { useState, useEffect } from "react";
import {
  useGetCounselingLinkQuery,
  useAddCounselingLinkMutation,
  useUpdateCounselingLinkMutation,
  useDeleteCounselingLinkMutation,
  useGetStateCounselingQuery,
} from "../../../../lib/services/counselingLink";
import { toast } from "react-toastify";
import { MdAddLink, MdEdit, MdDelete } from "react-icons/md";
import { Modal, Button, Form, Table, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import CommonButton from "../Common/Button/CommonButton";

const CounsellingLink = () => {
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    state_id: "",
    degree_type_id: "",
    event_start: "",
    event_end: "",
  });

  // RTK Queries
  const { data, isLoading, refetch } = useGetCounselingLinkQuery();
  const { data: stateDegreeData } = useGetStateCounselingQuery();
  const [addCounsellingLink] = useAddCounselingLinkMutation();
  const [updateCounsellingLink] = useUpdateCounselingLinkMutation();
  const [deleteCounsellingLink] = useDeleteCounselingLinkMutation();

  const [stateOptions, setStateOptions] = useState([]);
  const [degreeOptions, setDegreeOptions] = useState([]);

  // Populate dropdown data
  useEffect(() => {
    if (stateDegreeData?.data) {
      setStateOptions(stateDegreeData.data.states || []);
      setDegreeOptions(stateDegreeData.data.degreeTypes || []);
    }
  }, [stateDegreeData]);

  // Handle open modal (edit/add)
  const handleShow = (data = null) => {
    if (data) {
      setEditData(data);
      setFormData({
        title: data.title,
        link: data.link,
        state_id: data.StateId || "",
        degree_type_id: data.DegreeTypeId || "",
        event_start: data.event_start?.split(" ")[0] || "",
        event_end: data.event_end?.split(" ")[0] || "",
      });
    } else {
      setEditData(null);
      setFormData({
        title: "",
        link: "",
        state_id: "",
        degree_type_id: "",
        event_start: "",
        event_end: "",
      });
    }
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setEditData(null);
    setFormData({
      title: "",
      link: "",
      state_id: "",
      degree_type_id: "",
      event_start: "",
      event_end: "",
    });
  };

  // Add / Update submission
  const handleSubmit = async (e) => {
    console.log("formdata ", formData)
    e.preventDefault();
    if (
      !formData.title ||
      !formData.link ||
      !formData.state_id ||
      !formData.degree_type_id
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      if (editData) {
        await updateCounsellingLink({
          id: editData.id,
          updateCounseling: formData,
        }).unwrap();
        toast.success("Counselling link updated successfully");
      } else {
        await addCounsellingLink(formData).unwrap();
        toast.success("Counselling link added successfully");
      }

      handleClose();
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the counselling link.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteCounsellingLink(id).unwrap();

      toast.success("Counselling link deleted successfully");

      await refetch();
      // window.location.reload();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete counselling link");
    }
  };

  return (
    <div className="p-4 bg-light min-vh-100">
      {/* Header */}
      <div className="d-flex justify-content-end align-items-center mb-4">
        <CommonButton onClick={() => handleShow()} text={"Add Counselling Link"} />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : data?.data?.length ? (
        <Table bordered hover responsive className="bg-white shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Link</th>
              <th>State</th>
              <th>Degree</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.title}</td>
                <td>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.link}
                  </a>
                </td>
                <td>{item.State?.name || item.state_id || "-"}</td>
                <td>{item.DegreeType?.name || item.degree_type_id || "-"}</td>
                <td>{item.event_start?.split("T")[0] || "-"}</td>
                <td>{item.event_end?.split("T")[0] || "-"}</td>
                <td className="text-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShow(item)}
                  >
                    <MdEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <MdDelete />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center text-muted mt-5">
          No Counselling Links Found
        </p>
      )}

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editData ? "Edit Counselling Link" : "Add Counselling Link"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter valid link"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
              />
            </Form.Group>

            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Label>State</Form.Label>
                <Form.Select
                  value={formData.state_id}
                  onChange={(e) =>
                    setFormData({ ...formData, state_id: e.target.value })
                  }
                >
                  <option value="">Select State</option>
                  {stateOptions.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>Degree Type</Form.Label>
                <Form.Select
                  value={formData.degree_type_id}
                  onChange={(e) =>
                    setFormData({ ...formData, degree_type_id: e.target.value })
                  }
                >
                  <option value="">Select Degree Type</option>
                  {degreeOptions.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Label>Event Start</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.event_start}
                  onChange={(e) =>
                    setFormData({ ...formData, event_start: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label>Event End</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.event_end}
                  onChange={(e) =>
                    setFormData({ ...formData, event_end: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="text-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editData ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CounsellingLink;
