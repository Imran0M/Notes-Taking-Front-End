import { Button } from 'react-bootstrap';
import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [response, setResponse] = useState('')

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
      setResponse(data.message)
    } else if (data.error) {
      setErr(data.error)
    }
  }

  return (
    <div className='form'>
      {err ? <p>{err}</p> : ''}
      {response ? <p>{response}</p> : ''}
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
      <Button onClick={handleLogin} variant="dark">Login</Button>
      <p>Register you don't have an account?<button className='button' onClick={() => { navigate('/') }}>Sign Up</button> </p>
    </div>
  )
}

export default Login