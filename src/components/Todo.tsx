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
                container: `${defaultStyles} bg-danger-400/50 text-danger-100`,
            },
            doing: {
                container: `${defaultStyles} bg-primary-300/50 text-primary-999 rounded-xl`,
            },
            done: {
                container: `${defaultStyles} bg-secondary-600/50 text-secondary-50 rounded-xl`,
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
