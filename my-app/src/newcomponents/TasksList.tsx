import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import InnerList from './InnerList';

type Props = {
  listId: string; 
  listType: string; 
  quotes: any;
}
const defaultlistId = "LIST";

const TasksList = ({ listType, listId, quotes }: Props) => {
  
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      // ignoreContainerClipping={ignoreContainerClipping}
      // isDropDisabled={isDropDisabled}
      // isCombineEnabled={isCombineEnabled}
    >
      {(dropProvided, dropSnapshot) => (
        <div
          // isDraggingOver={dropSnapshot.isDraggingOver}
          // isDropDisabled={isDropDisabled}
          // isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          <InnerList
            quotes={quotes}
            // title={title}
            dropProvided={dropProvided}
          />
        </div>
      )}
    </Droppable>
  )
}

export default TasksList
