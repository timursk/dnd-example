import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { StyledBoardsContainer, StyledColumnContainer, StyledMainContainer } from './MyBoardStyles';

type Props = {}

const tasksFromBackend = [
  { id: 'TASK-1', content: "First task" },
  { id: 'TASK-2', content: "Second task" },
  { id: 'TASK-3', content: "Third task" },
  { id: 'TASK-4', content: "Fourth task" },
  { id: 'TASK-5', content: "Fifth task" }
];

const columnsFromBackend = [
  { id: 'COLUMN-1', name: "Requested", items: tasksFromBackend },
  { id: 'COLUMN-2', name: "To do", items: [] },
  { id: 'COLUMN-3', name: "In Progress", items: [] },
  { id: 'COLUMN-4', name: "Done", items: [] }
]

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;
  
  const sourceIdx = source.index;
  const destIdx = destination.index;

  const columnsToSet = [...columns];
  const [removed] = columnsToSet.splice(sourceIdx, 1);

  columnsToSet.splice(destIdx, 0, removed);
    
  setColumns(columnsToSet);
  
}

const MyBoard = (props: Props) => {
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <StyledMainContainer>
      <DragDropContext onDragEnd={(res) => onDragEnd(res, columns, setColumns)}>
        <Droppable droppableId='boards' direction="horizontal">
          {(provided, snapshot) => (
            <StyledBoardsContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {
                columns && columns.map((item, idx) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={idx}
                  >
                    {(provided, snapshot) => (
                      <StyledColumnContainer
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h2>{item.name}</h2>
                        <div>
                          {'tasks'}
                        </div>
                      </StyledColumnContainer>
                    )}
                  </Draggable>
                ))
              }

              {provided.placeholder}
            </StyledBoardsContainer>
          )}
        </Droppable>
      </DragDropContext>
    </StyledMainContainer>
  )
}

export default MyBoard