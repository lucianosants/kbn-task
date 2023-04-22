import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

import { default_font } from '@/src/lib/next-font';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import HomeScreen from '@/src/screens/HomeScreen';

import { addTask } from '@/src/utils/add-task';
import { deleteTask } from '@/src/utils/delete-task';
import { moveTask } from '@/src/utils/move-task';
import { editTask } from '@/src/utils/edit-task';
import { getTasksByUid } from '@/src/utils/get-tasks-by-uid';

import { HomeTasksProps } from '@/src/@types/tasks';

interface Props {
    tasks: HomeTasksProps;
}

export default function Tasks({ tasks }: Props) {
    return (
        <>
            <Head>
                <title>KBN Task</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`h-full ${default_font.className}`}>
                <HomeScreen
                    addTask={addTask}
                    tasks={tasks}
                    deleteTask={deleteTask}
                    moveTask={moveTask}
                    editTask={editTask}
                />
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const tasks = await getTasksByUid(session.user.id);

    return {
        props: {
            session,
            tasks,
        },
    };
};
