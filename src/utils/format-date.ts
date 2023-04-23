import { Task } from '@prisma/client';

const formatDate = (tasks: Task[]) => {
    return JSON.parse(
        JSON.stringify(tasks, (key, value) =>
            value instanceof Date ? value.toISOString() : value,
        ),
    );
};

export { formatDate };
