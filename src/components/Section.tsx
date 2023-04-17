import { ReactNode, DragEvent, HtmlHTMLAttributes } from 'react';

import { GoPrimitiveDot } from 'react-icons/go';

interface SectionProps {
    status: 'todo' | 'doing' | 'done';
    children: ReactNode;
    title: string;
    amount: number;
    onDrop: (event: DragEvent) => void;
    onDragOver: (event: DragEvent) => void;
}

export default function Section({
    status,
    children,
    title,
    amount,
    onDrop,
    onDragOver,
}: SectionProps) {
    const defaultStyles = {
        container: 'p-4 rounded-xl w-72 h-fit',
        header: 'flex items-center gap-3',
        status: 'flex items-center justify-start gap-1 px-4 rounded-full w-fit',
        title: 'block pt-1 text-sm font-bold uppercase',
        count: 'block pt-1 text-lg font-semibold',
    };

    const styles = {
        todo: {
            container: `${defaultStyles.container} bg-danger-500/20`,
            header: defaultStyles.header,
            status: `${defaultStyles.status} bg-danger-200/30`,
            icon: `text-danger-500`,
            title: `${defaultStyles.title} text-danger-100`,
            count: `${defaultStyles.count} text-danger-100`,
        },
        doing: {
            container: `${defaultStyles.container} bg-primary-600/40`,
            header: defaultStyles.header,
            status: `${defaultStyles.status} bg-primary-300/40`,
            icon: `text-primary-100`,
            title: `${defaultStyles.title} text-primary-200`,
            count: `${defaultStyles.count} text-primary-200`,
        },
        done: {
            container: `${defaultStyles.container} bg-secondary-500/30`,
            header: defaultStyles.header,
            status: `${defaultStyles.status} bg-secondary-400/50`,
            icon: `text-secondary-200`,
            title: `${defaultStyles.title} text-secondary-50`,
            count: `${defaultStyles.count} text-secondary-50`,
        },
    };

    return (
        <section className={`${styles[status].container} h-fit`}>
            <div className={styles[status].header}>
                <div className={styles[status].status}>
                    <p className={styles[status].icon}>
                        <GoPrimitiveDot fontSize={20} />
                    </p>
                    <p className={styles[status].title}>{title}</p>
                </div>

                <p className={styles[status].count}>({amount})</p>
            </div>
            <div
                className="flex flex-col gap-4 mt-3"
                onDrop={onDrop}
                onDragOver={onDragOver}
            >
                {children}
                <p className="flex items-center justify-center gap-2 text-center text-neutral-variant-100">
                    Drop here <strong className="text-3xl">+</strong>
                </p>
            </div>
        </section>
    );
}
