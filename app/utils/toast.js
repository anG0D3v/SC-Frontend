import clsx from 'clsx';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { BsCheckCircleFill, BsFillInfoCircleFill } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { ImWarning } from 'react-icons/im';
import { RiCloseCircleFill } from 'react-icons/ri';
import { CustomLabel } from '@/components';

const label = (type) => {
    if (type === 'info') {
        return 'Information';
    } else if (type === 'error') {
        return 'Error';
    } else if (type === 'warning') {
        return 'Warning';
    } else if (type === 'success') {
        return 'Success';
    }
};

const titleColor = (type) => {
    return type === 'info'
        ? 'text-primary-blue-800'
        : type === 'warning'
        ? 'text-primary-yellow-400'
        : type === 'error'
        ? 'text-primary-red-600'
        : 'text-primary-green-600';
};

const showToaster = (message, type = 'info' | 'error' | 'warning' | 'success') => {
    toast.custom((t) => (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: t.visible ? 1 : 0, scale: t.visible ? 1 : 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ bounce: 0.5, type: 'spring' }}
            className={clsx(
                'w-[25%] bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border',
                type === 'info'
                    ? 'border-blue-600'
                    : type === 'error'
                    ? 'border-red-600'
                    : type === 'warning'
                    ? 'border-yellow-600'
                    : 'border-green-600',
            )}
        >
            <div className="p-4 flex flex-1 flex-row items-start gap-3">
                <div>
                    {type === 'info' ? (
                        <BsFillInfoCircleFill size={25} color="#1E429F" />
                    ) : type === 'error' ? (
                        <RiCloseCircleFill size={25} color="red" />
                    ) : type === 'warning' ? (
                        <ImWarning size={25} color="orange" />
                    ) : (
                        <BsCheckCircleFill size={25} color="green" />
                    )}
                </div>
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <CustomLabel title="close" children={label(type)} variant="h4" addedClass={clsx('font-semibold', titleColor(type))} />
                        <CgClose size={20} color="gray" className="cursor-pointer" onClick={() => toast.dismiss(t.id)} />
                    </div>
                    <div className="mt-3">
                        <CustomLabel children={message} addedClass="font-normal text-sm" />
                    </div>
                </div>
            </div>
        </motion.div>
    ));
};

export default showToaster;
