import { OnlyChildren } from '@/src/@types/only-children';

export default function Container({ children }: OnlyChildren) {
    return (
        <div className="flex h-full gap-6 p-6 mx-auto overflow-auto max-w-7xl">
            {children}
        </div>
    );
}
