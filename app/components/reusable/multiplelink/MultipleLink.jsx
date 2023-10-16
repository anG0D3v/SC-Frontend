/* eslint-disable react/jsx-key */
import PropTypes from 'prop-types';
import { HiOutlineTrash } from 'react-icons/hi';
import { CustomButton,  CustomInput, } from '../..';

MultipleLink.propTypes = { 
    variant: PropTypes.oneOf(['default']),

    // TITLE
    titleLabel: PropTypes.string,
    titlePlaceholder: PropTypes.string,

    // LINK
    linkLabel: PropTypes.string,
    linkPlaceholder: PropTypes.string,

    // HOUSE
    houseCount: PropTypes.number,
    houseElement: PropTypes.string,
    housePlaceholder: PropTypes.string,

    // VALUE   
    house: PropTypes.number,
    titleValue: PropTypes.string,
    linkValue: PropTypes.string,

    // NAME
    linkName: PropTypes.string,
    houseName: PropTypes.string,
    titleName: PropTypes.string,
};


function MultipleLink(props) {

    return (
        <div className="w-full my-3 flex flex-row justify-between flex-wrap md:flex-nowrap items-center gap-2">
            <div className="w-full p-5 flex flex-col flex-wrap gap-2">
                <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className='w-full flex'>
                        {props.houseCount > 1 &&  
                            <div className="mb-5">
                                {
                                    props.houseElement
                                }
                            </div>
                        }
                        <div className='w-full flex justify-end mb-5'>
                            <div className='flex flex-col justify-start mb-5'>
                                <CustomButton
                                    variant="transparent"
                                    buttontype="error"
                                    icon={<HiOutlineTrash size={20} color='maroon'/>}
                                />
                            
                            </div>
                        </div>
                   </div>
                    <div className="w-full my-2">
                        <CustomInput
                            name={props.titleName}
                            label={props.titleLabel}
                            placeholder={props.titlePlaceholder}
                            value={props.titleValue}
                            isRequired={true}
                        />
                    </div>
                    <div className="w-full my-2">
                        <CustomInput
                            name={props.name}
                            label={props.linkLabel}
                            placeholder={props.linkPlaceholder}
                            value={props.linkValue}
                            isRequired={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MultipleLink;