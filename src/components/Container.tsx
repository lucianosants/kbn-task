import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <div className="flex h-full gap-6 p-6 mx-auto overflow-auto max-w-7xl">
            {children}
        </div>
    );
}
