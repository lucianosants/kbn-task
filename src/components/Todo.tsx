import { ReactNode } from 'react';

interface TodoProps {
    status: 'todo' | 'doing' | 'done';
    children: ReactNode;
}

export default function Todo(props: TodoProps) {
    const { content, status } = {
        status: {
            todo: {
                container: 'p-3 bg-danger-300 text-danger-999 rounded-xl',
            },
            doing: {
                container: 'p-3 bg-primary-300 text-primary-999 rounded-xl',
            },
            done: {
                container: 'p-3 bg-secondary-600 text-secondary-999 rounded-xl',
            },
        },
        content: 'line-clamp-3',
    };

    return (
        <article className={status[props.status].container}>
            <p className={content}>{props.children}</p>
        </article>
    );
}
