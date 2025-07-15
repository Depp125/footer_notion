import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const KanbanCard = ({
  item,
  onClick,
  provided,
  onEdit,
  isEditing: isEditingProp,
}) => {
  const [isEditing, setIsEditing] = useState(!!isEditingProp);
  const [editValue, setEditValue] = useState(item.title);

  useEffect(() => {
    if (isEditingProp) {
      setEditValue(item.title);
      setIsEditing(true);
    }
  }, [isEditingProp, item.title]);

  // Enter inline edit mode
  const startEdit = (e) => {
    e.stopPropagation();
    setEditValue(item.title);
    setIsEditing(true);
  };

  // Save and exit edit mode
  const finishEdit = () => {
    setIsEditing(false);
    if (editValue !== item.title && onEdit) {
      onEdit(editValue);
    } else if (onEdit) {
      onEdit(editValue); // For new card, even if unchanged
    }
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") {
      finishEdit();
    }
  };

  // Only open modal if not editing and not clicking pencil
  const handleCardClick = (e) => {
    if (!isEditing) {
      onClick();
    }
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Card
        className="kanban-card"
        onClick={handleCardClick}
        onDoubleClick={startEdit}
      >
        <div
          className="kanban-card-title"
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          {isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={finishEdit}
              onKeyDown={handleEditKeyDown}
              autoFocus
              style={{
                flex: 1,
                fontSize: "1rem",
                border: "1px solid #d1d5db",
                borderRadius: 4,
                padding: "2px 6px",
              }}
            />
          ) : (
            <>
              <span style={{ flex: 1 }}>{item.title}</span>
              <Button
                icon="pi pi-pencil"
                className="p-button-text p-button-sm card-edit-btn"
                style={{ fontSize: 14, marginLeft: 2, opacity: 0.7 }}
                onClick={startEdit}
                tabIndex={-1}
                aria-label="Edit card title"
              />
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default KanbanCard;
