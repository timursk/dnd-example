import React, { useState } from 'react'
import './Board.css'
import Column from './Column';

export type IColumn = {
  id: number;
  title: string;
}

type Props = {}

let id = 0;
const Board = (props: Props) => {
  const [columns, setColumns] = useState<IColumn[]>([]);
  
  const handleColumnAdd = () => {
    const column = {
      id: ++id,
      title: 'some title',
    }
    setColumns([...columns, column])
  }

  return (
    <div className='boards-container'>
      {columns && columns.map((item) => (
        <Column key={item.id} item={item} />
      ))}
      <button onClick={handleColumnAdd}>add columns</button>
    </div>
  )
}

export default Board