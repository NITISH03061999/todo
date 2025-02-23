import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState([]);
  const [input, setInputChange] = useState("");

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTask(JSON.parse(savedTasks)); // Convert from string to array
    }
  }, []);

  // Save tasks to localStorage when `task` changes
  useEffect(() => {
    if (task.length > 0) {
      // Prevent overwriting with empty array
      localStorage.setItem("tasks", JSON.stringify(task));
    }
  }, [task]);

  const submitVal = () => {
    if (input.trim() === "") return; // Prevent adding empty tasks
    const newTasks = [...task, input];
    setTask(newTasks);
    setInputChange(""); // Clear input
  };

  const deleteTask = (index) => {
    const newTasks = task.filter((_, i) => i !== index);
    setTask(newTasks);
  };

  return (
    <>
      <div className="flex flex-col items-center text-center pt-10 min-h-screen w-full bg-amber-600">
        <h1 className="font-bold text-6xl mb-10 text-white">TODO</h1>
        <div>
          <input
            type="text"
            placeholder="Enter Your TODO Here"
            className="me-4 bg-white p-2 rounded-lg border border-gray-300"
            value={input}
            onChange={(e) => setInputChange(e.target.value)}
          />
          <button
            type="button"
            className="bg-amber-300 font-bold text-stone-50 p-2 rounded-lg w-[70px]"
            onClick={submitVal}
          >
            ADD
          </button>
        </div>

        <div className="mt-5 text-start flex container justify-evenly flex-wrap bg-amber-700 p-5 rounded-lg shadow-md">
          {task.map((t, index) => (
            <div
              key={index}
              className="p-5 text-xl mb-5 me-5 rounded-xl bg-amber-100 w-[300px] mt-3"
            >
              <p>
                <span className="font-bold me-2">Task:</span> {t}
              </p>
              <button
                type="button"
                className="bg-amber-600 text-white h-[40px] mt-3 w-[100px] rounded-xl"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
