import React, { useState } from 'react'
import { IColumn } from './Board';
import './Column.css';
import Tasks from './Tasks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export type ITask = {
  id: number;
  title: string;
}

type Props = {
  item: IColumn
}

let id = 0;

// a little function to help us with reordering the result
const reorder = (list: ITask[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

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

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
  
    const items = reorder(
      tasksList,
      result.source.index,
      result.destination.index
    );
  
    setTasksList(items);
  }

  // <div className="column">
  //   <h2>{item.title}</h2>
  //   <button onClick={handleAdd}>add task</button>

  //   <Tasks tasksList={tasksList} />
  // </div>

  return (
    <>
      <button onClick={handleAdd}>add task</button>

      <DragDropContext onDragEnd={(r) => onDragEnd(r)}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <div className='tasks-container'>
              
              {tasksList.map((item, index) => (
                <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                  {(provided, snapshot) => (
                  
                      <div className='task'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}  
                      >
                        {item.title}
                      </div>
                    
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
    </>
  )
}

export default Column