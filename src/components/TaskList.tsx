import React, { useState, useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const { tasks, filterTasks } = useTaskContext();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const searchedTasks = tasks.filter((task) =>
        task.text.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredTasks(
        filterTasks(filter).filter((task) => searchedTasks.includes(task))
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, filter, tasks, filterTasks]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex flex-col md:flex-row md:space-x-2 md:items-center w-full">
          <div className="flex space-x-2 mb-2 md:mb-0">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg ${
                filter === "all" ? "bg-gray-500 text-white" : "bg-lime-400 hover:bg-lime-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg ${
                filter === "completed" ? "bg-gray-500 text-white" : "bg-lime-400 hover:bg-lime-900"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("incomplete")}
              className={`px-4 py-2 rounded-lg ${
                filter === "incomplete" ? "bg-gray-500 text-white" : "bg-lime-400 hover:bg-lime-900"
              }`}
            >
              Incomplete
            </button>
          </div>
          <input
            type="text"
            placeholder="Search tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500 w-full md:w-auto"
          />
        </div>
      </div>

      <div>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
