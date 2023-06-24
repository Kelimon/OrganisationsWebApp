import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box } from "@mui/material";

function arrayMove(array, fromIndex, toIndex) {
  const result = Array.from(array);
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

function SimpleList() {
  const [items, setItems] = useState([
    { id: "item-1", text: "Item 1" },
    { id: "item-2", text: "Item 2" },
    { id: "item-3", text: "Item 3" },
  ]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    setItems(arrayMove(items, source.index, destination.index));
  };
  if (true) {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <Box>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.text}
                      </div>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  } else {
    return (
      <>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Draggable key={1} draggableId={1} index={1}>
                  {(provided) => (
                    <Box>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {"Hallo"}
                      </div>
                    </Box>
                  )}
                </Draggable>

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  }
}

export default SimpleList;
