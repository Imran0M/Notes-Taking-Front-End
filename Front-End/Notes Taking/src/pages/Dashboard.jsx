import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Base from './Base'
import './Dashboard.css'
import { Button, Row } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


function Dashboard({userNote, setUserNote}) {
  const navigate= useNavigate()
  const [err, setErr] = useState('')
  const [accountName , setAccountName]= useState('')
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://notestaking-backend.onrender.com/api/notes/getnotes', {
        method: "GET",
        headers: {
          "x-auth-token": localStorage.getItem('token')
        }
      })
      const data = await res.json()
      // console.log(data)
      if (data.error) {
        setErr(data.error)
      }else{
        setUserNote(data.data)
        setAccountName(data.data[0].user.username)
        // console.log(data.data[0].user.username)
      }
    }
    fetchData()
    const ticket = localStorage.getItem('token')
      if (!ticket) {
        navigate('/login')
      }
  }, [accountName])
// console.log(err)
  const handleDelete= async(id)=>{
      const res = await fetch(`https://notestaking-backend.onrender.com/api/notes/delete/${id}`,{
        method:'DELETE',
        headers:{
          'content-type':'application/json',
          'x-auth-token':localStorage.getItem('token')
        },
      })
      const data = await res.json()
      const newUserData = userNote.filter((data)=> data._id != id)
      setUserNote(newUserData)
      if(data.messaage){
        toast.success(data.messaage)
      }
  }
  
  return (
    <Base accountName={accountName} >
      {err ? <p className='center'>{err}</p> : ''}
    {userNote &&
    <div  className='dash-bg'>
       <h3 className='name'>Welcome { accountName}!</h3>
    <div className='card-box'>{userNote.map((i)=>(
      <Card className='card' key={i._id}>
        <Row ><p className='date'>created by : { i.date}</p></Row>
        <Row><h4 className='title-heading'>Title</h4></Row>
        <Row><p className='title-value'>{i.title}</p></Row>
        <Row><h4 className='title-heading'>Notes</h4></Row>
        <Row><p>{i.notes}</p></Row>
        <div className='button-container'>
        <Button  className='remove-button' onClick={()=>handleDelete(i._id)}  variant="light">Remove</Button>
        <Button className='delete-button' onClick={() =>navigate(`/editnotes/${i._id}`) } variant="dark">Update</Button>
        </div>
      </Card>
    ))}</div>
    </div>}
    <ToastContainer/>
    </Base>
  )
}

export default Dashboard;
