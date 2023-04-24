import data from '@/_data/home/en.json';

import { FormProps } from '../@types/form';

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
                {data.form.new_task_btn}
            </button>
        </form>
    );
}
