import React from 'react';

const KanbanColumn = ({ colKey, col, onAddCard, onCardClick, children }) => {
  return (
    <div className="kanban-column">
      <div className="kanban-column-title">{col.name}</div>
      {children}
    </div>
  );
};

export default KanbanColumn; 