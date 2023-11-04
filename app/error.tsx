'use client';

import { FiAlertTriangle } from 'react-icons/fi';
import { Footer, Header } from './(base)/(components)/components';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <Header />
      <div className='m-auto max-w-5xl px-4 py-10'>
        <div className='grid min-h-[40vh] place-items-center'>
          <div className='px-8 py-6 rounded-md border border-rose-200 '>
            <FiAlertTriangle className='text-rose-500' size={32} strokeWidth={2} />
            <div className='text-neutral-800 pt-6 pb-2'>
              {error.message}
            </div>
            <button onClick={()=>{ reset(); }} className='text-sm text-neutral-600'>Retry</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
