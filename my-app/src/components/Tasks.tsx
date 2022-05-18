import React from 'react'
import { ITask } from './Column'
import './Tasks.css'

type Props = {
  tasksList: ITask[];
}

const Tasks = ({tasksList}: Props) => {
  return (
    <div className='tasks-container'>
      {tasksList && tasksList.map((task) => {
        return (
          <div key={task.id} className='task'>
            {task.title}
          </div>
        )
      })}
    </div>
  )
}

export default Tasks