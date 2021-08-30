import Button from './Button'

const Task=({task, onDelete})=>{
	return(
		<div className={`task ${task.status ? 'status' : ''}`}>
			<h3>{task.name} 
				<Button color='green' 
						text='Delete'
						onClick={()=>onDelete(task.id)} 
				/>
			</h3>
		</div>
		)
}
 export default Task