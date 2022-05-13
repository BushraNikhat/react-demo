import { Button, Modal } from 'react-bootstrap'
import React from 'react'
import axios from "axios"
import { toast } from "react-toastify"

const DeleteModal = ({ deleteModal, setDeleteModal, refetch, setRefetch }) => {

  // delete the user
  const deleteUser = async (id) => {
    try {
      const resposne = await axios.delete(`https://stark-tor-97095.herokuapp.com/api/v1/users/${id}`)
      toast.success(resposne)
      setRefetch(!refetch)
      setDeleteModal(() => ({ isModalOpen: false, modalId: 0 }))
    } catch (error) {
      toast.error("something went wrong")
    }
  }

  return (
    <>
      <Modal show={deleteModal.isModalOpen} onHide={() => setDeleteModal(() => ({ isModalOpen: false, modalId: 0 }))}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Modal</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Once the user deleted you will not be able to retrieve.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(() => ({ isModalOpen: false, modalId: 0 }))}>Close</Button>
          <Button variant="danger" onClick={() => deleteUser(deleteModal.modalId)}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteModal