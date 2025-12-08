import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useEmployedeleteMutation } from "../lib/services/employeeRegister";
import { useCoupondeletedMutation } from "../lib/services/coupon";
import { useState} from "react";

const DeleteModal = ({
  show,
  onHide,
  onDelete,
  employeeDeleteId,
  employeeDeletename,
  couponId,
  couponDelete,
  couponDeleted,
  refetchdata,
  refetchEmployee,
}) => {


  const [employedelete, { isLoading }] = useEmployedeleteMutation();
  const [coupondeleted] = useCoupondeletedMutation();
  const {deletedcoupons,setdeletedcoupons} = useState(false)



  const handleDelete = async () => {
    try {
      if (couponDeleted) {
        toast.dismiss()
        // If deleting a coupon
        const result = await  coupondeleted(couponId).unwrap();
        refetchdata();
          toast.success(result.data.message || 'Coupon Code Deleted Successfully');
      } else {
        toast.dismiss()
        // If deleting an employee
        const result = await employedelete(employeeDeleteId).unwrap()
        toast.success("Employee Deleted Successfully");
        refetchEmployee();
      }
      onHide(false); // Close modal after successful deletion
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("Failed to delete");
    }
  };




  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Do You want to Delete this {couponDeleted ? "Coupon" : "Employee"}-{" "}
            {couponDeleted ? couponDelete : employeeDeletename}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onHide(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              handleDelete(
                couponDeleted ? couponId : employeeDeleteId,
                employeeDeletename
              )
            }
          >
            {isLoading ? "Deleting..." : "Yes, Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
