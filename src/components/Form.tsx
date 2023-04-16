import { FormEvent, ReactNode } from 'react';

interface FormProps {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
}

export default function Form({ handleSubmit, children }: FormProps) {
    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-6 mt-6"
            autoComplete="off"
        >
            {children}

            <button
                type="submit"
                className="px-3 py-2 font-semibold rounded-md hover:bg-primary-700 text-neutral-50 bg-primary-600"
            >
                Add Task
            </button>
        </form>
    );
}
