import Nav from '@/src/patterns/Nav';
import '@/src/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <Nav />
            <Component {...pageProps} />
        </SessionProvider>
    );
}
