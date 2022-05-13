import React from 'react'
import { Row, Col } from 'react-bootstrap'
import AppBar from './components/Navbar'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import UserCreation from './pages/UserCreation';
import Users from './pages/Users';

const App = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route exact path="/" element={<UserCreation />}>
        </Route>
        <Route path="/user" element={<Users />}>
        </Route>
      </Routes>
    </>
  )
}

export default App