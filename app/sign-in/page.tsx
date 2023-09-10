'use client';

import Button from '../../components/Button';
import { BiChevronLeft } from 'react-icons/bi'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { BsDiscord } from 'react-icons/bs'

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('');

  return (
    <div className='grid min-h-screen grid-cols-2'>
      <div className='flex flex-col'>
        <Link href={'/'} className='px-4 py-2'>
          <Button variant='outline' size='xs'>
            <BiChevronLeft size={18} />
            Home
          </Button>
        </Link>
        <div className='my-auto grid place-items-center px-4 py-10'>
          <div className='flex w-full max-w-md flex-col'>
            <div className='flex flex-col pb-2'>
              <p className='text-2xl font-medium'>Sign in</p>
              <p>Choose a social provider to sign in with.</p>
            </div>
            <div className='flex flex-col gap-2 py-4'>
              <Button
                variant={'black'}
                text={"Sign in with Discord"}
                icon={<BsDiscord/>}
                onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
              />
              <Button
                variant={'black'}
                text={"Sign in with GitHub"}
                icon={<AiFillGithub/>}
                onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
              />
              { 
              <Button
                variant={'black'}
                text={"Sign in with Google"}
                icon={<FcGoogle/>}
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              />     
              }
                       </div>
          </div>
        </div>
      </div>
      <div className='grid place-items-center bg-black'>
        <div className='invert rounded-md'>
          <img src='/vercel.svg' className='h-14 w-14 ' />
        </div>
      </div>
    </div>
  );
}
