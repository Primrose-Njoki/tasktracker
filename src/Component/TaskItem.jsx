import { useState } from 'react';
import styles from './TaskItem.module.css';

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    if (editedText.trim() && editedText !== task.text) {
      onEdit(task.id, editedText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditedText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggle(task.id)}
        className={styles.checkbox}
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          autoFocus
          className={styles.editInput}
        />
      ) : (
        <span 
          onDoubleClick={() => setIsEditing(true)}
          className={styles.taskText}
        >
          {task.text}
        </span>
      )}
      
      <div className={styles.buttonGroup}>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={isEditing ? styles.saveButton : styles.editButton}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button 
          onClick={() => onDelete(task.id)}
          className={styles.deleteButton}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;