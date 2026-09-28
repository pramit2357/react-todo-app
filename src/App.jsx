import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    const name = newTask.trim();

    if (name === "") return;

    const task = {
      id: Date.now(),
      name,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <main className="page">
      <section className="todo-card">
        <div className="header">
          <div>
            <p className="eyebrow">REACTJS • ETP DEMO</p>
            <h1>Todo App</h1>
            <p className="subtitle">
              Conditional rendering + lists + state + events
            </p>
          </div>
          <div className="count">{tasks.length}</div>
        </div>

        <div className="input-row">
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>

        {/* Conditional rendering */}
        {tasks.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">✓</div>
            <h2>No tasks available</h2>
            <p>Add your first task to get started.</p>
          </div>
        )}

        {/* Rendering a list with map() and a key */}
        {tasks.length > 0 && (
          <ul className="task-list">
            {tasks.map((task) => (
              <li className="task" key={task.id}>
                <button
                  className={`check ${task.completed ? "checked" : ""}`}
                  onClick={() => toggleTask(task.id)}
                  aria-label={`Mark ${task.name} as ${
                    task.completed ? "incomplete" : "complete"
                  }`}
                >
                  {task.completed ? "✓" : ""}
                </button>

                <span className={task.completed ? "completed" : ""}>
                  {task.name}
                </span>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="footer">
          <span>
            {tasks.filter((task) => !task.completed).length} remaining
          </span>
          <span>Press Enter to add</span>
        </div>
      </section>
    </main>
  );
}

export default App;
