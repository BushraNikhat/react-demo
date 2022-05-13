
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { AddNewUSer } from "../redux/action"
import { useDispatch } from 'react-redux'
import { validateEmail, validateNumber } from '../utils/common'
import DatePicker from "react-datepicker"
import { toast } from 'react-toastify'

const UserCreation = () => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contact_no: null,
    date_of_birth: null,
    address: "",
    business_name: "",
    business_branches_attributes: {
      0: {
        area_name: "",
        contact_no: ""
      }
    }
  })
  const [isEmailCorrect, setIsEmailCorrect] = useState(true);
  const [isNumberCorect, setNumberCorrect] = useState(true)

  const handleUserDetail = (value, name) => {
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // adding new branch
  const addBranchField = () => {
    setUserData((prev) => ({
      ...prev,
      business_branches_attributes: {
        ...userData.business_branches_attributes,
        [`${Object.keys(userData.business_branches_attributes).length}`]: {
          area_name: "",
          contact_no: ""
        }
      }
    }))
  }

  // delete exisisting branch
  const deleteExistingBranchField = (userData, index) => {
    const newBranch = delete userData.business_branches_attributes[index]
    setUserData((prev) => ({
      ...prev,
      business_branches_attributes: {
        ...userData.business_branches_attributes
      }
    }))
  }

  const createNewUser = (event) => {
    event.preventDefault()
    const { name, email, contact_no, date_of_birth, address, business_name } = userData
    if (name === "", email === "", contact_no === "", date_of_birth === "", address === "", business_name === "") {
      console.log("All the fields are mandatory")
    } else {
      if (isEmailCorrect && isNumberCorect) {
        dispatch(AddNewUSer(userData))
      } else {
        toast.warning("please enter correct email")
      }
    }
  }

  return (
    <>
      <Row className='text-light'>
        <Col lg="12">
          <Row>
            <Col lg="6" className='mx-auto mt-3 bg-info p-4 rounded shadow-lg'>
              <Row >
                <h3 className='text-center'>Create User</h3>
              </Row>
              <Form className=' mx-auto' onSubmit={(event) => createNewUser(event, userData)}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={userData.name} onChange={(event) => handleUserDetail(event.target.value, "name")} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={userData.email} onChange={(event) => handleUserDetail(event.target.value, "email")} required onBlur={(event) =>
                    setIsEmailCorrect(validateEmail(event.target.value))
                  } />
                  <Form.Control.Feedback type={isEmailCorrect ? `invalid` : ""} className="text-danger">
                    Invalid Email
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Contact Detail</Form.Label>
                  <Form.Control type="number" name="contact_no" value={userData.contact_no} onChange={(event) => handleUserDetail(event.target.value, "contact_no")} onBlur={(event) =>
                    setNumberCorrect(validateNumber(event.target.value))
                  }
                    required />
                  <Form.Control.Feedback type={isNumberCorect ? `invalid` : ""} className="text-danger">
                    Invalid number
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>D.O.B</Form.Label>
                  <DatePicker selected={userData.date_of_birth} onChange={(date) => handleUserDetail(date, "date_of_birth")} />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" name="address" value={userData.address} onChange={(event) => handleUserDetail(event.target.value, "address")} required />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Bussiness Name</Form.Label>
                  <Form.Control type="text" name="business_name" value={userData.business_name} onChange={(event) => handleUserDetail(event.target.value, "business_name")} required />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Bussiness Branches</Form.Label>
                  {
                    Object.keys(userData.business_branches_attributes).map((branch, index) => {
                      return <Row className="mb-2 mx-auto">
                        <Col >
                          <Form.Control type="text" placeholder='Enter the location' name="area_name" value={userData.business_branches_attributes.area_name} required />
                        </Col>
                        <Col >
                          <Form.Control type="text" placeholder='Enter the contact detail' name="contact_no" value={userData.business_branches_attributes.contact_no} required />
                        </Col>
                        {
                          (Object.keys(userData.business_branches_attributes).length !== 1) && <Col lg="2">
                            <Button onClick={() => deleteExistingBranchField(userData, index)}>-</Button>
                          </Col>
                        }
                      </Row>
                    })
                  }
                  <Row>
                    <Col>
                      <Button onClick={addBranchField}>+</Button>
                    </Col>
                  </Row>
                </Form.Group>
                <Button variant="info" type="submit" className='shadow-lg'>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default UserCreation