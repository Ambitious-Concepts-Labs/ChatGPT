"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../(components)/components';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { GiPencil } from 'react-icons/gi'

import Link from 'next/link';
import { UserAuth } from '../../authContext';

export default function Page() {
  const { users } = UserAuth();


  return (
    <div className='w-full'>
      <div className='flex justify-between pb-6'>
        <p className='text-2xl font-medium'>Users</p>
      </div>
      <div className='flex flex-col gap-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Onboarded</TableHead>
              <TableHead>Email Verified</TableHead>
              <TableHead>Customer ID</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 && users.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.name ? item.name : 'No name'}</TableCell>
                <TableCell>
                  {item.onboarded ? (
                    <div className='flex w-fit items-center gap-1 rounded-md bg-emerald-300/20 px-2 py-1 text-emerald-500'>
                      <AiOutlineCheck size={18} />
                      <p className='text-xs'>DONE</p>
                    </div>
                  ) : (
                    <div className='flex w-fit items-center gap-1 rounded-md bg-rose-300/20 px-2 py-1 text-rose-500'>
                      <AiOutlineClose size={18} />
                      <p className='text-xs'>DNF</p>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {item.emailVerified ? (
                    <AiOutlineCheck size={18} className='text-emerald-500' />
                  ) : (
                    <AiOutlineClose className='text-rose-500' size={18} />
                  )}
                </TableCell>
                <TableCell>{item.stripe_customer_id}</TableCell>
                <TableCell className='flex items-center gap-1'>
                  <div className='truncate'>{item.role}</div>
                  <Link
                    href={'/admin/roles'}
                    className='text-neutral-600 duration-150 hover:text-neutral-800'
                  >
                    <GiPencil size={16} />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

