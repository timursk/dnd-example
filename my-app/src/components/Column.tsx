import React, { useState } from 'react'
import { IColumn } from './Board';
import './Column.css';
import Tasks from './Tasks';

export type ITask = {
  id: number;
  title: string;
}

type Props = {
  item: IColumn
}

let id = 0;

const Column = ({item}: Props) => {
  const [tasksList, setTasksList] = useState<ITask[]>([]);

  const handleAdd = () => {
    const title = prompt('enter title') || '';
    const task = {
      id: ++id,
      title,
    }
    setTasksList([...tasksList, task]);

  }

  return (
    <div className="column">
      <h2>{item.title}</h2>
      <button onClick={handleAdd}>add task</button>

      <Tasks tasksList={tasksList} />
    </div>
  )
}

export default Column