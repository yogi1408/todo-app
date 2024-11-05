// src/App.tsx
import React from "react";
import { TaskProvider } from "./context/TaskContext";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="flex flex-col items-center p-4 sm:p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
          To-do List App
        </h1>
        <div className="w-full bg-white p-4 rounded-lg shadow-lg">
          <AddTask />
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
};

export default App;
