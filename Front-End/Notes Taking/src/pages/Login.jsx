// import { Button, Col, Row } from 'react-bootstrap';
// import React, { useState } from 'react'
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom';
// import notesTaking from '../assets/no-projects.png'
// import { toast, ToastContainer } from 'react-toastify';
import {  useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {useNavigate } from 'react-router-dom';
import notesTaking from '../assets/no-projects.png';
import { toast, ToastContainer } from 'react-toastify';

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const payload = ({
      email,
      password,
    })
    const response = await fetch('https://notestaking-backend.onrender.com/api/user/login', {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json"
      },
    })
    const data = await response.json()
    // console.log(data.message)
    if (data.token) {
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } else if (data.message) {
      toast.success(data.message)
    } else if (data.error) {
      toast.error(data.error)
    }
  }
  return (
      <Row>
        <Col><div className='bg'>
        <h2 className='brand-two'>Welcome to DIGI Notes</h2>
          <img className="notes-taking_image" src={notesTaking} alt="notes" />
        </div></Col>
        <Col>
          <div className='form'>
            <h3>Login</h3>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3 input"
            >
              <Form.Control
                type="email"
                required
                placeholder="name@example.com"
                onChange={(e) => { setEmail(e.target.value) }}
                value={email}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3 input">
              <Form.Control
                type="password"
                required
                placeholder="Password"
                onChange={(e) => { setPassword(e.target.value) }}
                value={password} />
            </FloatingLabel>
            <Button  className='button-btn' onClick={handleLogin} variant="dark">Login</Button>
            <p>Register you don't have account <button className='button' onClick={() => { navigate('/') }}>Sign Up</button> </p>
          </div>
        </Col>
        <ToastContainer />
      </Row>
  )
}

export default Login