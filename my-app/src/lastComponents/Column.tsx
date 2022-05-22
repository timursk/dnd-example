import React from 'react'
import Task from './Task';
import styled from '@emotion/styled';
import { Droppable } from 'react-beautiful-dnd';

type Props = {
  column: any;
  tasks: any;
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



const Column = ({column, tasks}: Props) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
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
  )
}

export default Column