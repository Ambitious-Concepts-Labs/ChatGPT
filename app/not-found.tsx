// @ts-nocheck

'use client';

import { FiAlertTriangle } from 'react-icons/fi';
import { Footer, Header } from './(base)/(components)/components';

export default function NotFound() {
  return (
    <div>
      <Header />
      <div className='m-auto max-w-5xl px-4 py-10'>
        <div className='grid min-h-[40vh] place-items-center'>
          <div className='rounded-md border border-rose-200 px-8 py-6 '>
            <FiAlertTriangle
              className='text-rose-500'
              size={32}
              strokeWidth={2}
            />
            <div className='pb-2 pt-6 text-neutral-800'>
              404: This page could not be found
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
