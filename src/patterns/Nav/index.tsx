import Link from 'next/link';

import data from '@/_data/home/en.json';

export default function Nav() {
    return (
        <header className=" bg-neutral-variant-700">
            <div className="flex items-center justify-between p-6 mx-auto max-w-7xl">
                <Link href="/">
                    <h1 className="text-xl font-extrabold text-transparent hover:opacity-80 bg-gradient-to-r bg-clip-text from-primary-500 to-secondary-500 w-fit">
                        {data.header.brand}
                    </h1>
                </Link>

                <div>
                    <button
                        type="button"
                        className="px-3 py-2 font-semibold rounded-md hover:bg-primary-700 text-neutral-50 bg-primary-600"
                        aria-label="Log in with your account"
                    >
                        {data.header.button_login}
                    </button>
                </div>
            </div>
        </header>
    );
}
