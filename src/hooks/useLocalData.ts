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

    const [tasks, setTasks] = useState<TasksProps>([]);

    useEffect(() => {
        const storedTasks = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]',
        );

        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const generateId = () => {
        const randomString = Math.random().toString(36).substring(2, 9);

        return randomString;
    };

    const addTask = (content: string) => {
        const newTask: NewTaskProps = {
            id: generateId(),
            content: content,
            status: 'todo',
        };

        setTasks([...tasks, newTask]);
    };

    return {
        tasks,
        setTasks,
        addTask,
    };
}
