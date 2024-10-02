// import { json, response } from "express";
import { useState } from "react";

const TaskForm = () => {

    const [task, setTask] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault();

       if(task){
        const apiUrl = 'https://task-manager-back-end-hrfw.onrender.com/tasks'

        const requestObject = {
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                title: task
            })
        }
        fetch(apiUrl, requestObject)
        .then((response)=>{
            if(response.ok){
                return response.json()
            }else{
                throw new Error('failed to add task')
            }
        })
        .then((data)=>{
            if(data){
                alert('task added')
                setTask('')
            }else{
                alert('Adding task failed')
            }
        })

       }else{
        alert('Task field cannot be empty')
       }

    }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={task} placeholder="Enter a Task" onChange={e => setTask(e.target.value) } />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
