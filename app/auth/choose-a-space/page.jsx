'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CustomButton, CustomCard, CustomLabel } from '@/components';
import { Routes } from '@/utils/routes';

function Page(props) {
    // Initialization
    const spaces = [
        { name: 'Ronald McDonald House London', description: 'You are about to enter a private space' },
        { name: 'Ronald McDonald House London', description: 'You are about to enter a private space' },
        { name: 'Ronald McDonald House London', description: 'You are about to enter a private space' }
    ];
    const router = useRouter();
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
          }
        }
    };
      
    const variant = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    // Functions
    const backToLogin = () => {
        router.replace(Routes.Login);
        router.push(Routes.Login)
    }

    // Rendered Components
    const cardContent = (item) => (
        <>
             <Image src="/images/house.png" height={200} width={200} alt="house" className='w-full' />
             <div className='mt-3 text-center'>
                <CustomLabel children={item?.name} variant='h6' addedClass='font-semibold' />
                <CustomLabel children={item?.description} variant='subtitle' />
             </div>
             <div className='mt-5 flex flex-1 items-center justify-center'>
                <CustomButton
                    text='Request an inivitation'
                    variant='transparent'
                    addedClass='w-full'
                />
             </div>
        </>
    )
    return (
        <div className='flex flex-col justify-center items-center h-screen py-10'>
            <div className='w-full flex flex-col justify-center p-10 items-center'>
                <Image src='/images/sc.png' alt='Support Community' height={200} width={200} />
                <CustomLabel children='Choose a Space' variant='h1' addedClass='mt-3' />
            </div>
            <motion.div 
                variants={container}
                initial="hidden"
                animate="visible"
                className='w-full grid grid-cols-1 sm:grid-cols-3 xs:grid-cols-3 items-center justify-center px-10  gap-10'
            >
                {
                    spaces.map((space, idx) => (
                        <CustomCard 
                            whileHover={{ scale: 1.1 }} 
                            key={idx} 
                            variants={variant}
                            children={cardContent(space)}
                            addedClass='hover:border hover:border-primary-color-600 hover:drop-shadow-xl'
                        />
                    ))
                }
            </motion.div>
            <CustomButton 
                text='Back to Login'
                onClick={backToLogin}
                addedClass='w-[30%] mt-20'
                variant='default'
            />
        </div>
    );
}

export default Page;