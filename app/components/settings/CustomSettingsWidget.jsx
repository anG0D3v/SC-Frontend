import clsx from 'clsx';
import PropTypes from 'prop-types';
import { CustomLabel } from '..';

CustomSettingsWidget.propTypes = {
    text: PropTypes.any,
    description: PropTypes.any,
    addedClass: PropTypes.any,
    icon: PropTypes.node,
    children: PropTypes.node
};

function CustomSettingsWidget(props) {
    return (
       <div id="root">
         <div className={clsx('bg-gray-100 rounded-xl p-7 flex items-center justify-between', props.addedClass)}>
            <div className="flex-shrink">
                <CustomLabel 
                    icon={props.icon}
                    children={props.text}
                    variant='h6'
                    description={props.description}
                />
            </div>
            {
                props.children
            }
        </div>
       </div>
    );
}

export default CustomSettingsWidget;