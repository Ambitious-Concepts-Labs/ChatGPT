import React from 'react';
import Image from 'next/image'
import billing from '../assets/billing.png'
import Link from 'next/link';
import { TbFilePlus } from 'react-icons/tb';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function Billing() {
    const [isStarted, setIsStarted] = React.useState(false);

    return (
        <>
            <div className='grid items-center grid-cols-3 grid-rows-1 md:grid-cols-2 pb-10 '>
                <h1 className='text-black/60 col-start-2 justify-self-start md:col-start-1'>Billing</h1>
                <button className='col-start-3 justify-self-end md:col-start-2 md:row-start-1 md:justify-self-end w-fit bg-black px-2 py-2 rounded-sm text-white text-xs font-light flex items-center gap-2 cursor-pointer'>
                    <div className='h-4 w-4'>
                        <TbFilePlus className='h-full w-auto' />
                    </div>
                    <span className='text-xs'>
                        New document
                    </span>
                </button>
                <button className='h-5 w-5 col-start-1 row-start-1 md:hidden' onClick={console.log('yo')}>
                <RxHamburgerMenu className='h-full w-auto' />
                </button>
            </div>
            <div className="flex flex-col w-4/5 h-auto  px-5 my-4 py-5 bg-white justify-center items-center">
                {!isStarted && ( 
                    <>
                        <Image
                            src={billing} 
                            alt='billing'
                            width={500}
                        />
                        <p className='mb-10 text-black/60'>
                            You do not have any active plans 
                        </p>
                        <Link className=' mb-5 bg-yellow-400 rounded p-2 text-black/60' 
                            href={'/pricing'}>
                            Select a plan
                        </Link>
                    </>
                )}
            </div>
        </>
    )
}