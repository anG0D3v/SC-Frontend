'use client'
import { useCallback, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';
import { CustomButton, CustomForm, CustomInput, CustomLabel, CustomSelect } from '@/components';
import { DEFAULT_INPUT_MAX_LENGTH, LANGUAGES } from '@/utils/constants';
import { createValidator } from '@/validation/book-a-bed';

function Page(props) {
    // Initialization
    const spaces = [
        { key: 0, label: 'Ronald McDonald Family Room CHOC at Mission', value: 1},
        { key: 1, label: 'Ronald McDonald Family Room CHOC at Missions', value: 2},
    ]
    const languages = [
        { key: 0, label: 'English', value: LANGUAGES.EN },
        { key: 1, label: 'Spanish', value: LANGUAGES.ES },
    ]

    const [info, setInfo] = useState({
        title: '',
        link: '',
        languageId: '',
        spaceId: ''
    });

    // Functions
    const onSelectSpace = useCallback((item) => {
       setInfo(prevState => ({
        ...prevState,
        spaceId: item.value
       })) 
    },[])

    const onSelectLanguage = useCallback((item) => {
       setInfo(prevState => ({
        ...prevState,
        languageId: item.value
       })) 
    },[])

    const onInputChanged = useCallback((e) => {
        const { value, name } = e.target;
        setInfo(prevState => ({
            ...info,
            [name]: value
        }))
    })

    const onSubmit = () => {
       // perform submit
    }

    // Rendered Components
    const renderedRequiredLabelWithAsterisk = (label) => (
        <span className='font-semibold'>{label} <span className='text-red-600'>*</span></span>
    )
    const renderForm = (errors, touched) => (
        <div className='space-y-10'>
             <div className='flex gap-2 justify-between'>
                <div className='flex-grow'>
                    <CustomLabel 
                        variant='h2' 
                        children='Book a bed' 
                        description={<span className='italic'>All fields marked with an asterisk <span className='text-red-600'>(*)</span> are required</span>}
                    />
                </div>
                <div className='flex-1 space-y-2'>
                    <CustomSelect
                        error={touched.spaceId && errors.spaceId}
                        label={renderedRequiredLabelWithAsterisk('Space')}
                        labelClass='font-semibold' 
                        onChange={onSelectSpace} 
                        name='spaceId'
                        items={spaces}
                    />
                    <CustomSelect 
                        error={touched.languageId && errors.languageId}
                        label={renderedRequiredLabelWithAsterisk('Language')}
                        labelClass='font-semibold' 
                        onChange={onSelectLanguage} 
                        name='languageId'
                        items={languages ?? []} 
                    />
                </div>
            </div>
            <div className='border border-gray-500/20 rounded-lg p-5 space-y-5 mt-5 bg-white'>
             <div className='text-right flex flex-row space-x-3 items-end justify-end'>
                <CustomButton 
                    icon={<BiEdit />}
                    text='Edit'
                    variant='transparent'
                />
                 <CustomButton 
                    icon={<FaTrashAlt />}
                    text='Delete'
                    variant='transparent'
                />
             </div>
             <CustomInput 
                maxLength={DEFAULT_INPUT_MAX_LENGTH}
                error={touched.title && errors.title}
                isRequired
                label='Apply to Camp Title'
                placeholder='Camp on night'
                name='title'
                onChange={onInputChanged}
                labelClass='font-semibold'
                value={info.title}
            />
            <CustomInput 
                maxLength={DEFAULT_INPUT_MAX_LENGTH}
                error={touched.link && errors.link}
                isRequired
                label='Apply to Camp Link'
                placeholder='https://www.sample.com'
                name='link'
                onChange={onInputChanged}
                labelClass='font-semibold'
                value={info.link}
            />
            </div>
            <div className='text-right space-x-3'>
                <CustomButton 
                    text='Cancel'
                    variant='transparent'
                />
                <CustomButton 
                    text='Save'
                   type='submit'
                    variant='default'
                />
            </div>
        </div>
    )

    return (
        <div>
            <div >
                <CustomForm 
                    initialValues={info}
                    onSubmit={onSubmit}
                    validationSchema={createValidator}
                    content={(errors, touched) => renderForm(errors, touched)}
                />
            </div>
        </div>
    );
}

export default Page;