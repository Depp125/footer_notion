import React from 'react';
import { Card } from 'primereact/card';

const KanbanCard = ({ item, onClick, provided }) => {
  return (
    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <Card className="kanban-card" onClick={onClick}>
        <div className="kanban-card-title">{item.title}</div>
      </Card>
    </div>
  );
};

export default KanbanCard; 