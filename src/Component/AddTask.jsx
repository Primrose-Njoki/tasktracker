import { useState } from 'react';

const AddTask = ({ setTasks }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    const newTask = {
      text: taskText,
      completed: false
    };

    // POST to JSON Server
    fetch('http://localhost:4005/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then(res => res.json())
      .then(data => {
        setTasks(prev => [...prev, data]);
        setTaskText('');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;