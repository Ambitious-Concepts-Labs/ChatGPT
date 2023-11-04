"use client"

import Link from 'next/link';
import React, { useEffect } from 'react';
import { NavbarItem } from './(components)/components';
import { UserAuth } from '../authContext';
import { delay, requireAdminRole, requireUserLoggedIn } from '../../utils/helperFunctions';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    async function checkStatus() {
      await delay(2000)
      await requireUserLoggedIn();
      await requireAdminRole();
    }
    checkStatus()
  }, []);
  const { user } = UserAuth();

  return (
    <div className='flex h-full w-full flex-row'>
      <div className='flex h-full min-h-screen w-[232px] shrink-0 flex-col justify-between justify-between border-r border-zinc-200 px-6 py-8'>
        <div className='flex flex-col gap-2'>
          <div className='px-2 pb-6'>
            <img src='/vercel.svg' className='h-8 w-8' />
          </div>
          <NavbarItem href='/admin' text='Overview' />
          <NavbarItem href='/admin/users' text='Users' />
          <NavbarItem href='/admin/subscriptions' text='Subscriptions' />
          <NavbarItem href='/admin/roles' text='Roles' />
          <NavbarItem href='/admin/rewards' text='Rewards' />
        </div>
        <Link
          href='/dashboard/settings'
          className='flex items-center gap-2 rounded-md px-2 py-1 duration-150 hover:bg-neutral-100'
        >
          <p className='w-fit rounded-sm bg-rose-100 px-2 py-1 text-xs font-medium text-rose-500'>
            ADMIN
          </p>
          <p className='truncate text-sm'>{user.email}</p>
        </Link>
      </div>
      <div className='h-full max-h-[98vh] w-full overflow-y-auto'>
        <div className='mx-auto mt-12 flex w-full max-w-6xl flex-row px-4 py-6'>
          {children}
        </div>
      </div>
    </div>
  );
}
