'use client';

import { BiChevronLeft } from 'react-icons/bi'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { BsDiscord } from 'react-icons/bs'

import Link from 'next/link';
import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import Button from '../../../components/Button';
import { GoogleProvider, auth } from '../../../firebase';



export function AuthSignin() {
  const [email, setEmail] = useState('');

  return (
        <div className='flex flex-col gap-2 py-4'>
            <Button
            variant="black"
            text="Sign in with Discord"
            icon={<BsDiscord size={18} />}
            // onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
            />
            <Button
            variant="black"
            text="Sign in with GitHub"
            icon={<AiFillGithub size={18}/>}
            // onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            />
            <Button
            animation
            variant="black"
            text="Sign in with Google"
            icon={<FcGoogle size={18}/>}
            onClick={async () => await signInWithPopup(auth, GoogleProvider)}
            />
            <button onClick={async () => await signInWithPopup(auth, GoogleProvider)}
            className="font-bold text-3xl animate-pulse">
            Sign In to use ChatGPT
            </button>
        </div>
  );
}
