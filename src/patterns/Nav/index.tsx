import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

import data from '@/_data/home/en.json';

export default function Nav() {
    const { data: session } = useSession();

    return (
        <header className=" bg-neutral-variant-700">
            <div className="flex items-center justify-between p-6 mx-auto max-w-7xl">
                <Link href="/">
                    <h1 className="text-xl font-extrabold text-transparent hover:opacity-80 bg-gradient-to-r bg-clip-text from-primary-500 to-secondary-500 w-fit">
                        {data.header.brand}
                    </h1>
                </Link>

                <div>
                    {!session ? (
                        <button
                            type="button"
                            className="px-3 py-2 font-semibold rounded-md hover:bg-primary-700 text-neutral-50 bg-primary-600"
                            aria-label="Log in with your account"
                            onClick={() => signIn()}
                        >
                            {data.header.button_login}
                        </button>
                    ) : (
                        <img
                            src={session.user?.image as string | undefined}
                            alt=""
                            className="object-cover w-12 h-12 border rounded-full cursor-pointer border-primary-500"
                            title="Sign out"
                            onClick={() => signOut()}
                        />
                    )}
                </div>
            </div>
        </header>
    );
}
