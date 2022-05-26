import styled from '@emotion/styled';
import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Column from './Column';
import { columnsFromBack } from './data';

type Props = {}

const Container = styled.div`
  display: flex;
  height: 90vh;
  padding-top: 10vh;

`;

const TestDiv = styled.div`
  width: 100%;
  height: 10vh;
  background: purple;
  position: fixed;
`;

const Board = (props: Props) => {
  const [columns, setColumns] = useState(columnsFromBack);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    if (type === 'column') {
      const newColumns = [...columns];

      const [removed] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, removed);

      setColumns(newColumns);
      return;
    }

    if (type ==='task') {
      const sourceColumn = columns.find((column) => column.id === source.droppableId);
      const destColumn =   columns.find((column) => column.id === destination.droppableId);
      
      if (!sourceColumn || !destColumn) return;
  
      const sourceIdx = columns.indexOf(sourceColumn);
      const destIdx =   columns.indexOf(destColumn);
  
      const [removed] = sourceColumn.tasks.splice(source.index, 1);
      destColumn.tasks.splice(destination.index, 0, removed);
  
      const newColumns = [...columns];
      newColumns[sourceIdx] = sourceColumn;
      newColumns[destIdx] = destColumn;
      
      setColumns(newColumns);
      return;
    }
    
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='all-columns' direction='horizontal' type='column'>
          {(provided) => (
            <Container
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns.map((column, index) => {
                const tasks = column.tasks;
      
                return <Column key={column.id} column={column} tasks={tasks} index={index} /> 
              })}
  
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default Board