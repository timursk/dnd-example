import React from 'react'
import styled from '@emotion/styled';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  task: any;
  index: any;
}

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background: white;
`;

const Task = ({task, index}: Props) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}  
        >
          <div>{task.title}</div>
          <div>{task.description}</div>
        </Container>
      )}
    </Draggable>
  )
}

export default Task