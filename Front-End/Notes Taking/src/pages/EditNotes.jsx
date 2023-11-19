import React, { useEffect, useState } from 'react'
import Base from './Base'
import { useParams } from 'react-router-dom'
import { Button, FloatingLabel, Form } from 'react-bootstrap'

const EditNotes=({userNote, setUserNote})=> {
    const [title, setTitle]= useState('')
    const [content, setContent]= useState('')
    const [err, setErr]= useState('')
    const [response, setResponse]= useState('')
    const {id}= useParams()

    useEffect(()=>{
      // console.log(userNote)
      const data = userNote.find((data)=> data._id === id)
      if(data){
        setTitle(data.title)
        setContent(data.notes)
      }
      const ticket = localStorage.getItem('token')
      if (!ticket) {
        navigate('/login')
      }
    },[id, userNote])

   
    const editNotes = async()=>{
      const note=({
        title,
        notes:content,
      })
      const res= await fetch(`http://localhost:3000/api/notes/update/${id}`,{
        method: 'PUT',
        body: JSON.stringify(note),
        headers:{
          "content-type": "application/json",
          'x-auth-token': localStorage.getItem('token')
        }
      })
      const data = await res.json()
     if(data){
      const editableNotes = userNote?.findIndex((data)=> data._id === id)
      userNote[editableNotes]= data.data;
      await setUserNote([...userNote]);
     }else{
      setErr(data.error)
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
          <Form.Control type="text" required placeholder="Your Notes" onChange={(e) => { setContent(e.target.value) }} value={content} />
        </FloatingLabel>
        <Button onClick={editNotes} variant="dark">Update</Button>
      </div>
      </Base>
    )
  }

export default EditNotes