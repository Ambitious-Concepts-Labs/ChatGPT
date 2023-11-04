'use client';

import { useState } from 'react';
import { setRole } from '../(actions)/actions';
import Button from '../../../../components/Button';
import { MdOutlineNotStarted } from 'react-icons/md';

enum Role {
  "admin",
  "user",
  "superAdmin"
}

export function RoleForm({ users }: { users: any[] }) {
  
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<Role | string>(Role.user);
  const [role, setUserRole] = useState<Role | string>(Role.user);

  function addItemToUser() {
    console.log('pop')
    setLoading(true);
    setRole(id, role);
    setLoading(false);
  }

  return (
    <div className='flex flex-col w-full'>
      <p className='text-2xl font-medium pb-6'>Roles</p>
      <div className='grid w-full grid-cols-2'>
        <Card title='Update role'>
          <div className='flex flex-col gap-4 p-4'>
            <select
              onChange={(e) => { setId(e.target.value); }}
              className="flex h-10  rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option disabled>Choose user</option>
              {users.length > 0 && users.map((item, index) => (
                <option key={index} value={item.uid}>
                  {item.email}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => { setUserRole(e.target.value); }}
              className="flex h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option disabled>Choose role</option>
              {Object.keys(Role).map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <Button
              disabled={loading}
              variant="black" text="Assign Role"
              onClick={() => addItemToUser()}
              icon={<MdOutlineNotStarted/>}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Card({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className='border-border rounded-md border shadow-sm'>
      <div className='flex flex-col'>
        <p className='border-border border-b p-4 text-base font-medium'>
          {title}
        </p>
        <div className=''>{children}</div>
      </div>
    </div>
  );
}

