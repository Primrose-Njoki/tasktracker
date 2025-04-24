import { useEffect, useState } from 'react';
import TaskList from "./Component/TaskList";
import AddTask from "./Component/AddTask";
import Header from "./Component/Header";


function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:4005/tasks');
        
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
        alert(`Cannot connect to server: ${err.message}\n\nPlease ensure:
1. JSON Server is running (port 4005)
2. No other application is using this port
3. You have network connectivity`);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <Header />
      
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <>
          <AddTask setTasks={setTasks} />
          <TaskList tasks={tasks} setTasks={setTasks} />
        </>
      )}
    </div>
  );
}

export default App;