import React from 'react';
import { Task } from '../types';
import { useTaskContext } from '../context/TaskContext';

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const { toggleTask, deleteTask } = useTaskContext();

    return (
        <div className="flex items-center justify-between bg-gray-50 p-2 mb-2 rounded-lg shadow-sm">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="mr-2"
                />
                <span
                    className={`flex-grow ${
                        task.completed ? 'text-green-600' : 'text-red-500'
                    }`}
                >
                    {task.text}
                </span>
            </div>
            <button
                onClick={() => deleteTask(task.id)}
                className="text-red-800 hover:text-red-700 ml-4"
            >
                Delete
            </button>
        </div>
    );
};

export default TaskItem;
