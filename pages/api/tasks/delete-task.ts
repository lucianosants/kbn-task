import { client } from '@/src/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'DELETE') {
        const { id } = req.body;

        const response = await client.task.delete({
            where: {
                id,
            },
        });

        res.status(200).json(response);
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
