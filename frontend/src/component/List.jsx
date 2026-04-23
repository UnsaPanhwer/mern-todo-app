import { Fragment, useEffect, useState } from "react"
import '../style/list.css'
import { Link } from "react-router-dom";

 export default function List(){

  const [listdata, setListData] = useState([]);
    const [selectTask, setSelectTask] = useState([]);

useEffect(()=>{
    getlistData();
      },[])

    const getlistData = async () => {
    let list = await fetch("http://localhost:3400/tasks",{
        credentials: 'include'
    });
    list = await list.json();

    if(list.success){
        setListData(list.result);
    } else{
        alert("Try after sometime")
    }
}

  const deleteTask = async (id) => {
     let item = await fetch("http://localhost:3400/delete/" + id, {
        method: "DELETE", credentials:"include"});

    item = await item.json();

    if(item.success){
        getlistData();
    }else{
        alert("Try after sometime")
    }
 }
  const selectAll=(event)=>{
 if(event.target.checked){
    let items = listdata.map((item)=>item._id)
        setSelectTask(items)
            } else{
    setSelectTask([])
  }
        }
   const selectSingleItem=(id)=>{
 if(selectTask.includes(id)){
    let items =  selectTask.filter((item)=>item!=id)
    setSelectTask([items])
 }else{
    setSelectTask([...selectTask, id])
 }
   }

const deleteMultiple = async () => {
    let result = await fetch("http://localhost:3400/delete-multiple", {
        credentials:"include",
        method: "DELETE" ,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(selectTask)
    });

    result = await result.json();

    if(result.success){
        setSelectTask([]);
        getlistData();
    } else{
        alert("Try after sometime")
    }
}
 return(
   <div>
    <h1>To Do List</h1>
  <button onClick={deleteMultiple} className="delete-item delete-multiple">Delete</button>
    <ul className="task-list">
        
    <li  className="list-header"><input onChange={selectAll} type="checkbox" /></li>
     <li className="list-header">S.No</li>
 <li className="list-header">Title</li>
    <li className="list-header">Description</li>
        <li className="list-header">Action</li>
        {
            listdata && listdata.map((item,index)=>(
        <Fragment key={item._id}>
     <li className="list-item"> <input checked={selectTask.includes(item._id)} onChange={() =>selectSingleItem(item._id)} type="checkbox" /></li>
         <li className="list-item">{index+1}</li>
         <li className="list-item">{item.title}</li>
              <li className="list-item">{item.description}</li>
          <li className="list-item">
          <button onClick={()=>deleteTask(item._id)} className="delete-item">  Delete</button>

             <Link to={"update/" + item._id} className="update-item"> Update </Link>
                    </li>
                </Fragment>
            ))
        }

    </ul>
   </div>
)
}