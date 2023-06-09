import { useState, useEffect, ChangeEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import data from '@/_data/home/en.json';

import { TodoProps } from '../@types/todo';

const defaultStyles = 'p-3 rounded-xl cursor-grab active:cursor-grabbing';

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

export default function Todo({ children, readOnly, ...props }: TodoProps) {
    const [taskContent, setTaskContent] = useState(children);
    const [isReadOnly, setIsReadOnly] = useState(readOnly);
    const [isOpen, setIsOpen] = useState(false);

    const { todo } = data;

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;

        setTaskContent(value);
        props.onOutput(value);
    };

    useEffect(() => {
        setIsReadOnly(readOnly);
    }, [readOnly]);

    return (
        <>
            <Dialog.Root open={isOpen}>
                <Dialog.Trigger asChild onClick={() => setIsOpen(true)}>
                    <article
                        className={status[props.status].container}
                        draggable
                        onDragStart={props.onDragStart}
                    >
                        <p className={content}>{children}</p>
                    </article>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay
                        className="fixed inset-0 w-screen h-full pointer-events-auto backdrop-blur-md bg-neutral-variant-700/40"
                        onClick={() =>
                            !isReadOnly ? setIsOpen(true) : setIsOpen(false)
                        }
                    />

                    <Dialog.Content className="fixed w-11/12 max-w-2xl p-6 -translate-x-1/2 -translate-y-1/2 border border-neutral-900 sm:p-10 top-80 left-1/2 bg-neutral-variant-600/80 backdrop-blur-xl rounded-xl">
                        <textarea
                            className="w-full p-3 resize-none h-72 sm:h-48 text-primary-50 bg-neutral-variant-800/60 backdrop-blur-2xl rounded-xl"
                            readOnly={isReadOnly}
                            value={taskContent as string}
                            onChange={handleChange}
                        />

                        <div className="flex justify-end gap-3 mt-6">
                            <Dialog.Close
                                className="p-2 border rounded-xl disabled:opacity-50 hover:bg-neutral-800 text-primary-500 border-primary-500"
                                aria-label={todo.close_btn_aria_label}
                                disabled={!isReadOnly ? true : false}
                                onClick={() => setIsOpen(false)}
                            >
                                <span>{todo.close_btn_title}</span>
                            </Dialog.Close>

                            <button
                                className={`p-3 ${
                                    isReadOnly
                                        ? 'bg-primary-600'
                                        : 'bg-secondary-600 text-neutral-variant-900'
                                }  bg-primary-600 rounded-xl text-neutral-variant-50 hover:bg-primary-700"`}
                                onClick={props.editTask}
                            >
                                <span>
                                    {isReadOnly
                                        ? todo.change_btn[0]
                                        : todo.change_btn[1]}
                                </span>
                            </button>

                            <button
                                className="p-2 bg-danger-600 rounded-xl text-neutral-variant-50 hover:bg-danger-700 disabled:opacity-50"
                                disabled={!isReadOnly}
                                onClick={props.deleteTask}
                            >
                                <span>{todo.delete_btn_title}</span>
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
}
