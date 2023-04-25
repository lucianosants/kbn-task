import '@/src/styles/globals.css';

import type { AppProps } from 'next/app';
import { useContext } from 'react';
import { SessionProvider } from 'next-auth/react';

import {
    MessageContext,
    MessageContextProvider,
} from '@/src/context/MessageContext';

import Header from '@/src/patterns/Header';
import Message from '@/src/components/Message';
import Footer from '@/src/patterns/Footer';

import { OnlyChildren } from '@/src/@types/only-children';

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <MessageContextProvider>
                <MessageWrapper>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </MessageWrapper>
            </MessageContextProvider>
        </SessionProvider>
    );
}

const MessageWrapper = ({ children }: OnlyChildren) => {
    const { message } = useContext(MessageContext);

    return (
        <>
            {message &&
                message.map((message, index) => (
                    <Message key={index}>{message}</Message>
                ))}

            {children}
        </>
    );
};
