import clsx from 'clsx';
import _ from 'lodash';
import Link from 'next/link';
import PropTypes from 'prop-types';

CustomLabel.propTypes = {
    id: PropTypes.any,
    children: PropTypes.any,
    sourceLink: PropTypes.string,
    variant: PropTypes.oneOf(['text', 'link', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'default', 'subtitle']),
    addedClass: PropTypes.any,
    description: PropTypes.any,
    descriptionClass: PropTypes.any,
    icon: PropTypes.node,
    textContainerClass: PropTypes.any
};

function CustomLabel(props) {


    const renderLabel = () => {
        return (
            !_.isNil(props.variant) && _.isEqual(props.variant, 'link') 
                ?   <Link href={props.sourceLink ?? '#'} prefetch={false} className="link" {...props}>
                        {props.children}
                    </Link>
                : props.variant === 'h1' 
                    ?  <h1 id={props.id} className={clsx(props.addedClass)}>{props.children}</h1>
                    :  props.variant === 'h2'
                        ? <h2 id={props.id} className={clsx(props.addedClass)}>{props.children}</h2>
                        : props.variant === 'h3'
                            ? <h3 id={props.id} className={clsx(props.addedClass)}>{props.children}</h3>
                            :  props.variant === 'h4'
                                ? <h4 id={props.id} className={clsx(props.addedClass)}>{props.children}</h4>
                                : props.variant === 'h5'
                                    ? <h5 id={props.id} className={clsx(props.addedClass)}>{props.children}</h5>
                                    : props.variant === 'h6'
                                        ?  <h6 id={props.id} className={clsx(props.addedClass)}>{props.children}</h6>
                                        : props.variant === 'subtitle' 
                                            ?   <label id={props.id} className={clsx('subtitle', props.addedClass)}>
                                                    {props.children}
                                                </label>
                                            :   <label id={props.id} className={clsx('text-sm', props.addedClass)}>
                                                    {props.children}
                                                </label>
        );
    }
    
    
    return (
        <div className=''>
            <div className={clsx('flex items-start gap-3', props.textContainerClass)}>
                {props.icon}
                <div className='flex flex-col'>
                    { renderLabel() }
                    { props.description && <label className={clsx('text-xs text-gray-400', props.descriptionClass)}>{props.description}</label> } 
                </div>
            </div>
        </div>
    )
               
           
}

export default CustomLabel;