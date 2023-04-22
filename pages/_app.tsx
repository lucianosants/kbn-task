import '@/src/styles/globals.css';

import type { AppProps } from 'next/app';
import { ReactNode, useContext } from 'react';
import { SessionProvider } from 'next-auth/react';

import {
    MessageContext,
    MessageContextProvider,
} from '@/src/context/MessageContext';

import Nav from '@/src/patterns/Nav';
import Message from '@/src/components/Message';

import { OnlyChildren } from '@/src/@types/only-children';

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <MessageContextProvider>
                <MessageWrapper>
                    <Nav />
                    <Component {...pageProps} />
                </MessageWrapper>
            </MessageContextProvider>
        </SessionProvider>
    );
}

const MessageWrapper = ({ children }: OnlyChildren) => {
    const { message } = useContext(MessageContext);

    return (
        <>
            {message && <Message>{message}</Message>}

            {children}
        </>
    );
};
