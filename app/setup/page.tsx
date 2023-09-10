'use client';

import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import Form from './(components)/components';
import { UserAuth } from '../authContext';

export default function Page() {
  const { users, products } = UserAuth();

  return (
    <div className='grid min-h-screen grid-cols-2'>
      <div className='grid place-items-center px-4 py-10'>
        <div className='flex w-full max-w-md flex-col'>
          <div className='flex flex-col py-4'>
            <p className='text-primary text-2xl font-medium'>Project Setup</p>
          </div>
          <div className='flex w-full flex-col gap-4'>
            <Form users={users} />
          </div>

          <div className='flex flex-col pt-4'>
            <p className='text-primary pb-2 text-sm font-medium'>Checks</p>
            <div className='divide-border flex flex-col divide-y'>
              <ChecklistItem
                name='env.DATABASE_URL'
                exists={String(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET).length > 0}
              />
              <ChecklistItem
                name='env.NEXTAUTH_SECRET'
                exists={String(process.env.NEXTAUTH_SECRET).length > 0}
              />
              <ChecklistItem
                name='env.NEXTAUTH_URL'
                exists={String(process.env.NEXTAUTH_URL).length > 0}
              />
              <ChecklistItem
                name='env.STRIPE_SECRET'
                exists={String(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY).length > 0}
              />
              <ChecklistItem
                name='env.STRIPE_PUBLIC'
                exists={String(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_SECRET_KEY).length > 0}
              />
              <ChecklistItem
                name='Create stripe products with recurring prices'
                exists={products.length > 0}
              />
            </div>
          </div>

          <div className='flex flex-col pt-4'>
            <p className='text-primary pb-2 text-sm font-medium'>Database Tips</p>
            <div className='divide-border flex flex-col divide-y'>
              <TipItem
                question='Just added your DATABASE_URL? You need to push it your MySQL server.'
                answer={'yarn dev-db-push'}
              />
              <TipItem
                question='Updated your DB Schema? Push it to MySQL and generate client types.'
                answer={'yarn dev-db-push && yarn dev-db-generate'}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='grid place-items-center bg-black'>
        <div className='rounded-md invert'>
          <img src='/vercel.svg' className='h-14 w-14 ' />
        </div>
      </div>
    </div>
  );
}

function TipItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className='flex flex-col py-2'>
      <p className='text-primary text-sm font-medium'>{question}</p>
      <p className='text-accent-foreground mt-1 rounded-md bg-neutral-100 px-2 py-1 font-mono text-sm'>
        {answer}
      </p>
    </div>
  );
}

function ChecklistItem({ exists, name }: { exists: boolean; name: string }) {
  return (
    <div className='flex flex-row items-center gap-2 py-2'>
      {exists ? (
        <AiOutlineCheck size={20} className='text-emerald-500 ' />
      ) : (
        <AiOutlineClose size={20} className='text-rose-500' />
      )}
      <p className='text-primary text-sm'>{name}</p>
    </div>
  );
}
