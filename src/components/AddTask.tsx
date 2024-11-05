import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const AddTask: React.FC = () => {
  const { addTask } = useTaskContext();
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim()) {
      addTask(input);
      setInput("");
    }
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a task"
        className="flex-grow border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:border-blue-500 h-10"
      />
      <button
        onClick={handleAddTask}
        className="bg-lime-700 text-white px-4 py-2 rounded-r-lg hover:bg-lime-900 h-10"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
