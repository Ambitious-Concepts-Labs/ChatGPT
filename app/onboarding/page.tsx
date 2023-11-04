// import { requireUserLoggedIn } from '../../utils/auth/helpers';
import Form from './(components)/components';

export default async function Page() {
  // await requireUserLoggedIn();

  return (
    <div className='grid min-h-screen grid-cols-2'>
      <div className='grid place-items-center px-4 py-10'>
        <div className='flex w-full max-w-md flex-col'>
          <div className='flex flex-col py-4'>
            <p className='text-2xl text-primary font-medium'>Welcome</p>
            <p className='text-base text-accent-foreground'>Please enter your name</p>
          </div>
          <div className='flex w-full flex-col gap-4'>
            <Form />
          </div>
        </div>
      </div>
      {/* <div className='grid place-items-center bg-black'>
        <div className='rounded-md invert'>
          <img src='/vercel.svg' className='h-14 w-14 ' />
        </div>
      </div> */}
    </div>
  );
}
