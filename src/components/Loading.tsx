import React from 'react';

export default function Loading() {
    return (
        <div
            aria-label="Waiting for loading"
            role="log"
            className="px-3 cursor-no-drop py-9 bg-neutral-variant-100/10 rounded-xl animate-pulse"
        />
    );
}
