import Button from '../../../components/Button';
import Link from 'next/link';

export default async function Page() {
  return (
    <div className=''>
      <div className='m-auto mx-auto w-full max-w-7xl px-4 '>
        <div className='flex flex-col py-20'>
          <p className='font-display text-xs font-semibold uppercase tracking-wide'>
            About us
          </p>
          <p className='bg-gradient-to-r from-black to-zinc-600 bg-clip-text py-4 text-4xl font-semibold text-transparent'>
            {'Our strength is collaboration'}
          </p>
          <p className='text-base font-normal text-neutral-600 max-w-[60ch]'>
            We believe that our strength lies in our collaborative approach,
            which puts our clients at the center of everything we do.
          </p>
        </div>
        <div className='grid grid-cols-2 gap-x-8 gap-y-8 border-y border-neutral-200 py-10'>
          <div className='flex flex-col'>
            <p className='text-sm font-semibold text-neutral-800'>Benefit</p>
            <p className='text-neutral-600'>
              Our team has been with us since the beginning because none of them
              are allowed to have LinkedIn profiles.
            </p>
          </div>
          <div className='flex flex-col'>
            <p className='text-sm font-semibold text-neutral-800'>Benefit</p>
            <p className='text-neutral-600'>
              We {"don't"} care when our team works just as long as they are working
              every waking second.
            </p>
          </div>
          <div className='flex flex-col'>
            <p className='text-sm font-semibold text-neutral-800'>Benefit</p>
            <p className='text-neutral-600'>
              Our team has been with us since the beginning because none of them
              are allowed to have LinkedIn profiles.
            </p>
          </div>
          <div className='flex flex-col'>
            <p className='text-sm font-semibold text-neutral-800'>Benefit</p>
            <p className='text-neutral-600'>
              We {"don't"} care when our team works just as long as they are working
              every waking second.
            </p>
          </div>
        </div>
      </div>
      <CTA />
    </div>
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
            text={"Get started"}
            variant='whiteFill'/>
          </Link>
        </div>
      </div>
    </div>
  );
}