"use client"

import { AiFillCreditCard } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { FiAlertTriangle, FiPackage } from 'react-icons/fi'
import Link from 'next/link';
import Button from '../../components/Button';
import { Stat, Card } from './(components)/components';
import { UserAuth } from '../authContext';

export default function Page() {
  const { users, products, subs } = UserAuth();

  console.log(users, products)
  const count = users.length


  return (
    <div className='w-full'>
      <div className='flex justify-between pb-6'>
        <p className='text-primary font-display text-2xl'>Overview</p>
        <Link href='https://dashboard.stripe.com/dashboard'>
          <Button variant='link' size='sm' className='space-x-2'>
            <AiFillCreditCard size={16} />
            <span>Stripe Dashboard</span>
          </Button>
        </Link>
      </div>
      <div className='grid grid-cols-3 gap-6 pb-6'>
        <Stat
          icon={
            <div className='grid h-10 w-10 place-items-center rounded-md bg-emerald-300/10 text-emerald-500'>
              <AiFillCreditCard size={20} />
            </div>
          }
          label='Subscriptions'
          value={subs.length}
        />
        <Stat
          icon={
            <div className='grid h-10 w-10 place-items-center rounded-md bg-emerald-300/10 text-emerald-500'>
              <FaUsers size={20} />
            </div>
          }
          label='Users'
          value={count}
        />
        <Stat
          icon={
            <div className='grid h-10 w-10 place-items-center rounded-md bg-emerald-300/10 text-emerald-500'>
              <FiPackage size={20} />
            </div>
          }
          label='Products'
          value={products.length}
        />
      </div>
      <div className='grid grid-cols-2 items-start gap-8'>
        <Card title='Subscriptions'>
          <div className='divide-border flex flex-col divide-y'>
            {subs.map((item: any, index: any) => (
              <div
                key={index}
                className='flex cursor-pointer items-center justify-between px-4 py-2.5'
              >
                <div className='flex flex-col'>
                  <p className='text-primary text-sm font-medium'>
                    {item.customer.name ?? 'No name'}
                  </p>
                  <p className='text-accent-foreground text-xs'>
                    {item.customer.email}
                  </p>
                </div>
                <p className='text-primary text-sm font-medium'>
                  ${item.items.data[0].price.unit_amount / 100}{' '}
                  {item.currency.toUpperCase()}
                </p>
              </div>
            ))}
            {subs.length == 0 && (
              <div className='flex items-center gap-2 px-4 py-3'>
                <FiAlertTriangle
                  size={18}
                  className='text-accent-foreground shrink-0'
                />
                <p className='text-accent-foreground text-sm'>
                  No subscriptions yet!
                </p>
              </div>
            )}
          </div>
        </Card>
        <Card title='Users'>
          <div className='flex flex-col divide-y divide-neutral-200'>
            {users.length > 0 && users.map((item: any, index: any) => (
              <div
                key={index}
                className='flex cursor-pointer items-center justify-between px-4 py-2.5'
              >
                <p className='text-primary text-sm font-medium'>{item.email}</p>
                <p className='text-accent-foreground text-xs'>
                  {item.name ?? 'No name'}
                </p>
              </div>
            ))}
            {users.length == 0 && (
              <div className='flex items-center gap-2 px-4 py-3'>
                <FiAlertTriangle
                  size={18}
                  className='text-accent-foreground shrink-0'
                />
                <p className='text-accent-foreground text-sm'>No users yet!</p>
              </div>
            )}
          </div>
        </Card>

        <Card title='Products'>
          <div className='flex flex-col divide-y divide-neutral-200'>
            {products.length > 0 && products.map((item: any, index: any) => (
              <div
                key={index}
                className='flex cursor-pointer items-center justify-between px-4 py-2.5'
              >
                <p className='text-primary text-sm font-medium'>{item.name}</p>
                <p className='text-accent-foreground text-xs'>
                  {item.description ?? 'No description'}
                </p>
              </div>
            ))}
            {!products || products.length == 0 && (
              <div className='flex items-center gap-2 px-4 py-3'>
                <FiAlertTriangle
                  size={18}
                  className='text-accent-foreground shrink-0'
                />
                <p className='text-accent-foreground text-sm'>
                  No products yet!
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
