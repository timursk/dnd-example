import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type Props = {
  quotes: any;
}

const InnerQuoteList = ({quotes}: Props) => {
  console.log(quotes);
  return (
    <>
      <Draggable
          key={quotes.id}
          draggableId={quotes.id}
          index={quotes.id}
          // shouldRespectForceTouch={false}
        >
          {(dragProvided, dragSnapshot) => (
            <div
              // isDragging={dragSnapshot.isDragging}
              // isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
              // provided={dragProvided}
            >
              {quotes.content}  
              {quotes.author}  
            </div>
          )}
        </Draggable>
    </>
  )
}

export default InnerQuoteList