import React, { useState } from 'react'
import './Board.css'
import Column from './Column';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export type IColumn = {
  id: number;
  title: string;
}

type Props = {}

let id = 0;

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  //my styles 


  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
  
});

const reorder = (list: IColumn[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Board = (props: Props) => {
  const [columns, setColumns] = useState<IColumn[]>([]);
  
  const handleColumnAdd = () => {
    const column = {
      id: ++id,
      title: 'some title',
    }
    setColumns([...columns, column])
  }

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
  
    const items = reorder(
      columns,
      result.source.index,
      result.destination.index
    );
  
    setColumns(items);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='boardspage' direction="horizontal">
        {(provided, snapshot) => (
          <div 
          ref={provided.innerRef}
          // className='boards-container'
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}
          >
            {columns && columns.map((item, idx) => (
              <Draggable key={item.id} draggableId={String(item.id)} index={idx}>
                {(provided, snapshot) => (
                  <div 
                    key={item.id} 
                    // className="column-draggable"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <Column item={item} />

                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
            <button onClick={handleColumnAdd}>add columns</button>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Board