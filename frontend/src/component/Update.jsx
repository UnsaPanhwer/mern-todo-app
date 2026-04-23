import { useEffect, useState } from 'react'
import '../style/addtask.css'
import { useNavigate, useParams } from 'react-router-dom';

function Update(){
    
    const [UpdateTaskData, setUpdateTaskData] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getTask();
    }, []);

     const getTask = async () => {
        let task = await fetch("http://localhost:3400/task/" + id, {
            credentials: "include"
        });

        task = await task.json();

        if (task.success) {
            setUpdateTaskData(task.result);
        }
    }

    const updateTask = async () => {
        console.log("function called",UpdateTaskData);
        
       let task = await fetch("http://localhost:3400/update/" + id, {
        credentials:'include',
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
   body: JSON.stringify({
    title: UpdateTaskData.title,
    description: UpdateTaskData.description
})
});



task = await task.json();
if(task){
    navigate('/')
}
    }

    return(
        <div className="container">
            <h1>Update Task</h1>

            <label>Title</label>
            <input 
                value={UpdateTaskData?.title || ""}
                onChange={(e)=> setUpdateTaskData({...UpdateTaskData, title: e.target.value})}
                type="text"
            />

            <label>Description</label>
            <textarea
                value={UpdateTaskData?.description || ""}
                onChange={(e)=> setUpdateTaskData({...UpdateTaskData, description: e.target.value})}
            />

            <button onClick={updateTask} className="submit">
                Update Task
            </button>
        </div>
    )
}

export default Update