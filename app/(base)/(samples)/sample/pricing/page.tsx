'use client';
import Button from '../../../../../components/Button';
import Link from 'next/link';
import React, { useEffect } from 'react';

export default function Page() {
  return (
    <main>
      <Hero />
      <div className='py-20'>
        <div className='m-auto w-full max-w-7xl rounded-xl px-4 py-16'>
          <StripePricingTable />
        </div>
      </div>
      <CTA />
    </main>
  );
}
function CTA() {
  return (
    <div className='m-auto my-20 max-w-7xl bg-gradient-to-r from-rose-500 to-amber-500 px-8 py-14 shadow-sm sm:rounded-2xl border-neutral-200 border-4'>
      <div className='flex w-full justify-center'>
        <div className='m-auto flex w-full max-w-2xl flex-wrap items-center justify-between gap-2'>
          <p className='text-4xl font-medium text-white font-display'>
            {'Get started today, for free.'}
          </p>
          <Link href='/sign-in'>
            <Button 
            variant={"whiteFill"}
            text={"Get started"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
function Hero() {
  return (
    <div className='flex flex-col items-center py-24'>
      <h1 className='text-center text-4xl font-medium text-neutral-800 sm:text-7xl'>
        Simple,{' '}
        <span className='bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent'>
          transparent
        </span>
        , pricing
      </h1>
    </div>
  );
}

const StripePricingTable = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return React.createElement('stripe-pricing-table', {
    'pricing-table-id': 'prctbl_1NbGybDscgyTUUyYgOf0pxhw',
    'publishable-key':
      'pk_test_51LeTehDscgyTUUyYsD6aOjZD7zyJoj1OMLkKbFjsOEGoMUc6JPDlFzr09nip4sm39iirRllIL45RuqDChIlQ349p00loAcHNlo',
  });
};
