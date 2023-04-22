import { DragEvent, ReactNode } from 'react';

export type SectionProps = {
    status: 'todo' | 'doing' | 'done';
    children: ReactNode;
    title: string;
    amount: number;
    onDrop: (event: DragEvent) => void;
    onDragOver: (event: DragEvent) => void;
};
