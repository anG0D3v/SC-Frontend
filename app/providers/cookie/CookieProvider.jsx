'use client';
import PropTypes from 'prop-types';
import { CookiesProvider } from 'react-cookie';

CookieProvider.propTypes = {
    children: PropTypes.any
};

function CookieProvider(props) {
    return (
        <CookiesProvider>
            {props.children}
        </CookiesProvider>
    );
}

export default CookieProvider;