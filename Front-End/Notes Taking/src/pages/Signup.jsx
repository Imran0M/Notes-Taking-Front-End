import { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate } from 'react-router-dom';
import notesTaking from '../assets/no-projects.png';
import { toast, ToastContainer } from 'react-toastify';



function Signup() {
  const navigate = useNavigate()
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [response, setResponse] = useState('')

  const handleSignUp = async () => {
    const payload = ({
      username,
      email,
      password,
    })

    const response = await fetch('https://notestaking-backend.onrender.com/api/user/signup', {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json"
      },
    })

    const data = await response.json()
    if (data.error) {
      toast.error(data.error)
    } else {
      toast.success(data.message)
    }
    setUserName('')
    setEmail('')
    setPassword('')
  }


  return (
    <div>
      <Row>
        <Col> <div className='bg'>
          <img className="notes-taking_image" src={notesTaking} alt="notes" />
        </div> </Col>
        <Col><div className='form'>
          {err ? <p className='danger'>{err}</p> : ''}
          {response ? <p className='danger'>{response}</p> : ''}
          <h3>Sign Up</h3>
          <FloatingLabel
            controlId="floatingname"
            label="User Name"
            className="mb-3 input"
          >
            <Form.Control type="text" placeholder="User Name" onChange={(e) => { setUserName(e.target.value) }} value={username} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3 input"
          >
            <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 input">
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </FloatingLabel>
          <Button onClick={handleSignUp} variant="dark">Signup</Button>
          <p>Already have an account?<button className='button' onClick={() => { navigate('/login') }}>Login</button> </p>
        </div></Col>
        <ToastContainer/>
      </Row>




    </div>

  )
}


export default Signup