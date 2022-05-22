import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TasksList from './TasksList';

type Props = {
  index: number; 
  title: string; 
  quotes: any;
}

const Column = ({index, title, quotes}: Props) => {

  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div 
          ref={provided.innerRef} 
          {...provided.draggableProps}
        >
          <div 
            style={{background: snapshot.isDragging ? 'purple' : 'yellow'}}
          >
            <div
              style={{background: snapshot.isDragging ? 'green' : 'grey'}}
              {...provided.dragHandleProps}
            >
              {title}
            </div>
          </div>

          <TasksList
            listId={title}
            listType="QUOTE"
            quotes={quotes}
            // style={{
            //   backgroundColor: snapshot.isDragging ? 'orange' : null
            // }}
            // internalScroll={this.props.isScrollable}
            // isCombineEnabled={Boolean(this.props.isCombineEnabled)}
          />
        </div>
      )}
    </Draggable>
  )
}

export default Column