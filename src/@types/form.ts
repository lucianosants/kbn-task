import { FormEvent, ReactNode } from 'react';

export type FormProps = {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
};
