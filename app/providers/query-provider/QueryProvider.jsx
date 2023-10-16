'use client';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PropTypes from 'prop-types';

QueryProvider.propTypes = {
    children: PropTypes.any,
};


function QueryProvider(props) {
    const [client] = useState(new QueryClient(),[]);

    return (
        <QueryClientProvider client={client}>
            {props.children}
            {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
    );
}

export default QueryProvider;
