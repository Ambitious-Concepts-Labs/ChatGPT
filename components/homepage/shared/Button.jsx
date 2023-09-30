"use client";

import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { RxArrowTopRight } from 'react-icons/rx'
import { GoogleProvider } from '../../../firebase';

export default function Button ({ text, variant }) {
  const sharedClasses = 'group flex items-center rounded-full gap-1 justify-center px-7 py-2.5 cursor-pointer transition-all drop-shadow-md  hover:shadow-md font-medium tracking'

  const variantClasses = variant === 'white' ? 'font-vietnam text-[#01695D] bg-white' : 'btn text-white'
  return (
    <div onClick={async () => await signInWithPopup(GoogleProvider)} >
      <div className={`${sharedClasses  } ${  variantClasses}`}>
        <div className='group-hover:underline underline-offset-2 decoration-1 decoration-white/30 tracking-tight'>{text}</div>
        <div className='font-medium text-xl flex mt-1'>
          <RxArrowTopRight />
        </div>
      </div>
    </div>
  )
}
