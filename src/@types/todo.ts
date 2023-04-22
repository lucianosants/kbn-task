import { DragEvent, ReactNode } from 'react';

export type TodoProps = {
    id: string;
    status: 'todo' | 'doing' | 'done';
    children: ReactNode;
    onDragStart: (event: DragEvent) => void;
    editTask: ({ ...props }) => void;
    onOutput: (event: string) => void;
    readOnly: boolean;
    deleteTask: () => void;
};
