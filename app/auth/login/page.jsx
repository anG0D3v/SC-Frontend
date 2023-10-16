'use client';
import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import CryptoJs from 'crypto-js';
import _ from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import {
    CustomAuthContainer,
    CustomButton,
    CustomForm,
    CustomInput,
    CustomLabel,
    CustomOptionSelector,
} from '@/components';
import { userFulfilled, userRejected } from '@/redux/reducer/user';
import { AuthServices } from '@/services';
import { initializedCookie } from '@/utils/auth-action';
import { Routes } from '@/utils/routes';
import showToaster from '@/utils/toast';
import { decryptText, useCustomCookies } from '@/utils/utils';
import { loginValidator } from '@/validation/auth';

export default function Page() {
    
    // Initialization
    const navigate = useRouter();
    const { cookie, setCookie, removeCookie } = useCustomCookies(['email', 'password']);
    const [enableRememberMe, setEnableRememberMe] = useState(!_.isNil(cookie.email) || !_.isNil(cookie.password));
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        email: !_.isNil(cookie.email)  ? decryptText(cookie.email) : '',
        password: !_.isNil(cookie.password) ? decryptText(cookie.password) : ''
    })

    // Functions
    const loginMutation = useMutation({
        mutationFn: (data) => AuthServices.login(data)
    })

    const login = () => {
        loginMutation.mutate(
            {...credentials}, 
            { 
                onSuccess: (response) => {
                    dispatch(userFulfilled(response?.data));
                    initializedCookie(response?.data);
                    showToaster('Login Success', 'success');
                    navigate.push(Routes.Dashboard);
                },
                onError: (error) => {
                    dispatch(userRejected(error?.response?.data?.message))
                    showToaster('Something went wrong. ' + error?.response?.data?.message, 'error');
                }
            }
        )
    }

    const onInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }))
        if(enableRememberMe) {
            const encryptedCredentials = CryptoJs.AES.encrypt(value, process.env.CRYPTOJS_KEY).toString();
            setCookie(name, encryptedCredentials, { path: '/' });
        }
    },[enableRememberMe]);

    const rememberMe = useCallback(() => {
        setEnableRememberMe(prevState => !prevState);
        if(!enableRememberMe && !_.isEmpty(credentials.email) && !_.isEmpty(credentials.password)) {
            const encryptedEmail = CryptoJs.AES.encrypt(credentials.email, process.env.CRYPTOJS_KEY).toString();
            const encryptedPassword = CryptoJs.AES.encrypt(credentials.password, process.env.CRYPTOJS_KEY).toString();
            setCookie('email', encryptedEmail, { path: '/' });
            setCookie('password', encryptedPassword, { path: '/' })
        } else {
            removeCookie('email', { path: '/'});
            removeCookie('password', { path: '/'});
        }
    },[enableRememberMe, credentials])
       
    // Rendered Components
    const renderLogin =(errors, touched) => (
        <>
             <CustomInput
                name='email'
                error={touched.email && errors.email}
                placeholder="Enter Email"
                label="Email"
                value={credentials.email}
                onChange={onInputChange}
                prefixicon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 9.49951C10.7956 9.49951 11.5587 9.18344 12.1213 8.62083C12.6839 8.05822 13 7.29516 13 6.49951C13 5.70386 12.6839 4.9408 12.1213 4.37819C11.5587 3.81558 10.7956 3.49951 10 3.49951C9.20435 3.49951 8.44129 3.81558 7.87868 4.37819C7.31607 4.9408 7 5.70386 7 6.49951C7 7.29516 7.31607 8.05822 7.87868 8.62083C8.44129 9.18344 9.20435 9.49951 10 9.49951ZM3 18.4995C3 17.5803 3.18106 16.67 3.53284 15.8207C3.88463 14.9714 4.40024 14.1998 5.05025 13.5498C5.70026 12.8998 6.47194 12.3841 7.32122 12.0324C8.1705 11.6806 9.08075 11.4995 10 11.4995C10.9193 11.4995 11.8295 11.6806 12.6788 12.0324C13.5281 12.3841 14.2997 12.8998 14.9497 13.5498C15.5998 14.1998 16.1154 14.9714 16.4672 15.8207C16.8189 16.67 17 17.5803 17 18.4995H3Z"
                            fill="#677389"
                        />
                    </svg>
                }
            />

            <CustomInput
                name='password'
                value={credentials.password}
                onChange={onInputChange}
                error={touched.password && errors.password}
                placeholder="Enter Password"
                label="Password"
                type="password"
                prefixicon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5 9.49951V7.49951C5 6.17343 5.52678 4.90166 6.46447 3.96398C7.40215 3.0263 8.67392 2.49951 10 2.49951C11.3261 2.49951 12.5979 3.0263 13.5355 3.96398C14.4732 4.90166 15 6.17343 15 7.49951V9.49951C15.5304 9.49951 16.0391 9.71023 16.4142 10.0853C16.7893 10.4604 17 10.9691 17 11.4995V16.4995C17 17.0299 16.7893 17.5387 16.4142 17.9137C16.0391 18.2888 15.5304 18.4995 15 18.4995H5C4.46957 18.4995 3.96086 18.2888 3.58579 17.9137C3.21071 17.5387 3 17.0299 3 16.4995V11.4995C3 10.9691 3.21071 10.4604 3.58579 10.0853C3.96086 9.71023 4.46957 9.49951 5 9.49951ZM13 7.49951V9.49951H7V7.49951C7 6.70386 7.31607 5.9408 7.87868 5.37819C8.44129 4.81558 9.20435 4.49951 10 4.49951C10.7956 4.49951 11.5587 4.81558 12.1213 5.37819C12.6839 5.9408 13 6.70386 13 7.49951Z"
                            fill="#677389"
                        />
                    </svg>
                }
            />

                        
            <div className="flex flex-row justify-between my-2">
                
                <CustomOptionSelector checked={enableRememberMe} label="Remember Me" onChange={rememberMe} />
                <CustomLabel children="Forgot Password?" variant="link" />
            </div>

            
            <CustomButton 
                text="Continue" 
                addedclass='text-center w-50' 
                type='submit' 
                variant="default" 
                isLoading={loginMutation.isLoading}
            />

                           
            <div className="text-center">
                <div className="flex items-center">
                    <div className="flex-grow bg-gray-200 h-0.5"></div>
                    <CustomLabel children="or" variant="text" addedclass={`px-1 text-primary-gray-500`} />
                    <div className="flex-grow bg-gray-200 h-0.5"></div>
                </div>
            </div>

                           
            <div className="flex flex-row justify-center items-center flex-wrap gap-2">
                <CustomButton
                    text="Google"
                    variant="outline"
                    icon={
                        <svg className="btn-svg-img" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_1518_37844)">
                                <path
                                    d="M16.3403 8.18368C16.3403 7.63986 16.2962 7.0931 16.2021 6.55811H8.65625V9.63876H12.9774C12.7981 10.6323 12.2219 11.5113 11.3783 12.0698V14.0687H13.9563C15.4702 12.6753 16.3403 10.6176 16.3403 8.18368Z"
                                    fill="#47577F"
                                />
                                <path
                                    d="M8.65681 16.0002C10.8144 16.0002 12.634 15.2918 13.9598 14.0689L11.3818 12.07C10.6645 12.558 9.73857 12.8343 8.65975 12.8343C6.57267 12.8343 4.80305 11.4263 4.16811 9.5332H1.50781V11.5938C2.86589 14.2953 5.63201 16.0002 8.65681 16.0002V16.0002Z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M4.16461 9.53282C3.8295 8.53925 3.8295 7.46338 4.16461 6.46981V4.40918H1.50725C0.372583 6.6697 0.372583 9.33293 1.50725 11.5935L4.16461 9.53282V9.53282Z"
                                    fill="#FBBC04"
                                />
                                <path
                                    d="M8.65681 3.16595C9.79736 3.14831 10.8997 3.57749 11.7257 4.36529L14.0097 2.08126C12.5635 0.723182 10.644 -0.0234656 8.65681 5.08294e-05C5.63201 5.08294e-05 2.86589 1.70499 1.50781 4.40938L4.16517 6.47001C4.79717 4.574 6.56973 3.16595 8.65681 3.16595V3.16595Z"
                                    fill="#EA4335"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1518_37844">
                                    <rect width="16" height="16" fill="white" transform="translate(0.5 -0.000488281)" />
                                </clipPath>
                            </defs>
                        </svg>
                    }
                    onClick={(e) => {
                        e.preventDefault();
                        signIn('google');
                    }}

                />

                <CustomButton
                    text="Facebook"
                    variant="outline"
                    icon={
                        <svg className="btn-svg-img" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_1518_37851)">
                                <path
                                    d="M16.5 7.99951C16.5 3.58123 12.9183 -0.000488281 8.5 -0.000488281C4.08172 -0.000488281 0.5 3.58123 0.5 7.99951C0.5 11.9925 3.42547 15.3022 7.25 15.9023V10.312H5.21875V7.99951H7.25V6.23701C7.25 4.23201 8.44438 3.12451 10.2717 3.12451C11.1467 3.12451 12.0625 3.28076 12.0625 3.28076V5.24951H11.0538C10.06 5.24951 9.75 5.86623 9.75 6.49951V7.99951H11.9688L11.6141 10.312H9.75V15.9023C13.5745 15.3022 16.5 11.9925 16.5 7.99951Z"
                                    fill="#1B77F4"
                                />
                                <path
                                    d="M11.6141 10.312L11.9688 7.99951H9.75V6.49951C9.75 5.86686 10.06 5.24951 11.0538 5.24951H12.0625V3.28076C12.0625 3.28076 11.147 3.12451 10.2717 3.12451C8.44438 3.12451 7.25 4.23201 7.25 6.23701V7.99951H5.21875V10.312H7.25V15.9023C8.0783 16.0319 8.9217 16.0319 9.75 15.9023V10.312H11.6141Z"
                                    fill="white"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1518_37851">
                                    <rect width="16" height="16" fill="white" transform="translate(0.5 -0.000488281)" />
                                </clipPath>
                            </defs>
                        </svg>
                    }
                    onClick={(e) => {
                        e.preventDefault();
                        signIn('facebook');
                    }}
                />
            </div>

                          
            <div className="flex flex-col md:flex-row justify-center items-center gap-1">
                <CustomLabel children="Don't have an account yet?" variant="text" addedclass={`text-primary-gray-500 text-xs md:text-base`} />
                <CustomLabel children="Sign up" sourceLink={Routes.RequestInvitation} variant="link" addedclass='font-semibold text-xs md:text-sm' />
            </div>

            <div className="flex flex-col justify-center items-center gap-1">
                <CustomLabel
                    text="Check out our app"
                    variant="text"
                    addedclass={`font-semibold text-primary-gray-900 mb-3 text-xs md:text-sm`}
                />

                <div className="w-full flex flex-row justify-center items-center gap-2">
                    <a
                        href="https://play.google.com/store/apps"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row items-center bg-black text-white rounded-lg px-3 py-1 w-[130px] md:w-[40%] md:px-3 md:py-2 gap-2"
                    >
                        <i>
                            <svg
                                className="w[20px] h-[20px] md:w-[25px] md:h-[25px]"
                                viewBox="-9 0 274 274"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                preserveAspectRatio="xMidYMid"
                                fill="#000000"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                                <g id="SVGRepo_iconCarrier">
                                    {' '}
                                    <g>
                                        {' '}
                                        <path
                                            d="M188.81319,178.874645 C221.272218,161.051727 245.880297,147.470853 248.001319,146.415618 C254.78648,142.806714 261.79324,133.256838 248.001319,125.838536 C243.548228,123.506467 219.573289,110.347687 188.81319,93.3795092 L146.171146,136.443648 L188.81319,178.874645 Z"
                                            fill="#FFD900"
                                        >
                                            {' '}
                                        </path>{' '}
                                        <path
                                            d="M146.171146,136.443648 L10.3940643,273.286517 C13.5808739,273.708611 17.1792251,272.864423 21.4212696,270.532353 C30.3274526,265.657168 124.739324,214.098388 188.81319,178.885198 L146.171146,136.443648 Z"
                                            fill="#F43249"
                                        >
                                            {' '}
                                        </path>{' '}
                                        <path
                                            d="M146.171146,136.443648 L188.81319,93.5905562 C188.81319,93.5905562 30.9711459,7.45172685 21.4212696,2.36549437 C17.8229184,0.233919759 13.7919209,-0.399221214 10.1830173,0.233919759 L146.171146,136.443648 Z"
                                            fill="#00EE76"
                                        >
                                            {' '}
                                        </path>{' '}
                                        <path
                                            d="M146.171146,136.443648 L10.1830173,0.233919759 C4.6641385,1.51075405 0,6.38593954 0,16.3579099 C0,32.270853 0,244.003747 0,257.162527 C0,266.290309 3.60890354,272.864423 10.3940643,273.497564 L146.171146,136.443648 Z"
                                            fill="#00D3FF"
                                        >
                                            {' '}
                                        </path>{' '}
                                    </g>{' '}
                                </g>
                            </svg>
                        </i>
                        <div className="flex flex-col items-start">
                            <span className="text-[8px] md:text-xs 2xl:text-[9px]">GET IT ON</span>
                            <span className="text-[12px] md:text-sm font-semibold">Google Play</span>
                        </div>
                    </a>

                    <a
                        href="https://play.google.com/store/apps"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row items-center bg-black text-white rounded-lg px-3 py-1 w-[130px] md:w-[40%] md:px-3 md:py-2 gap-2"
                    >
                        <i>
                            <svg
                                className="w[20px] h-[20px] md:w-[25px] md:h-[25px]"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.0306 12.4684C13.7886 13.0274 13.5022 13.5419 13.1704 14.015C12.718 14.6599 12.3477 15.1063 12.0622 15.3542C11.6198 15.7611 11.1457 15.9695 10.6381 15.9814C10.2737 15.9814 9.83417 15.8777 9.32258 15.6673C8.80931 15.4579 8.33762 15.3542 7.90633 15.3542C7.454 15.3542 6.96888 15.4579 6.44998 15.6673C5.93029 15.8777 5.51164 15.9873 5.19155 15.9981C4.70475 16.0189 4.21953 15.8046 3.7352 15.3542C3.42608 15.0846 3.03942 14.6224 2.57623 13.9676C2.07926 13.2683 1.67068 12.4575 1.35059 11.5331C1.00778 10.5346 0.835938 9.56772 0.835938 8.63165C0.835938 7.55938 1.06763 6.63457 1.53172 5.85958C1.89645 5.23708 2.38167 4.74604 2.98895 4.38555C3.59624 4.02507 4.25242 3.84137 4.95907 3.82962C5.34572 3.82962 5.85277 3.94922 6.48287 4.18428C7.11119 4.42012 7.51464 4.53972 7.69152 4.53972C7.82376 4.53972 8.27195 4.39987 9.03172 4.12107C9.75022 3.86251 10.3566 3.75545 10.8534 3.79762C12.1995 3.90626 13.2109 4.43691 13.8834 5.39293C12.6795 6.12239 12.084 7.14409 12.0958 8.45476C12.1067 9.47567 12.477 10.3252 13.2049 10.9998C13.5348 11.3129 13.9032 11.5548 14.313 11.7267C14.2242 11.9844 14.1303 12.2313 14.0306 12.4684V12.4684ZM10.9433 0.319603C10.9433 1.11979 10.6509 1.86691 10.0682 2.55845C9.36505 3.38055 8.51451 3.8556 7.59217 3.78063C7.58041 3.68464 7.5736 3.5836 7.5736 3.47743C7.5736 2.70926 7.90801 1.88716 8.50186 1.21498C8.79835 0.874648 9.17542 0.591664 9.63269 0.365922C10.089 0.143548 10.5206 0.0205711 10.9265 -0.000488281C10.9383 0.106484 10.9433 0.213462 10.9433 0.319593V0.319603Z"
                                    fill="#fff"
                                />
                            </svg>
                        </i>
                        <div className="flex flex-col items-start">
                            <span className="text-[8px] md:text-xs 2xl:text-[9px]">Download on the</span>
                            <span className="text-[12px] md:text-sm font-semibold">App Store</span>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )

    const renderHeader = () => (
        <div className="mb-5 flex flex-col justify-center items-center">
            <Image src='/images/sc.png' alt='Support Community' height={250} width={250} />
            <CustomLabel variant='h3' addedClass='font-semibold mt-3' children='Welcome' />
        </div>
    )

    const renderBackground = () => (
        <div className="w-full bg-[url('/images/login-bg.png')] bg-cover bg-no-repeat bg-center h-[50vh] bg-black">
            <div className="absolute inset-0 bg-primary-gray-800 opacity-50 h-[50vh]"></div>
        </div>
    )

    const renderChildren = () => (
        <CustomForm 
            initialValues={credentials}
            onSubmit={login}
            validationSchema={loginValidator}
            content={(errors, touched) => renderLogin(errors, touched)}
        />
    )

    return (
       <CustomAuthContainer 
            header={renderHeader()}
            background={renderBackground()}
            children={renderChildren()}
       />
    );
}