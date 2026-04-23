import { useState } from 'react'
import './App.css'
import NavBar from './component/NavBar'
import { Routes, Route } from 'react-router-dom'
import AddTask from './component/add-task'
import Update from './component/Update'
import List from './component/List'
import Signup from './component/Signup'
import Login from './component/Login'
import Protected from './component/protected'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Protected><List /></Protected>} />
        <Route path="/add" element={<Protected><AddTask /></Protected>} />
         <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
 
      <Route path="/update/:id" element={<Update/>} />
      
      </Routes>
    </>
  )
}

export default App