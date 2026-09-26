import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const result = await response.json();

      setTasks(result.data || []);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setTasks([result.data, ...tasks]);

        setTitle("");
        setDescription("");
      } else {
        alert("Failed to add task");
      }
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  const toggleTaskStatus = async (task) => {
    try {
      const response = await fetch(
        `http://localhost:5000/todos/${task._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !task.completed,
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        setTasks(
          tasks.map((item) => (item._id === task._id ? result.data : item)),
        );
      }
    } catch (error) {
      console.log("Error updating task status:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const updateTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setTasks(tasks.map((task) => (task._id === id ? result.data : task)));

        setEditingTask(null);
        setEditTitle("");
        setEditDescription("");
      }
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  const searchTasks = async () => {
    try {
      if (!search.trim()) {
        fetchTasks();
        return;
      }

      const response = await fetch(
        `http://localhost:5000/todos/search?q=${encodeURIComponent(search)}`,
      );

      const result = await response.json();

      if (result.success) {
        setTasks(result.data);
      }
    } catch (error) {
      console.log("Error searching tasks:", error);
    }
  };

  const filterTasks = async (status) => {
    setFilter(status);

    try {
      if (status === "all") {
        fetchTasks();
        return;
      }

      const response = await fetch(
        `http://localhost:5000/todos?status=${status}`,
      );

      const result = await response.json();

      if (result.success) {
        setTasks(result.data);
      }
    } catch (error) {
      console.log("Error filtering tasks:", error);
    }
  };

  return (
    <div className="app">
      <h1>My To-Do List</h1>
      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>

        <button type="submit">Add Task</button>
      </form>
      <h2>My Tasks</h2>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button onClick={searchTasks}>Search</button>
      </div>
      <div className="filter-buttons">
        <button onClick={() => filterTasks("all")}>All</button>

        <button onClick={() => filterTasks("pending")}>Pending</button>

        <button onClick={() => filterTasks("completed")}>Completed</button>
      </div>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-card" key={task._id}>
              {editingTask === task._id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                  />

                  <textarea
                    value={editDescription}
                    onChange={(event) => setEditDescription(event.target.value)}
                  ></textarea>

                  <button onClick={() => updateTask(task._id)}>
                    Save Changes
                  </button>

                  <button onClick={() => setEditingTask(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{task.title}</h3>

                  <p>{task.description}</p>

                  <span>{task.completed ? "Completed" : "Pending"}</span>

                  <button onClick={() => toggleTaskStatus(task)}>
                    {task.completed ? "Mark as Pending" : "Mark as Completed"}
                  </button>

                  <button onClick={() => startEditing(task)}>Edit</button>

                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
