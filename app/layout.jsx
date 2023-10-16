import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import CookieProvider from './providers/cookie/CookieProvider';
import QueryProvider from './providers/query-provider/QueryProvider';
import ReduxProvider from './providers/redux/ReduxProvider';
import '@/styles/main.css';

export const metadata = {
    title: 'Support Community Web App',
    description: 'Support Community web app',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Head>
                <link
                    rel="shortcut icon"
                    href="favicon.ico"
                    type="image/x-icon"
                />
            </Head>
            <body>
                <div id="root">
                    <ReduxProvider>
                        <QueryProvider>
                            <CookieProvider>
                                {children}
                            </CookieProvider>
                        </QueryProvider>
                    </ReduxProvider>
                </div>
            </body>
        </html>
    );
}

RootLayout.propTypes = {
    children: PropTypes.any,
};
