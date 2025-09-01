import { useState } from "react";

export default function TaskItem({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const toggleComplete = () => {
    updateTask(task._id, { completed: !task.completed, title: task.title });
  };

  const handleEdit = () => {
    if (isEditing) {
      if (!newTitle.trim()) return; // prevent empty title
      updateTask(task._id, { completed: task.completed, title: newTitle });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      ) : (
        <span>{task.title}</span>
      )}

      <div style={{ display: "flex", gap: "5px" }}>
        <button onClick={toggleComplete}>
          {task.completed ? "Mark Completed" : "Mark Pending"}
        </button>
        <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
        <button onClick={() => deleteTask(task._id)}>Delete</button>
      </div>
    </div>
  );
}
