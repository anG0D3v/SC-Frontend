import clsx from 'clsx';
import PropTypes from 'prop-types';
import { CustomLabel } from '..';

CustomSwitch.propTypes = {
    addedClass: PropTypes.any,
    text: PropTypes.string,
    labelClass: PropTypes.any,
    onChange: PropTypes.func,
    value: PropTypes.any
};

function CustomSwitch(props) {
    return (
        <div className={clsx('flex p-2 rounded', props.addedClass)}>
          <label className={clsx('toggle-label', props.labelClass)}>
            <input type="checkbox" value={props.value} onChange={props.onChange} className="sr-only peer" />
            <div className="w-9 h-5 bg-gray-400/50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
            <CustomLabel children={props.text} addedClass='ml-3 text-sm text-gray-900 dark:text-gray-300' />
          </label>
        </div>
    );
}

export default CustomSwitch;