import {useEffect, useState} from 'react'
import TaskList from "./Components/TaskList"
import AddTask from "./Components/AddTask"
import Header from "./Components/Header"
import TaskItem from "./Components/TaskItem"

function App () {
  const [tasks, setTasks]=useState([])

  useEffect(()=> {
    fetch ('')
    .then (res=>res.json())
    .then(data=> setTasks(data))

  },[])
  return (
    <div>
      <Header/>
      <AddTask  setTasks={setTasks}/>
      <TaskList tasks={tasks} setTasks={setTasks}/>
      

    </div>
    
  )
}
export default App