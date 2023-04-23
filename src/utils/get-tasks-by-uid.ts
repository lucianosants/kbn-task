import { client } from '../lib/prisma';
import { formatDate } from './format-date';

const getTasksByUid = async (uid: string | undefined) => {
    try {
        const response = await client.task.findMany({
            where: {
                uid: uid,
            },

            orderBy: {
                createdAt: 'asc',
            },
        });

        return formatDate(response);

        // return formattedTasks;
    } catch (error) {
        console.log(error);
    }
};

export { getTasksByUid };
