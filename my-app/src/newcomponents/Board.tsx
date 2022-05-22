import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Column from './Column';
import data from './data';
import reorder, { reorderQuoteMap } from './reorder';

type Props = {}

const Board = (props: Props) => {
  const [columns, setColumns] = useState(data);
  const [ordered, setOrdered] = useState(Object.keys(data));

  return (
    <>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns,setColumns, ordered, setOrdered)}>
        <Droppable
          droppableId="board"
          type="COLUMN"
          direction="horizontal"
          // ignoreContainerClipping={Boolean(containerHeight)}
          // isCombineEnabled={isCombineEnabled}
        >
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{display: 'flex'}}
            >
              {ordered.map((key, index) => (
                <Column
                  key={key}
                  index={index}
                  title={key}
                  quotes={columns[+key]}
                  // isScrollable={this.props.withScrollableColumns}
                  // isCombineEnabled={this.props.isCombineEnabled}
                />
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </>
  )
}

export default Board

function onDragEnd(result: any, columns: any, setColumns: any, ordered: any, setOrdered: any) {
  if (result.combine) {
    if (result.type === "COLUMN") {
      const shallow = [...ordered];
      shallow.splice(result.source.index, 1);
      setOrdered(shallow);
      return;
    }

    const column: any = columns[result.source.droppableId];
    const withQuoteRemoved = [...column];
    withQuoteRemoved.splice(result.source.index, 1);

    const columnsToSet = {
      ...columns,
      [result.source.droppableId]: withQuoteRemoved
    };
    setColumns(columnsToSet);
    return;
  }

  // dropped nowhere
  if (!result.destination) {
    return;
  }

  const source = result.source;
  const destination = result.destination;

  // did not move anywhere - can bail early
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return;
  }

  // reordering column
  if (result.type === "COLUMN") {
    const orderedToSet = reorder(
      ordered,
      source.index,
      destination.index
    );

    setOrdered(orderedToSet);

    return;
  }

  const data = reorderQuoteMap({
    quoteMap: columns,
    source,
    destination
  });

  setColumns(data.quoteMap);
};