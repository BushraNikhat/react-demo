import React, { useState } from 'react'
import { Button, Form, Modal, Row } from 'react-bootstrap'
import { UpdateReducer } from '../redux/reducer'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../redux/action'
import DatePicker from "react-datepicker"
import { validateEmail, validateNumber } from '../utils/common'
import { toast } from 'react-toastify'

const EditModal = ({ editModal, setEditModal, refetch, setRefetch }) => {
  const dispatch = useDispatch()
  const [isEmailCorrect, setIsEmailCorrect] = useState(true);
  const [isNumberCorect, setNumberCorrect] = useState(true)

  const handleEditData = (value, name) => {
    setEditModal((prev) => ({
      ...prev,
      user: {
        ...editModal.user,
        [name]: value
      }
    }))
  }

  const EditData = (event) => {
    event.preventDefault()
    if (isEmailCorrect && isNumberCorect) {
      dispatch(updateUser(editModal.user))
    } else {
      toast.warning("please enter correct email")
    }
    setEditModal(() => ({ isModalOpen: false, user: {} }))
    setRefetch(!refetch)
  }


  return (
    <>
      <Modal show={editModal.isModalOpen} onHide={() => setEditModal(() => ({ isModalOpen: false, user: {} }))}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={EditData}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={editModal.user.name} onChange={(event) => handleEditData(event.target.value, "name")} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" name="email" value={editModal.user.email} onChange={(event) => handleEditData(event.target.value, "email")} onBlur={(event) =>
                setIsEmailCorrect(validateEmail(event.target.value))} readOnly />
              <Form.Control.Feedback type={isEmailCorrect ? `invalid` : ""} className="text-danger">
                Invalid Email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="number" name="contact_no" value={editModal.user.contact_no} onChange={(event) => handleEditData(event.target.value, "contact_no")} required onBlur={(event) =>
                setNumberCorrect(validateNumber(event.target.value))
              } />
              <Form.Control.Feedback type={isNumberCorect ? `invalid` : ""} className="text-danger">
                Invalid number
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date Of Birth</Form.Label>
              <DatePicker selected={new Date(editModal.user.date_of_birth)} onChange={(date) => handleEditData(date, "date_of_birth")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" value={editModal.user.address} onChange={(event) => handleEditData(event.target.value, "address")} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Business Name</Form.Label>
              <Form.Control type="text" name="business_name" value={editModal.user.business_name} onChange={(event) => handleEditData(event.target.value, "business_name")} required />
            </Form.Group>
            <Button variant='danger' type="button" className='me-2' onClick={() => setEditModal(() => ({ isModalOpen: false, user: {} }))}>Close</Button>
            <Button variant='primary' type="submit">Edit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditModal