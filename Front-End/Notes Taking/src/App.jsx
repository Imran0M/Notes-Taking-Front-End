import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddNotes from './pages/AddNotes'
import EditNotes from './pages/EditNotes'

function App() {
  const [userNote, setUserNote] = useState('')
var xAuth = localStorage.getItem('token')
  return (
    <> 
     <Routes>
      <Route exact path='/' element={<Signup/>}></Route>
      <Route  path='/login' element={<Login/>}></Route>
      <Route  path='/dashboard' element={  <Dashboard userNote={userNote} setUserNote={setUserNote}/>  }></Route>
      <Route  path='/addnotes' element={ xAuth ? <AddNotes userNote={userNote} setUserNote={setUserNote} /> : <Navigate to='/login'></Navigate>}></Route>
      <Route  path='/editnotes/:id' element={  xAuth ?<EditNotes userNote={userNote} setUserNote={setUserNote}/> : <Navigate to='/login'></Navigate>}></Route>
     </Routes>
    </>
  )
}

export default App
