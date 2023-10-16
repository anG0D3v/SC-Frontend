import clsx from 'clsx';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { CustomButton, CustomLabel, CustomTabs } from '..';

CustomTemplate.propTypes = {
    headerTitle: PropTypes.string,
    headerClass: PropTypes.any,
    headerActionButtons: PropTypes.arrayOf(PropTypes.object),
    tabItems: PropTypes.array,
    actionButtons: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.any,
    onSelectTab: PropTypes.any,
    showDivider: PropTypes.bool
};

function CustomTemplate(props) {
    const { showDivider = false } = props;
    
    return (
        <div>
            {
                /* ----- RENDER HEADER TITLE AND HEADER ACTION BUTTONS ----- */
                props.headerTitle &&
                    <div className='header-container'>
                        <div className={clsx('w-full', !_.isEmpty(props.headerActionButtons) && 'sm:w-3/4')}>
                            <CustomLabel id='page-title' variant='h2' children={props.headerTitle} addedclass={props.headerClass} />
                        </div>
                        { 
                            props.headerActionButtons &&
                            <div className='w-full sm:w-1/4 flex flex-row items-center justify-end gap-3'>
                                {props.headerActionButtons?.map((btn, idx) => 
                                     <CustomButton 
                                        {...btn}
                                        id={`header-button-${btn?.key}`} 
                                        key={btn?.key} 
                                        addedclass={clsx('text-sm flex items-center justify-center', btn?.addedclass)}
                                    />
                                )}
                            </div>
                        }
                    </div> 
            }
            {
                /* ----- RENDER TABS ----- */
                props.tabItems && <div className='mt-3'>
                    <CustomTabs onSelectTab={props.onSelectTab} items={props.tabItems}  />
                </div>
            }
            {
                showDivider && 
                <div className="w-full my-5 h-[1.5px] bg-gray-200 rounded"></div>
            }
            {   
                /* ----- RENDER ACTION BUTTONS ----- */
                props.actionButtons &&
                    <div className='inline-flex items-center justify-end w-full'>
                        <div className='w-full flex flex-row justify-end gap-3'>
                            {
                                props.actionButtons?.map((action, idx) => 
                                    <CustomButton 
                                        {...action}
                                        id={`action-button-${action?.key}`} 
                                        key={action?.key} 
                                        addedclass={clsx('text-sm flex items-center justify-center', action?.addedclass)}
                                    />
                                )
                            }
                        </div>
                    </div>
            }
            {
                /* ----- RENDER CHILDREN ----- */
                props.children &&
                <div id='main-children' className='my-10 w-full'>
                    { props.children }
                </div>
            }
        </div>
    );
}

export default CustomTemplate;