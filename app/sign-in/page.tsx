'use client';

import Button from '../../components/Button';
import { BiChevronLeft } from 'react-icons/bi'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { BsDiscord } from 'react-icons/bs'

import Link from 'next/link';
import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { GoogleProvider, auth } from '../../firebase';



export default function Page() {
  const [email, setEmail] = useState('');

  return (
    <div className='grid min-h-screen grid-cols-2'>
      <div className='flex flex-col'>
        <Link href={'/'} className='px-4 py-2'>
          <Button 
          variant={"white"}
          icon={<BiChevronLeft size={18} />}
          text={"Home"}
          />
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
                icon={<BsDiscord size={18} />}
                // onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
              />
              <Button
                variant={'black'}
                text={"Sign in with GitHub"}
                icon={<AiFillGithub size={18}/>}
                // onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
              />
              { 
              <Button
                animation={true}
                variant={'black'}
                text={"Sign in with Google"}
                icon={<FcGoogle size={18}/>}
                onClick={() => signInWithPopup(auth, GoogleProvider)}
              />     
              }
              <button onClick={() => signInWithPopup(auth, GoogleProvider)}
              className="font-bold text-3xl animate-pulse">
                Sign In to use ChatGPT
              </button>
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
