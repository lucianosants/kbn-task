import { ReactNode } from 'react';

import { GoPrimitiveDot } from 'react-icons/go';

interface SectionProps {
    status: 'todo' | 'doing' | 'done';
    children: ReactNode;
    title: string;
    amount: number;
}

export default function Section({
    status,
    children,
    title,
    amount,
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
            container: `${defaultStyles.container} bg-danger-500`,
            header: defaultStyles.header,
            status: `${defaultStyles.status} bg-danger-200`,
            icon: `text-danger-600`,
            title: `${defaultStyles.title} text-danger-600`,
            count: `${defaultStyles.count} text-danger-50`,
        },
        doing: {
            container: `${defaultStyles.container} bg-primary-600`,
            header: defaultStyles.header,
            status: `${defaultStyles.status} bg-primary-200`,
            icon: `text-primary-700`,
            title: `${defaultStyles.title} text-primary-600`,
            count: `${defaultStyles.count} text-primary-200`,
        },
        done: {
            container: `${defaultStyles.container} bg-secondary-300`,
            header: defaultStyles.header,
            status: `${defaultStyles.status} bg-secondary-600`,
            icon: `text-secondary-900`,
            title: `${defaultStyles.title} text-secondary-900`,
            count: `${defaultStyles.count} text-secondary-900`,
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
            <div className="flex flex-col gap-4 mt-3">{children}</div>
        </section>
    );
}
