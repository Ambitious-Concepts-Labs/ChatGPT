import React from 'react';
import Image from 'next/image'
import billing from '../assets/billing.png'
import Link from 'next/link';
import { TbFilePlus } from 'react-icons/tb';
import { RxHamburgerMenu } from 'react-icons/rx';
import Title from './Title';

export default function Billing({session}) {
    const [isStarted, setIsStarted] = React.useState(false);

    return (
        <>
            <div className='bg-[#f8f9fb] grow px-8 md:px-16 pt-7 pb-10'>
                <Title button={"Document"} title={"Billing"} session={session}/>
            </div>
            <div className="flex flex-col w-4/5 h-auto px-5 my-4 py-5 bg-white justify-center items-center">
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