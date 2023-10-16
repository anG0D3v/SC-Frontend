import Image from 'next/image';
import Link from 'next/link';
import { CustomLabel } from '@/components';

export default function NotFound() {
    return (
      <div className="grid grid-cols-1 h-screen sm:grid-cols-2">
        <div className='w-full flex items-center justify-center'>
            <div className='w-full p-10 sm:w-3/5 sm:p-0'>
                <CustomLabel variant="h1" children="Ooops Sorry!" addedclass='text-primary-color-blue-800 text-6xl' />
                <CustomLabel variant="h2" children="The page you are trying to access cannot be found" addedclass='text-primary-color-blue-800 text-3xl mt-3' />

                <div className='mt-10'>
                    <CustomLabel 
                        variant="subtitle" 
                        text={
                            <ul>
                                <li>Make sure the url is correct</li>
                                <li>Maybe the link is broken</li>
                            </ul>
                        } 
                        addedclass='text-lg' 
                    />
                  
                </div>

                <div className="mt-5">
                    <Link href='/'> Go back to page</Link>
                </div>
            </div>
        </div>
        <div className='flex items-center justify-center '>
            <Image src='/images/404.png' alt='picture' height={1000} width={1000} />
        </div>
      </div>
    )
  }