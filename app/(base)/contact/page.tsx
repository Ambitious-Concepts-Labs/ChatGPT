"use client"

import Link from 'next/link';
import Button from '../../../components/Button';

export default function Page() {
  return (
    <>
      <div className='m-auto mx-auto w-full max-w-7xl px-4 '>
        <div className='flex flex-col py-20'>
          <p className='font-display text-xs font-semibold uppercase tracking-wide'>
            Contact us
          </p>
          <p className='bg-gradient-to-r from-black to-zinc-600 bg-clip-text py-4 text-4xl font-semibold text-transparent'>
            Let's get in touch
          </p>
          <p className='text-base font-normal text-neutral-600'>
            We can't wait to hear from you.
          </p>
        </div>
        <div className='grid grid-cols-3 gap-x-8 border-y border-neutral-200 py-10'>
          <div className='flex flex-col'>
            <p className='text-sm font-semibold text-neutral-800'>Support</p>
            <p className='text-neutral-600'>support@example.com</p>
          </div>
          <div className='flex flex-col'>
            <p className='text-sm font-semibold text-neutral-800'>Careers</p>
            <p className='text-neutral-600'>careers@example.com</p>
          </div>
          <div className='flex flex-col'>
            <p className='text-sm font-semibold text-neutral-800'>Press</p>
            <p className='text-neutral-600'>press@example.com</p>
          </div>
        </div>
      </div>
      <CTA />
    </>
  );
}

function CTA() {
  return (
    <div className='m-auto my-20 max-w-7xl bg-gradient-to-r from-rose-500 to-amber-500 px-8 py-14 shadow-sm sm:rounded-2xl border-neutral-200 border-4'>
      <div className='flex w-full justify-center'>
        <div className='m-auto flex w-full max-w-2xl flex-wrap items-center justify-between gap-2'>
          <p className='text-4xl font-medium text-white font-display'>
            Get started today, for free.
          </p>
          <Link href='/sign-in'>
            <Button variant='outline'>Get started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
