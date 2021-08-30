import Task from './Task'

const Tasks=({tasks, onDelete, onUpdate})=>{
	return (
		<>
		{tasks.map((task)=>(
			<Task key={task.id} 
			task={task} 
			onDelete={onDelete}
			onUpdate={onUpdate}/>)
		)}
		</>
	)
}

export default Tasks