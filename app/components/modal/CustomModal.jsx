'use client';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { CgClose } from 'react-icons/cg';
import { CustomButton, CustomLabel } from '..';

CustomModal.propTypes = {
    headerTitle: PropTypes.any,
    headerDescription: PropTypes.any,
    headerIcon: PropTypes.node,
    children: PropTypes.any.isRequired,
    extraActions: PropTypes.node,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    footer: PropTypes.any,
    showDefaultActions: PropTypes.bool,
    addedClass: PropTypes.any
};

function CustomModal(props) {
    const { showDefaultActions = true } = props;
    // Initialization
    const defaultActions = [
        { id: 0, name: 'Close', icon: <CgClose size={15} color='black' /> }
    ]

    // Rendered Components
    const renderDefaultActions = () => 
        defaultActions.map(action => 
            <CustomButton
                title={action.name}
                addedClass='p-2 bg-gray-100 rounded hover:bg-gray-300'
                icon={action.icon}
                key={action.id}
                onClick={action.id === 0 ? props.onClose : null}
            />
        )

    return (
        <div 
            id="defaultModal" 
            aria-hidden="true"
            className={clsx('modal', props.visible ? '' : 'hidden')}
        >
            <motion.div
                animate={{ scale: props.visible ? 1 : 0, opacity: props.visible ? 1 : 0 }}
                transition={{
                    type: 'spring',
                    bounce: .4,
                    ease: 'easeOut'
                }}
                exit={{ scale: !props.visible ? 0 : 1, opacity: !props.visible ? 0 : 1  }}
                className={clsx('relative w-full max-w-2xl max-h-full', props.addedClass)}
            >
                <div className="rc-modal-content">
                    {
                        props.headerTitle &&
                        <div className={clsx('rc-modal-header', !props.showDefaultAction ? 'border-none' : '' )}>
                            {props.headerIcon && 
                                <div className='p-5 bg-gray-100 rounded-full border border-gray-300'>
                                    {props.headerIcon}
                                </div>
                            }
                            <CustomLabel 
                                children={props.headerTitle}
                                variant='h4'
                                description={props.headerDescription}
                            />
                            <div className='flex flex-1 gap-1 items-center justify-end'>
                            <>
                                {
                                    props.extraActions 
                                }
                            </>
                                {showDefaultActions && renderDefaultActions()}
                            </div>
                        </div>
                    }
                   
                    <div className="p-6 space-y-6">
                       {props.children}
                    </div>
                   
                   {
                        props.footer &&
                        <div className="rc-modal-footer">
                            {props.footer}
                        </div>
                   }
                </div>
            </motion.div>
        </div>
    );
}

export default CustomModal;