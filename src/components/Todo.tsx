import { ReactNode, DragEvent } from 'react';

interface TodoProps {
    status: 'todo' | 'doing' | 'done';
    children: ReactNode;
    onDragStart: (e: DragEvent) => void;
}

export default function Todo(props: TodoProps) {
    const defaultStyles = 'p-3 rounded-xl cursor-pointer';

    const { content, status } = {
        status: {
            todo: {
                container: `${defaultStyles} bg-danger-300 text-danger-999`,
            },
            doing: {
                container: `${defaultStyles} bg-primary-300 text-primary-999 rounded-xl`,
            },
            done: {
                container: `${defaultStyles} bg-secondary-600 text-secondary-999 rounded-xl`,
            },
        },
        content: 'line-clamp-3',
    };

    return (
        <article
            className={status[props.status].container}
            draggable
            onDragStart={props.onDragStart}
        >
            <p className={content}>{props.children}</p>
        </article>
    );
}
