import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

CustomSvg.propTypes = {
    source: PropTypes.string.isRequired
};

function CustomSvg(props) {
    return (
        <Image src={props.source} alt='SVG' width={18} height={18} />
    );
}

export default CustomSvg;