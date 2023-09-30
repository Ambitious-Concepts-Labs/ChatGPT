import { BsFingerprint } from 'react-icons/bs'
import { LuLayoutDashboard, LuMousePointerClick, LuTowerControl,
    LuPlaneLanding, LuSlidersHorizontal, LuUsers, LuZap } from 'react-icons/lu'
import Link from 'next/link';
import Button from '../../../../../../components/Button';

export default async function Page() {

  return (
    <main>
      <div className=''>
        <Hero />
      </div>
      <Features />
      <FeatureList />
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

function FeatureList() {
  return (
    <div
      className='m-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-28'
      id='features'
    >
      <div className='m-auto w-full flex flex-col items-center'>
        <p className='text-rose-400 grid text-sm place-items-center rounded-full uppercase'>Supercharge your project</p>
        <p className='text-center text-4xl font-medium py-4  max-w-[20ch]'>
          Your business deserves a stable product.
        </p>
        <p className='text-neutral-600 text-center max-w-[60ch]'>
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </p>
      </div>
      <div className='grid gap-x-8 gap-y-8 sm:grid-cols-3'>
        <Feature
          icon={
            <LuMousePointerClick
              strokeWidth={2.5}
              size={20}
              className='shrink-0 '
            />
          }
          feature='Feature'
          description='This is a a feature, that does something really incredible.'
        />
        <Feature
          icon={
            <LuLayoutDashboard
              strokeWidth={2.5}
              size={20}
              className='shrink-0 '
            />
          }
          feature='Feature'
          description='This is a a feature, that does something really incredible.'
        />
        <Feature
          icon={<LuSlidersHorizontal strokeWidth={2.5} size={20} className='shrink-0 ' />}
          feature='Feature'
          description='This is a a feature, that does something really incredible.'
        />
        <Feature
          icon={<LuUsers strokeWidth={2.5} size={20} className='shrink-0 ' />}
          feature='Feature'
          description='This is a a feature, that does something really incredible.'
        />
        <Feature
          icon={
            <LuTowerControl strokeWidth={2.5} size={20} className='shrink-0 ' />
          }
          feature='Feature'
          description='This is a a feature, that does something really incredible.'
        />
        <Feature
          icon={
            <LuPlaneLanding strokeWidth={2.5} size={20} className='shrink-0 ' />
          }
          feature='Feature'
          description='This is a a feature, that does something really incredible.'
        />
      </div>
    </div>
  );
}

function Feature({
  feature,
  description,
  icon,
}: {
  feature: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className='rounded-sm p-6 hover:bg-zinc-100 duration-150 cursor-pointer'>
      <p className='rounded-lg text-center font-semibold text-rose-400 '>
        {icon}
      </p>
      <p className='py-2 text-base font-medium text-neutral-800 '>{feature}</p>
      <p className='text-sm text-neutral-600'>{description}</p>
    </div>
  );
}

function LargeDemo() {
  return (
    <div className='relative'>
      <div className='m-auto w-full max-w-7xl px-4'>
        <div className='rounded-2xl bg-white/20 p-2 shadow-sm shadow-white/80 backdrop-blur-md sm:p-6'>
          <div className='z-[1000] rounded-xl bg-neutral-200 p-0 sm:p-4'>
            <img
              src='/demo3.png'
              className='z-[1000] rounded-lg shadow-md'
            />
          </div>
        </div>
      </div>
      <div className='absolute bottom-20 top-20 z-[-1] h-[60%] w-full bg-gradient-to-br from-blue-400 via-rose-500 to-amber-600' />
    </div>
  );
}

function Hero() {
  return (
    <div className='flex flex-col pb-20 pt-28'>
      <div className='m-auto grid w-full max-w-7xl items-center px-4 pb-10'>
        <div className='flex flex-col py-10 '>
          <p className='bg-gradient-to-r py-2 from-rose-500 font-display to-amber-500 bg-clip-text text-5xl font-medium text-transparent sm:text-6xl'>
            Supercharge <span className='text-neutral-800'>your project.</span>
          </p>
          <p className='max-w-[50ch] py-6 text-lg text-neutral-600'>
            Build and launch your product quicker without dealing with endless
            boilerplate. Everything you need to launch included.
          </p>
          <div className='flex items-center gap-4'>
            <Link href="/sign-in">
              <Button variant='default'>Get started</Button>
            </Link>
            <Link href="/pricing">
              <Button variant='outline'>Pricing</Button>
            </Link>
          </div>
        </div>
      </div>
      <LargeDemo />
    </div>
  );
}

function Features() {
  return (
    <div className='flex flex-col gap-20 '>
      <div className='grid sm:grid-cols-2'>
        <div className='py-4'>
          <img
            src='/demo.png'
            className='border border-neutral-200 py-6 pr-6 shadow-md sm:rounded-r-2xl'
          />
        </div>
        <div className='grid place-items-center py-8'>
          <div className='flex flex-col px-4'>
            <div className='w-fit rounded-3xl bg-neutral-200 p-3'>
              <div className='rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 p-4  shadow-md shadow-rose-500/80'>
                <LuZap className='shrink-0 text-white' />
              </div>
            </div>
            <p className='bg-gradient-to-r from-black to-zinc-600 bg-clip-text pt-4 text-3xl font-medium text-transparent'>
              Supercharge your project
            </p>
            <p className='max-w-[60ch] py-4 text-neutral-600'>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </p>
            <div className='flex items-center gap-4'>
              <Link href="/pricing">
                <Button variant='outline'>Learn more</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='grid sm:grid-cols-2'>
        <div className='grid place-items-center py-8'>
          <div className='flex flex-col px-4'>
            <div className='w-fit rounded-3xl bg-neutral-200 p-3'>
              <div className='rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 p-4  shadow-md shadow-rose-500/80'>
                <BsFingerprint className='shrink-0 text-white' />
              </div>
            </div>
            <p className='bg-gradient-to-r from-black to-zinc-600 bg-clip-text pt-4 text-3xl font-medium text-transparent'>
              Supercharge your project
            </p>
            <p className='max-w-[60ch] py-4 text-neutral-600'>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </p>
            <div className='flex items-center gap-4'>
              <Link href="/pricing">
                <Button variant='outline'>Learn more</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className='py-4'>
          <img
            src='/demo2.png'
            className='border border-neutral-200 py-6 pl-6 shadow-md sm:rounded-l-2xl'
          />
        </div>
      </div>
    </div>
  );
}
