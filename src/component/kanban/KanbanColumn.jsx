import React from 'react';
import { Button } from 'primereact/button';

const KanbanColumn = ({ colKey, col, onAddCard, onCardClick, children }) => {
  return (
    <div className="kanban-column">
      <div className="kanban-column-title">{col.name}</div>
      {children}
      <Button label="New Page" className="p-button-text kanban-new-page" onClick={() => onAddCard(colKey)} />
    </div>
  );
};

export default KanbanColumn; 