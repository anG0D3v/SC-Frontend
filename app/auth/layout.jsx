import React from 'react';
import PropTypes from 'prop-types';
import { Toaster } from 'react-hot-toast';
import '@/styles/main.css';

export const metadata = {
    title: 'Support Community | Authentication',
    description: 'Support Community web app',
};

export default function AuthLayout({ children }) {
    return (
       <div id='root'>
            <Toaster
                position='top-right'
                reverseOrder={false}
            />
            {children}
       </div>
    );
}

AuthLayout.propTypes = {
    children: PropTypes.any,
};
