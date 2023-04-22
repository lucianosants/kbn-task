import { TasksProps } from './tasks';

export type HomeScreenProps = {
    tasks: TasksProps;
    addTask: (content: string, refreshData: () => void, uid?: string) => void;
    moveTask: (id: string, status: string, refreshData: () => void) => void;
    editTask: (id: string, content: string, refreshData: () => void) => void;
    deleteTask: (id: string, refreshData: () => void) => void;
};
