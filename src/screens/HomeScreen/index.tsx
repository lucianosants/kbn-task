import { DragEvent, FormEvent, useState } from 'react';
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
    const [content, setContent] = useState('');

    const { tasks, setTasks, addTask } = useLocalData();

    const getAmount = (taskList: string) =>
        tasks.filter((tasks) => tasks.status === taskList).length;

    const handleOnDrag = (event: DragEvent, id: string) => {
        event.dataTransfer.setData('text/plain', id);
        event.dataTransfer.dropEffect = 'move';
    };

    const handleOnDrop = (event: DragEvent, status: string) => {
        event.preventDefault();

        const id = event.dataTransfer.getData('text/plain');

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
    };

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault();
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addTask(content);

        setContent('');
        alert('A new tasks created!');
    };

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
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </label>
                        </Form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            <Section
                title={titles[0]}
                status="todo"
                amount={getAmount(titles[0])}
                onDrop={(e) => handleOnDrop(e, 'todo')}
                onDragOver={(e) => handleDragOver(e)}
            >
                {tasks
                    .filter((task) => task.status === titles[0])
                    .map((task) => (
                        <Todo
                            key={task.id}
                            status="todo"
                            onDragStart={(e) => handleOnDrag(e, task.id)}
                        >
                            {task.content}
                        </Todo>
                    ))}
            </Section>

            <Section
                title={titles[1]}
                status="doing"
                amount={getAmount(titles[1])}
                onDrop={(e) => handleOnDrop(e, 'doing')}
                onDragOver={(e) => handleDragOver(e)}
            >
                {tasks &&
                    tasks
                        .filter((task) => task.status === titles[1])
                        .map((task) => (
                            <Todo
                                key={task.id}
                                status="doing"
                                onDragStart={(e) => handleOnDrag(e, task.id)}
                            >
                                {task.content}
                            </Todo>
                        ))}
            </Section>

            <Section
                title={titles[2]}
                status="done"
                amount={getAmount(titles[2])}
                onDrop={(e) => handleOnDrop(e, 'done')}
                onDragOver={(e) => handleDragOver(e)}
            >
                {tasks &&
                    tasks
                        .filter((task) => task.status === titles[2])
                        .map((task) => (
                            <Todo
                                key={task.id}
                                status="done"
                                onDragStart={(e) => handleOnDrag(e, task.id)}
                            >
                                {task.content}
                            </Todo>
                        ))}
            </Section>
        </Container>
    );
}
