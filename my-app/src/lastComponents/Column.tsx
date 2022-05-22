import React from 'react'
import Task from './Task';
import styled from '@emotion/styled';
import { Droppable, Draggable } from 'react-beautiful-dnd';

type Props = {
  column: any;
  tasks: any;
  index: number;
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

const Title = styled.div`
  padding: 8px;
`;
const TasksList = styled.div`
  padding: 8px;
`;



const Column = ({column, tasks, index}: Props) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable droppableId={column.id} type='task'>
            {(provided) => (
              <TasksList
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
    
                {provided.placeholder}
              </TasksList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}

export default Column