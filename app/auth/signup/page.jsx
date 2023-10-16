'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'react-phone-input-2/lib/style.css';
import { CustomAuthContainer, CustomButton, CustomForm, CustomInput, CustomLabel, CustomPhoneInput, CustomTextArea } from '@/components';
import { AuthContext } from '@/context/auth';
import { Routes } from '@/utils/routes';
import { requestAnInvitationValidator } from '@/validation/auth';


function Page() {
    // Initialization
    const [invitationInfo, setInvitationInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        introduction: ''
    });
    const router = useRouter();

    // Functions
    const memoizedInvitationInfo = useMemo(() => invitationInfo, [invitationInfo]);

    const onHandleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setInvitationInfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    },[])

    const onCancel = useCallback(() => {
        router.replace(Routes.Login);
        router.push(Routes.Login);
    },[])

    const navigateToSpace = () => {
        router.push(Routes.ChooseASpace)
    }

    const onChangePhoneNumber = (phone) => {
       setInvitationInfo(prevState => ({
        ...prevState,
        phone
       }))
    }

    // Rendered Components
    const renderHeader = () => (
        <div className="mb-5 flex flex-col justify-center items-center">
            <CustomLabel variant='h3' addedClass='font-semibold' children='Request for an Invitation' />
        </div>
    )

    const renderBackground = () => (
        <div className="w-full bg-[url('/images/request_for_an_invitation.png')] bg-cover bg-no-repeat bg-center h-[50vh] bg-black">
            <div className="absolute inset-0 bg-primary-gray-800 opacity-50 h-[50vh]"></div>
        </div>
    )

    const renderContent = () => (
        <CustomForm 
            initialValues={memoizedInvitationInfo}
            validationSchema={requestAnInvitationValidator}
            onSubmit={navigateToSpace}
            content={(errors, touched) => formContent(errors, touched)}
        />
    )

    const formContent = (errors, touched) => 
        <>
            <div className='w-full'>
                <CustomInput 
                    maxLength={45}
                    size='small'
                    name='firstName'
                    placeholder="Type the first name here"
                    label='First Name'
                    error={touched.firstName && errors.firstName}
                    onChange={onHandleInputChange}
                />

                <CustomInput
                    addedClass='mt-5' 
                    size='small'
                    maxLength={45}
                    name='lastName'
                    placeholder="Type the last name here"
                    label='Last Name'
                    error={touched.lastName && errors.lastName}
                    onChange={onHandleInputChange}
                />

                <CustomInput
                    addedClass='mt-5' 
                    maxLength={45}
                    size='small'
                    name='email'
                    placeholder="Type the email address here"
                    label='Email Address'
                    error={touched.email && errors.email}
                    onChange={onHandleInputChange}
                />


               <div className="mt-5">
                    <CustomLabel children='Phone Number' />
                    <CustomPhoneInput 
                        onChange={onChangePhoneNumber}
                        error={touched.phone && errors.phone}
                    />
               </div>
               <CustomTextArea 
                    label='How did you know about us?'
                    placeholder='Type Here'
                    addedClass='mt-5'
                    rows={5}
               />

               <CustomButton text='Next' variant='default' type='submit' addedClass='w-full mt-3' />
               <CustomButton text='Cancel' onClick={onCancel} variant='transparent' addedClass='w-full mt-3 bg-gray-200' />
            </div>
        </>
    
    
    return (
      <AuthContext.Provider value={memoizedInvitationInfo}>
        <CustomAuthContainer 
            background={renderBackground()}
            header={renderHeader()}
            children={renderContent()}
        />
      </AuthContext.Provider>
    );
}

export default Page;