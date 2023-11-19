import React, { useEffect, useState } from 'react'
import Base from './Base'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function AddNotes() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [err, setErr] = useState('')
  const [response, setResponse] = useState('')
  const navigate = useNavigate()

  const addNotes = async () => {
    const newNote = ({
      title,
      notes: content,
    })
    const res = await fetch(`https://notestaking-backend.onrender.com/api/notes/createnotes`, {
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        "content-type": "application/json",
        'x-auth-token': localStorage.getItem('token')
      }
    })
    const data = await res.json()
    if (data.error) {
      setErr(data.error)
    } else {
      setResponse(data.message)
    }
  }
  return (
    <Base>
      <div className='form'>
        {err ? <p>{err}</p> : ''}
        {response ? <p>{response}</p> : ''}
        <FloatingLabel
          controlId="floatingtitle"
          label="title"
          className="mb-3 input"
        >
          <Form.Control type="text" required placeholder="title" onChange={(e) => { setTitle(e.target.value) }} value={title} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingnotes" label="Your Notes" className="mb-3 input">
          <Form.Control type="text" as="textarea" required placeholder="Your Notes" onChange={(e) => { setContent(e.target.value) }} value={content} />
        </FloatingLabel>
        <Button onClick={addNotes} variant="dark">Add Notes</Button>

      </div>
    </Base>
  )
}

export default AddNotes