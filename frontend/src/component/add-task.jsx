import { useState } from 'react'
import '../style/addtask.css'
import { useNavigate } from 'react-router-dom';


function AddTask(){
    const [taskdata,setTaskData] = useState({});
    const navigate= useNavigate()
    const handleTask = async ()=>{
  let result = await fetch("http://localhost:3400/add-task",{
    method: 'POST',
    body: JSON.stringify(taskdata),
    credentials:"include",
    headers:{
       'Content-Type':"application/json"
    }
  })
  result= await result.json()
  if(result.success){
    navigate("/")
    console.log("New Data stored");
    
  } else{
    alert("Try after sometime")
  }
    }
    return(
        <div className="container">
            <h1>Add New Task</h1>
            
            <label htmlFor="">Title</label>
            <input onChange={(event)=> setTaskData({...taskdata,title:event.target.value})} type="text" name="title" placeholder="Enter task title" />
            <label htmlFor="">Description</label>
            <textarea  onChange={(event)=> setTaskData({...taskdata,description:event.target.value})} rows={4} name="Description"  placeholder="Enter task description" id=""></textarea>
            <button onClick={handleTask} className="submit">Add New Task</button>
      
        </div>
    )
}
export default AddTask