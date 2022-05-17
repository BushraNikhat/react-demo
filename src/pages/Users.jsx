import React, { useEffect, useState } from 'react'
import { Col, Row, Table, Button, Modal, Spinner } from 'react-bootstrap'
import { fetchUser } from '../redux/action'
import { useDispatch, useSelector } from 'react-redux'
import EditModal from '../components/EditModal'
import axios from 'axios'
import DeleteModal from '../components/DeleteModal'



const Users = () => {
  const userData = useSelector((state) => state.UserReducer)
  const [editModal, setEditModal] = useState({
    isModalOpen: false,
    user: {
      name: "",
      email: "",
      contact_no: "",
      date_of_birth: null,
      address: "",
      business_name: ""
    }
  })
  const [deleteModal, setDeleteModal] = useState({
    isModalOpen: false,
    modalId: 0
  })

  const dispatch = useDispatch()
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    dispatch(fetchUser())
  }, [refetch])

  return (
    <>
      {
        editModal.isModalOpen && <EditModal editModal={editModal} setEditModal={setEditModal} refetch={refetch} setRefetch={setRefetch} />
      }
      {
        deleteModal.isModalOpen && <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} refetch={refetch} setRefetch={setRefetch} />
      }
      <Row className='text-light'>
        <Col lg="12">
          {
            userData === "loading" ? <Col lg="10" className='text-center mt-5'><Spinner animation="border" variant="primary" /> </Col>
              : (Array.isArray(userData)) ?
                <Row>
                  <Col lg="10" className='mx-auto mt-3  p-4 rounded shadow-lg'>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>D.O.B</th>
                          <th>Contact</th>
                          <th>Address</th>
                          <th>Business_name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          userData.map((user, index) => {
                            return <tr>
                              <td>{index + 1}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.date_of_birth}</td>
                              <td>{user.contact_no}</td>
                              <td>{user.address}</td>
                              <td>{user.business_name}</td>
                              <td className='text-center'>
                                <Button className='me-2' onClick={() => setEditModal((prev) => ({ isModalOpen: true, user: user }))}>Edit</Button>
                                <Button onClick={() => setDeleteModal((prev) => ({ isModalOpen: true, modalId: user.id }))}>Delete</Button>
                              </td>
                            </tr>
                          })


                        }
                      </tbody>
                    </Table>
                  </Col>
                </Row> : <><div className='text-dark text-center'>Something went wrong</div></>
          }
        </Col>
      </Row>

    </>
  )
}

export default Users