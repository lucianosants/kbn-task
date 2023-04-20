import { client } from '../lib/prisma';

const getTasksByUid = async (uid: string | undefined) => {
    try {
        const response = await client.task.findMany({
            where: {
                uid: uid,
            },
        });

        return response;
    } catch (error) {
        console.log(error);
    }
};

export { getTasksByUid };
