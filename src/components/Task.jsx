import SearchTask from "./SearchTask";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const Task = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm/>
      <br />
      <SearchTask/>
      <TaskList/>
    </div>
  );
}

export default Task;
