import { useEffect, useState } from 'react';

type TasksProps = Array<{
    id: string;
    content: string;
    status: string;
}>;

type NewTaskProps = {
    id: string;
    content: string;
    status: string;
};

export function useLocalData() {
    const STORAGE_KEY = 'tasks';

    const [tasks, setTasks] = useState<TasksProps>(() => {
        if (typeof window !== 'undefined') {
            const storedTask = localStorage.getItem(STORAGE_KEY);
            return storedTask ? JSON.parse(storedTask) : [];
        } else {
            return [];
        }
    });

    useEffect(() => {
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        if (storedTasks) setTasks(JSON.parse(storedTasks));
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }
    }, [tasks]);

    const generateId = () => Math.random().toString(36).substring(2, 9);

    const addTask = (content: string) => {
        const newTask: NewTaskProps = {
            id: generateId(),
            content: content,
            status: 'todo',
        };

        const updatedTasks = [...tasks, newTask];

        setTasks(updatedTasks);

        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
        }
    };

    const moveTask = (id: string, status: string) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    status: status,
                };
            }
            return task;
        });

        setTasks(updatedTasks);

        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
        }
    };

    const editTask = (id: string, content: string, refreshData: () => void) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    id: id,
                    content: content,
                };
            }

            refreshData();
            return task;
        });

        setTasks(updatedTasks);

        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
        }
    };

    const deleteTask = (id: string) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);

        setTasks(updatedTasks);

        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
        }
    };

    return {
        tasks,
        setTasks,
        addTask,
        moveTask,
        editTask,
        deleteTask,
    };
}
