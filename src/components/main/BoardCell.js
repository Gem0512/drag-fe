import React from "react";
import { useDrop } from "react-dnd";
import "../css/BoardCell.css"
import DraggableElement from "./DraggableElement";
function BoardCell({ rowIndex, colIndex, handleDrop, elements }) {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: ["input", "button"],
      drop: (item) => handleDrop(item.id, rowIndex, colIndex),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  
    return (
      <div ref={drop} className={`BoardCell ${isOver ? "highlight" : ""}`}>
        {elements.map((element) => (
          <DraggableElement
            key={element.id}
            id={element.id}
            type={element.type}
            position={element.position}
          />
        ))}
      </div>
    );
  }
  
  
export default BoardCell;