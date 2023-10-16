'use client'
import { BiLink } from 'react-icons/bi';
import { CgFeed } from 'react-icons/cg';
import { FaQuestion } from 'react-icons/fa';
import { CustomSettingsWidget, CustomSwitch, CustomTemplate } from '@/components';

function Page() {
    // Initialization
    const settings = [
        { title: 'Allow users to Post on Newsfeed', description: 'by enabling this feature, users allowed to post on newsfeed', icon: <CgFeed size={20} /> },
        { title: 'Enable Ask a Question', description: 'by enabling this feature your users will be able to add/ask a question using the Homefeed', icon: <FaQuestion size={20} /> },
        { title: 'Enable Share a Link', description: 'by enabling this feature your users will be able to share a link using the Homefeed', icon: <BiLink size={20} /> }
    ]

    // Rendered Components
    const renderChildren = () => (<CustomSwitch />)
    return (
       <div>
        <CustomTemplate 
            headerTitle="Newsfeed Settings"
            showDivider
        />
        <div className='mt-6'>
           {
            settings.map((s, idx) => (
                <CustomSettingsWidget
                    key={idx} 
                    icon={s.icon}
                    text={s.title}
                    description={s.description}
                    children={renderChildren()}
                    addedClass='mb-3'
                />
            ))
           }
        </div>
       </div>
    );
}

export default Page
