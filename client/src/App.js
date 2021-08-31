import Header from './components/Header'
import {useState} from 'react'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [tasks, setTasks]= useState([])

  //Add task
  const addTask =(task) =>{
    const id=Math.floor(Math.random()*
    10000) +1
    const newTask={id, ...task}
    setTasks([...tasks, newTask])
  }

  //Delete task
  const deleteTask=(id)=>{
    setTasks(tasks.filter((task) => task.id !==id))
  }

  return (
    <div className="container">
      <Header />
      <AddTask onAdd={addTask}/>
       {tasks.length > 0 ? <Tasks 
        tasks={tasks} 
        onDelete={deleteTask}
        /> :
        'No product to show'}
    </div>
  );
}

export default App;
