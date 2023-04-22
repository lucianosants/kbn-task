import { OnlyChildren } from '../@types/only-children';

export default function Message({ children }: OnlyChildren) {
    return (
        <div className="fixed z-10 w-full py-6 bg-transparent pointer-events-none">
            <div className="px-6 py-4 mx-auto rounded-2xl bg-neutral-variant-100 backdrop-blur-xl w-fit message">
                <h1>{children}</h1>
            </div>
        </div>
    );
}
