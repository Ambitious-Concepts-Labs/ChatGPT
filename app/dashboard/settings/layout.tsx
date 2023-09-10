"use client"
import { SidebarItem } from './(components)/components';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex w-full flex-col items-start'>
      <p className='pb-4 text-2xl font-medium text-neutral-800'>Settings</p>
      <div className='flex w-full items-center border-b border-zinc-200'>
        <SidebarItem href='/dashboard/settings' text='Account' />
        <SidebarItem href='/dashboard/settings/billing' text='Billing' />
      </div>
      <div className='w-full pt-6'>{children}</div>
    </div>
  );
}
