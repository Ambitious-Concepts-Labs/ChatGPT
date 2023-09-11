'use client';
import React from 'react';
import { useState } from 'react';
import { makeAdmin } from '../(actions)/actions';
import Button from '../../../components/Button';


export default function Form({ users }: { users: any[] }) {
  const [id, setId] = useState('');

  return (
    <>
      {users.filter((u) => u.role == 'ADMIN').length > 0 ? (
        <p className='mt-1 text-sm text-rose-500'>
          {'There is already an admin account. Add more admins by using the admin dashboard.'}
        </p>
      ) : (
        <>
          <div className='flex flex-col'>
            <p className='text-accent-foreground pb-2 text-sm'>Email</p>
            <div className='flex flex-col'>
              <select
                onChange={(e) => setId(e.target.value)}
                className='flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              >
                <option>Select user to make admin</option>
                {users.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.email}
                  </option>
                ))}
              </select>
              {users.length == 0 && (
                <p className='mt-1 text-sm text-rose-500'>
                  {
                    'No users! Sign up with a user account first then come back.'
                  }
                </p>
              )}
            </div>
          </div>
          <div className='flex justify-between'>
            <Button onClick={() => makeAdmin(id)} size={'sm'}>
              Make admin
            </Button>
          </div>
        </>
      )}
    </>
  );
}
