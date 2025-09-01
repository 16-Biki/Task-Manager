import { useState, useEffect, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import TaskItem from "../components/TaskItem";
import Navbar from "../components/Navbar";

export default function Tasks() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      setError("Failed to fetch tasks");
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await API.post("/tasks", { title });
      setTasks([res.data, ...tasks]);
      setTitle("");
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const res = await API.put(`/tasks/${id}`, updates);
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>{user?.username}'s Tasks</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="New task..."
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>
        <div>
          {tasks.length === 0 ? (
            <p>No tasks yet.</p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
