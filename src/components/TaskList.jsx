import { useEffect } from "react";
import { useState } from "react";

const TaskList = () => {

    const [tasks, setTasks] = useState(null)

    const fetchTasks = () =>{
        let apiUrl = 'https://task-manager-back-end-hrfw.onrender.com/tasks'
        
        fetch(apiUrl)
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            console.log(data)
            setTasks(data)
        })
    }
    useEffect(()=>{
        fetchTasks()
    },[])
  return (
    <div>
        <h2>Tasks Below</h2>

        {
            tasks !== null ? (
                tasks.map((item, index)=>{
                    return <li key={index}>{item.title}</li>
                })
            ):
            <h3>No Tasks Available</h3>
        }
      
    </div>
  );
}

export default TaskList;
