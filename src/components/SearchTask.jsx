import { useEffect, useState } from "react"

const SearchTask = () => {
    const [tasks, setTasks] = useState([])
    const [filterTasks, setfilterTasks] = useState([])
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

    const handleFilter = (value) =>{
        const searchTerm = value.toLowerCase();
        if (searchTerm === "") {
          setfilterTasks([]); // Clear filtered tasks when input is cleared
          return;
        }
        const result = tasks.filter((task) =>
          task.title.toLowerCase().includes(searchTerm)
        );
        setfilterTasks(result);

    }
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
      <input type="text" placeholder="Search a task" onChange={e=> handleFilter(e.target.value)} />
      <div className="search-result">
      {filterTasks.length > 0 ? (
          filterTasks.map((task, index) => (
            <h4 key={index}>{task.title}<span><button onClick={()=>deleteTask(task)}>Delete</button></span></h4>
           
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </div>
  );
}

export default SearchTask;
