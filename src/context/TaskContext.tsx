import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Task } from '../types';

interface TaskContextType {
    tasks: Task[];
    addTask: (text: string) => void;
    toggleTask: (id: number) => void;
    deleteTask: (id: number) => void;
    filterTasks: (filter: string) => Task[];
}

interface TaskProviderProps {
    children: ReactNode;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (text: string) => {
        if (text.trim()) {
            const newTask = { id: Date.now(), text, completed: false };
            setTasks(prevTasks => [...prevTasks, newTask]);
        }
    };

    const toggleTask = (id: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const filterTasks = (filter: string) => {
        if (filter === 'completed') return tasks.filter(task => task.completed);
        if (filter === 'incomplete') return tasks.filter(task => !task.completed);
        return tasks;
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, filterTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTaskContext must be used within TaskProvider');
    return context;
};
