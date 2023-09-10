'use client';

import Button from '../../../../components/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { updateProfile } from '../(actions)/actions';
import { signOut } from 'next-auth/react';
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarItem({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  const pathname = usePathname() ?? "";
  let active = pathname == href;
  
  return (
    <Link
      href={href}
      className={`py-2 px-3 text-sm duration-150 border-b-2 border-transparent hover:border-neutral-200
        ${active &&  "border-neutral-200 font-medium"}`
      }
    >
      <span>{text}</span>
    </Link>
  );
}

export default function Form({
  currentName,
  email,
}: {
  currentName: string;
  email: string;
}) {
  const [name, setName] = useState(currentName);

  async function update() {
    await updateProfile(name);
  }

  return (
    <>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col'>
          <p className='pb-2 text-sm'>Name</p>
          <div className='flex items-center gap-2'>
            <input
              value={name}
              className='max-w-md'
              onChange={(e: any) => setName(e.target.value)}
              placeholder='Roman'
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='pb-2 text-sm'>Email</p>
          <div className='flex items-center gap-2'>
            <input value={email} disabled className='max-w-md' />
          </div>
        </div>
      </div>
      <div className='flex items-center gap-4 pt-8 '>
        <Button 
        variant={"black"}
        text={"Save"}
        onClick={() => update()} size={'sm'}
        />
        <Button 
        variant={"black"}
        text={"Logout"}
        onClick={() => signOut()} size={'sm'} 
        />
      </div>
    </>
  );
}
