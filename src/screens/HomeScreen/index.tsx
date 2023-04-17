import { DragEvent, FormEvent, useEffect, useState } from 'react';
import { BsNodePlusFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import * as Dialog from '@radix-ui/react-dialog';

import { useLocalData } from '@/src/hooks/useLocalData';

import Container from '@/src/components/Container';
import Section from '@/src/components/Section';
import Todo from '@/src/components/Todo';

import data from '@/_data/home/en.json';
import Form from '@/src/components/Form';

export default function HomeScreen() {
    const { titles } = data.main;

    const [newContent, setContent] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');
    const [mounted, setMounted] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(true);

    const { tasks, addTask, moveTask, editTask, deleteTask } = useLocalData();

    const getAmount = (taskList: string) => {
        if (mounted) {
            return tasks.filter((tasks) => tasks.status === taskList).length;
        } else {
            return 0;
        }
    };

    const handleOnDrag = (event: DragEvent, id: string) => {
        event.dataTransfer.setData('text/plain', id);
        event.dataTransfer.dropEffect = 'move';
    };

    const handleOnDrop = (event: DragEvent, status: string) => {
        event.preventDefault();

        const id = event.dataTransfer.getData('text/plain');

        moveTask(id, status);
    };

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault();
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        addTask(newContent);

        setContent('');
        alert('A new tasks created!');
    };

    const editContentTask = (id: string, status: string) => {
        if (isReadOnly) {
            setIsReadOnly(false);
        } else {
            editTask(id, updatedContent, status);
            setUpdatedContent('');

            setIsReadOnly(true);
        }
    };

    const handleSetInput = (value: string) => setUpdatedContent(value);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Container>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button
                        className="fixed p-3 border rounded-full hover:text-primary-400 hover:border-primary-400 bottom-4 right-4 text-primary-500 border-primary-500 h-fit"
                        aria-label="Add New Task"
                        title="New Task"
                    >
                        <BsNodePlusFill size={24} />
                    </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 w-screen h-full backdrop-blur-md bg-neutral-variant-700/40 " />

                    <Dialog.Content className="fixed w-11/12 max-w-2xl p-6 -translate-x-1/2 -translate-y-1/2 border border-neutral-900 sm:p-10 top-80 left-1/2 bg-neutral-variant-600/80 backdrop-blur-xl rounded-xl">
                        <Dialog.Close
                            className="text-primary-500"
                            aria-label="Close form"
                        >
                            <AiFillCloseCircle size={24} />
                        </Dialog.Close>

                        <Form handleSubmit={(e) => handleSubmit(e)}>
                            <label className="flex">
                                <span
                                    className="sr-only"
                                    aria-label="Task title"
                                >
                                    Content
                                </span>

                                <textarea
                                    className="w-full p-2 bg-transparent border rounded-lg resize-none text-primary-100 border-primary-500 focus:bg-neutral-variant-500 focus:text-primary-50 h-44"
                                    placeholder="Create a task..."
                                    maxLength={280}
                                    value={newContent}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </label>
                        </Form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {titles.map((title, index) => (
                <Section
                    key={`${index} - ${title}`}
                    title={title}
                    status={title as 'todo' | 'doing' | 'done'}
                    amount={getAmount(title)}
                    onDrop={(e) => handleOnDrop(e, title)}
                    onDragOver={(e) => handleDragOver(e)}
                >
                    {mounted &&
                        tasks
                            .filter((task) => task.status === title)
                            .map((task) => (
                                <Todo
                                    key={task.id}
                                    id={task.id}
                                    status={title as 'todo' | 'doing' | 'done'}
                                    readOnly={isReadOnly}
                                    onOutput={handleSetInput}
                                    deleteTask={() => deleteTask(task.id)}
                                    onDragStart={(e) =>
                                        handleOnDrag(e, task.id)
                                    }
                                    editTask={() =>
                                        editContentTask(task.id, task.status)
                                    }
                                >
                                    {task.content}
                                </Todo>
                            ))}
                </Section>
            ))}
        </Container>
    );
}
