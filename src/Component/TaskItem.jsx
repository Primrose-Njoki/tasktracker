import { useState } from 'react';

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    if (editedText.trim() && editedText !== task.text) {
      onEdit(task.id, editedText);
    }
    setIsEditing(false);
  };

  return (
    <li style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggle(task.id)} 
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onBlur={handleEdit}
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>
          {task.text}
        </span>
      )}
      
      <button onClick={() => onDelete(task.id)}>Delete</button>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </li>
  );
};

export default TaskItem;