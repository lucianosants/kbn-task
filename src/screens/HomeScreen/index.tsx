import { DragEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { BsNodePlusFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import * as Dialog from '@radix-ui/react-dialog';

import Container from '@/src/components/Container';
import Section from '@/src/components/Section';
import Todo from '@/src/components/Todo';
import Form from '@/src/components/Form';
import Loading from '@/src/components/Loading';

import data from '@/_data/home/en.json';

import { MessageContext } from '@/src/context/MessageContext';

import { HomeScreenProps } from '@/src/@types/home-screen';
import { SessionProps } from '@/src/@types/sessionProps';

export default function HomeScreen({
    tasks,
    addTask,
    moveTask,
    editTask,
    deleteTask,
}: HomeScreenProps) {
    const { titles } = data.main;

    const [newContent, setContent] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');
    const [mounted, setMounted] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const { showMessage } = useContext(MessageContext);

    const { data: sessionData } = useSession();
    const session = sessionData as SessionProps;

    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const getAmount = (taskList: string) => {
        if (mounted) {
            return tasks?.filter((task) => task.status === taskList).length;
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

        moveTask(id, status, refreshData);

        if (session) {
            setTimeout(() => setIsLoading(false), 1300);
            setIsLoading(true);
        }
    };

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault();
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const id = session?.user?.id as string;

        addTask(newContent, refreshData, id);

        setContent('');
        showMessage('created');
    };

    const handleDelete = async (id: string) => {
        deleteTask(id, refreshData);

        showMessage('deleted');
    };

    const editContentTask = (id: string) => {
        if (isReadOnly) {
            setIsReadOnly(false);
        } else {
            editTask(id, updatedContent, refreshData);

            setIsReadOnly(true);
            showMessage('edited');
        }
    };

    const handleSetInput = (value: string) => setUpdatedContent(value);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const time = setTimeout(() => setIsLoading(false), 1000);

        setIsLoading(true);

        return () => clearTimeout(time);
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
                    amount={(getAmount(title) as number) || 0}
                    onDrop={(e) => handleOnDrop(e, title)}
                    onDragOver={(e) => handleDragOver(e)}
                >
                    {mounted &&
                        tasks
                            ?.filter((task) => task.status === title)
                            .map((task) => {
                                return (
                                    <div key={task.id}>
                                        {isLoading ? (
                                            tasks.filter(
                                                (task) => task.status,
                                            ) && <Loading />
                                        ) : (
                                            <Todo
                                                key={task.id}
                                                id={task.id}
                                                status={
                                                    title as
                                                        | 'todo'
                                                        | 'doing'
                                                        | 'done'
                                                }
                                                readOnly={isReadOnly}
                                                onOutput={handleSetInput}
                                                deleteTask={() =>
                                                    handleDelete(task.id)
                                                }
                                                onDragStart={(e) =>
                                                    handleOnDrag(e, task.id)
                                                }
                                                editTask={() =>
                                                    editContentTask(task.id)
                                                }
                                            >
                                                {task.content}
                                            </Todo>
                                        )}
                                    </div>
                                );
                            })}

                    {mounted &&
                        tasks.filter((task) => task.status === title).length ===
                            0 && (
                            <div
                                aria-label="Is empty"
                                role="log"
                                className="px-3 border border-neutral-variant-100/30 cursor-no-drop py-9 bg-neutral-variant-100/20 rounded-xl"
                            />
                        )}
                </Section>
            ))}
        </Container>
    );
}
