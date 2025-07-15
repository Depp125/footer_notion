import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './KanbanBoard.css';
import CardModal from './CardModal';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';

const initialData = {
  columns: {
    remember: { 
      name: 'Remember', 
      items: [
        { title: 'Life Lessons', notes: '', status: 'Not Started', type: 'Remember', subtasks: [] }
      ] 
    },
    goals: { 
      name: 'Goals', 
      items: [
        { title: 'Spiritual', notes: '', status: 'Not Started', type: 'Goals', subtasks: [] },
        { title: 'Social', notes: '', status: 'Not Started', type: 'Goals', subtasks: [] },
        { title: 'Health', notes: '', status: 'Not Started', type: 'Goals', subtasks: [] }
      ] 
    },
    grateful: { 
      name: 'Grateful For', 
      items: [
        { title: 'Person', notes: '', status: 'Not Started', type: 'Grateful For', subtasks: [] },
        { title: 'Things you own', notes: '', status: 'Not Started', type: 'Grateful For', subtasks: [] },
        { title: 'Internet', notes: '', status: 'Not Started', type: 'Grateful For', subtasks: [] }
      ] 
    },
    habitsAdd: { 
      name: 'Habits to Add', 
      items: [
        { title: 'Gym', notes: '', status: 'Not Started', type: 'Habits to Add', subtasks: [] },
        { title: 'Reading', notes: '', status: 'Not Started', type: 'Habits to Add', subtasks: [] }
      ] 
    },
    habitsRemove: { 
      name: 'Habits to Remove', 
      items: [
        { title: 'Smoking', notes: '', status: 'Not Started', type: 'Habits to Remove', subtasks: [] }
      ] 
    }
  }
};

const KanbanBoard = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('kanbanData');
    return saved ? JSON.parse(saved) : initialData;
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedColKey, setSelectedColKey] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('kanbanData', JSON.stringify(data));
  }, [data]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    const sourceCol = data.columns[source.droppableId];
    const destCol = data.columns[destination.droppableId];
    const sourceItems = Array.from(sourceCol.items);
    const [removed] = sourceItems.splice(source.index, 1);
    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      setData({
        ...data,
        columns: {
          ...data.columns,
          [source.droppableId]: { ...sourceCol, items: sourceItems }
        }
      });
    } else {
      const destItems = Array.from(destCol.items);
      destItems.splice(destination.index, 0, removed);
      setData({
        ...data,
        columns: {
          ...data.columns,
          [source.droppableId]: { ...sourceCol, items: sourceItems },
          [destination.droppableId]: { ...destCol, items: destItems }
        }
      });
    }
  };

  const handleAddCard = (colKey) => {
    setSelectedColKey(colKey);
    setSelectedCard({
      title: '',
      notes: '',
      status: 'Not Started',
      type: data.columns[colKey].name,
      subtasks: []
    });
    setIsAddMode(true);
    setModalVisible(true);
  };

  const handleCardClick = (colKey, card, idx) => {
    setSelectedColKey(colKey);
    setSelectedCard({ ...card, idx });
    setIsAddMode(false);
    setModalVisible(true);
  };

  const handleSaveCard = (updatedCard) => {
    if (isAddMode) {
      setData(prev => {
        const col = prev.columns[selectedColKey];
        const newItems = [...col.items, updatedCard];
        return {
          ...prev,
          columns: {
            ...prev.columns,
            [selectedColKey]: { ...col, items: newItems }
          }
        };
      });
    } else {
      setData(prev => {
        const col = prev.columns[selectedColKey];
        const newItems = [...col.items];
        newItems[selectedCard.idx] = updatedCard;
        return {
          ...prev,
          columns: {
            ...prev.columns,
            [selectedColKey]: { ...col, items: newItems }
          }
        };
      });
    }
    setIsAddMode(false);
  };

  const handleDeleteCard = (card) => {
    setData(prev => {
      const col = prev.columns[selectedColKey];
      const newItems = col.items.filter((_, idx) => idx !== selectedCard.idx);
      return {
        ...prev,
        columns: {
          ...prev.columns,
          [selectedColKey]: { ...col, items: newItems }
        }
      };
    });
    setModalVisible(false);
  };

  return (
    <div className="kanban-board">
      <h2>Subconscious Profile</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-columns">
          {Object.entries(data.columns).map(([colKey, col]) => (
            <KanbanColumn
              key={colKey}
              colKey={colKey}
              col={col}
              onAddCard={handleAddCard}
              onCardClick={handleCardClick}
            >
              <Droppable droppableId={colKey}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-droppable">
                    {col.items.map((item, idx) => (
                      <Draggable key={item.title + idx} draggableId={item.title + colKey + idx} index={idx}>
                        {(provided) => (
                          <KanbanCard
                            item={item}
                            onClick={() => handleCardClick(colKey, item, idx)}
                            provided={provided}
                          />
                        )}
                      </Draggable>
                    ))}
                    {/* New Page card as last row */}
                    <div style={{ width: '100%' }}>
                      <Card className="kanban-card kanban-new-page-card" onClick={() => handleAddCard(colKey)}>
                        <Button label="New Page" className="p-button-text kanban-new-page" style={{ width: '100%' }} />
                      </Card>
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </KanbanColumn>
          ))}
        </div>
      </DragDropContext>
      <CardModal
        visible={modalVisible}
        onHide={() => { setModalVisible(false); setIsAddMode(false); }}
        card={selectedCard}
        onSave={handleSaveCard}
        onDelete={handleDeleteCard}
        isAddMode={isAddMode}
      />
    </div>
  );
};

export default KanbanBoard; 