import { DefaultSession } from 'next-auth';

export type SessionProps = {
    user?: DefaultSession['user'] & {
        id: string | null;
    };
};
