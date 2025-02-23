import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Track index of the task being edited

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks array changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const submitTask = () => {
    if (input.trim() === "") return; // Prevent empty input

    if (editIndex !== null) {
      // If editing, update the task
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? input : task
      );
      setTasks(updatedTasks);
      setEditIndex(null); // Reset edit state
    } else {
      // Prevent duplicate tasks
      if (!tasks.includes(input)) {
        setTasks([...tasks, input]);
      } else {
        alert("Task already exists!");
      }
    }

    setInput(""); // Clear input field
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setInput(tasks[index]); // Set the input field with the task to edit
    setEditIndex(index); // Track the index being edited
  };

  return (
    <div className="flex flex-col items-center text-center pt-10 min-h-screen w-full bg-amber-600">
      <h1 className="font-bold text-6xl mb-10 text-white">TODO</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Your TODO Here"
          className="me-4 bg-white p-2 rounded-lg border border-gray-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="button"
          className="bg-amber-300 font-bold text-stone-50 p-2 rounded-lg w-[90px]"
          onClick={submitTask}
        >
          {editIndex !== null ? "Update" : "ADD"}
        </button>
      </div>

      <div className="mt-5 text-start flex container justify-evenly flex-wrap bg-amber-700 p-5 rounded-lg shadow-md">
        {tasks.length === 0 ? (
          <p className="text-white text-lg">No tasks available.</p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className="p-5 text-xl mb-5 me-5 rounded-xl bg-amber-100 w-[300px] mt-3"
            >
              <p>
                <span className="font-bold me-2">Task:</span> {task}
              </p>
              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  className="bg-green-500 text-white h-[40px] w-[80px] rounded-xl"
                  onClick={() => editTask(index)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white h-[40px] w-[80px] rounded-xl"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
