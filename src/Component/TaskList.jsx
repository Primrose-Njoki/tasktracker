import React from 'react'
import TaskItem from "./TaskItem";
import styles from './TaskList.module.css'

const TaskList = ({ tasks, setTasks }) => {
  const editTask = (id, newText) => {
   
    
    fetch(`http://localhost:4005/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newText })
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTasks(tasks.map(task => 
          task.id === id ? updatedTask : task
        ));
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:4005/tasks/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
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
      })
      .catch(error => {
        console.error('Error toggling task:', error);
      });
  };

  return (
    <div className={styles.container} >
      {tasks.length > 0 ? (
        <ul className={styles.taskList} >
          {tasks.map(task => (
            <TaskItem
              key={`task-${task.id}`}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleComplete}
              onEdit={editTask}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.emptyText}>
          No tasks found. Add a new task above!
        </p>
      )}
    </div>
  );
};

export default TaskList;