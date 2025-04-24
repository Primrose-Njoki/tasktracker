
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, setTasks }) => {
  const deleteTask = (id) => {
    fetch(`http://localhost:4005/tasks/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      });
  };

  const toggleComplete = (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    
    fetch(`http://localhost:4005/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: !taskToUpdate.completed })
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTasks(tasks.map(task => 
          task.id === id ? updatedTask : task
        ));
      });
  };

  return (
    <ul>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onDelete={deleteTask} 
          onToggle={toggleComplete}
        />
      ))}
    </ul>
  );
};

export default TaskList;