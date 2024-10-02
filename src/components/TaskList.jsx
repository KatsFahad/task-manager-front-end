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
            setTasks(data)
        })
    }
    useEffect(()=>{
        fetchTasks()
    },[])

    // const deleteTask = (deleteitem) =>{
    //     const newTasks = tasks.filter((item)=> item !== deleteitem)
    //     setTasks(newTasks)
    // }
    const deleteTask = async (task) => {
        try {
          const response = await fetch(
            `https://task-manager-back-end-hrfw.onrender.com/tasks/${task.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          if (response.ok) {
            const newTasks = tasks.filter((item) => item.id !== task.id);
            setTasks(newTasks);
            alert("Task deleted successfully");
          } else {
            alert("Failed to delete task");
          }
        } catch (error) {
          console.error("Error deleting task:", error);
          alert("Failed to delete task");
        }
    }
  return (
    <div>
        <h2>Tasks Below</h2>

        {
            tasks !== null ? (
                tasks.map((item, index)=>{
                    return <li key={index}>{item.title}<span><button onClick={()=> deleteTask(item)}>Delete</button></span></li>
                })
            ):
            <h3>No Tasks Available</h3>
        }
      
    </div>
  );
}

export default TaskList;
