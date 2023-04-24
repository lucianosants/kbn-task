import data from '@/_data/home/en.json';

export default function Loading() {
    return (
        <div
            aria-label={data.loading_aria_label}
            role="log"
            className="px-3 cursor-no-drop py-9 bg-neutral-variant-100/10 rounded-xl animate-pulse"
        />
    );
}
