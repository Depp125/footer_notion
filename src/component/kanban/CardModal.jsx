import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';

const statusOptions = [
  { label: 'Not Started', value: 'Not Started' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Done', value: 'Done' }
];

const CardModal = ({ visible, onHide, card, onSave, onDelete }) => {
  const [title, setTitle] = useState(card?.title || '');
  const [notes, setNotes] = useState(card?.notes || '');
  const [status, setStatus] = useState(card?.status || 'Not Started');
  const [subtasks, setSubtasks] = useState(card?.subtasks || []);
  const [newSubtask, setNewSubtask] = useState('');

  React.useEffect(() => {
    setTitle(card?.title || '');
    setNotes(card?.notes || '');
    setStatus(card?.status || 'Not Started');
    setSubtasks(card?.subtasks || []);
  }, [card, visible]);

  const handleSave = () => {
    onSave({ ...card, title, notes, status, subtasks });
    onHide();
  };

  const handleDelete = () => {
    confirmDialog({
      message: 'Are you sure you want to delete this card?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        onDelete(card);
        onHide();
      }
    });
  };

  const addSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([...subtasks, { text: newSubtask, done: false }]);
      setNewSubtask('');
    }
  };

  const toggleSubtask = (idx) => {
    setSubtasks(subtasks.map((s, i) => i === idx ? { ...s, done: !s.done } : s));
  };

  const deleteSubtask = (idx) => {
    setSubtasks(subtasks.filter((_, i) => i !== idx));
  };

  return (
    <>
      <Dialog header="Card Details" visible={visible} style={{ width: '400px' }} onHide={onHide} modal>
        <div className="p-fluid">
          <label>Title</label>
          <InputText value={title} onChange={e => setTitle(e.target.value)} className="mb-2" />
          <label>Status</label>
          <Dropdown value={status} options={statusOptions} onChange={e => setStatus(e.value)} className="mb-2" />
          <label>Notes</label>
          <InputTextarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="mb-2" />
          <label>Sub-tasks / Reflections</label>
          <div className="p-inputgroup mb-2">
            <InputText value={newSubtask} onChange={e => setNewSubtask(e.target.value)} placeholder="Add sub-task..." />
            <Button icon="pi pi-plus" onClick={addSubtask} />
          </div>
          <ul style={{ paddingLeft: 0 }}>
            {subtasks.map((s, idx) => (
              <li key={idx} style={{ listStyle: 'none', display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                <Button icon={s.done ? 'pi pi-check-square' : 'pi pi-square'} className="p-button-text p-button-sm" onClick={() => toggleSubtask(idx)} />
                <span style={{ textDecoration: s.done ? 'line-through' : 'none', flex: 1 }}>{s.text}</span>
                <Button icon="pi pi-trash" className="p-button-text p-button-danger p-button-sm" onClick={() => deleteSubtask(idx)} />
              </li>
            ))}
          </ul>
          <div className="p-d-flex p-jc-between mt-3">
            <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={handleDelete} />
            <Button label="Save" icon="pi pi-check" onClick={handleSave} autoFocus />
          </div>
        </div>
      </Dialog>
      <ConfirmDialog />
    </>
  );
};

export default CardModal; 