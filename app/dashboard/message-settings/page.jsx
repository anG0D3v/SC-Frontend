'use client'
import { BiChat } from 'react-icons/bi';
import { CustomSettingsWidget, CustomSwitch, CustomTemplate } from '@/components';

function Page() {

    // Rendered Components
    const renderChildren = () => (<CustomSwitch />)
    return (
       <div>
        <CustomTemplate 
            headerTitle="Message Settings"
            showDivider
        />
        <div className='mt-6'>
           <CustomSettingsWidget 
            icon={<BiChat size={20} />}
            text='House Chat'
            description='by enabling this feature your users will be able to add/ask a question using the Homefeed'
            children={renderChildren()}
           />
        </div>
       </div>
    );
}

export default Page
