import { useState } from 'react';
import styles from './AddTask.module.css'

const AddTask = ({ setTasks }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    try {
      const response = await fetch('http://localhost:4005/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setTasks(prev => [...prev, data]);
      setTaskText('');
    } catch (error) {
      console.error('Error adding task:', error);
      alert(`Failed to add task: ${error.message}\n\nMake sure:
1. JSON Server is running (port 4005)
2. No CORS issues
3. Network connection is active`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.taskform}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add new task..."
        className={styles.taskInput}
      />
      <button type="submit" className={styles.addButton}>Add Task</button>
    </form>
  );
};

export default AddTask;