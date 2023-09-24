"use client"
import {
  generateCheckoutLink,
  generateCustomerPortalLink,
  getInvoices,
  getPaymentMethods,
  getProductsWithRecurringPrices,
  getSubscriptions,
} from '../../../../utils/stripeHelpers';
// import { prisma } from '@saas/database/connection';
import Link from 'next/link';

// import { authOptions } from '@/auth/options';
import Button from '../../../../components/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../admin/(components)/components';
import { format } from 'date-fns';
import { UserAuth } from '../../../authContext';

export default function Page() {
  // const { user } = await getServerSession(authOptions);
  const { checkoutLink, checkoutLinks, methods,
     user, recurringProducts, subscriptions } = UserAuth();

  // const link = await generateCustomerPortalLink(
  //   String(user?.stripe_customer_id),
  //   process.env.NEXTAUTH_URL + '/dashboard/settings/billing'
  // );

  // let methods = await getPaymentMethods(user.stripe_customer_id);

  let plans = recurringProducts;

  // let checkoutLinks = {};

  // for (var plan of plans) {
  //   let link = await generateCheckoutLink(
  //     //@ts-ignore
  //     '' + plan.default_price.id, process.env.NEXTAUTH_URL,
  //     user.stripe_customer_id
  //     );
  //     //@ts-ignore
  //   checkoutLinks['' + plan.id] = link;
  // }

  // let subscriptions = await getSubscriptions(
  //   user.email,
  //   process.env.NEXTAUTH_URL + '/dashboard/settings/billing'
  // );

  function hasSubscription(id: string) {
    return subscriptions.filter((item: any) => item.price_id == id).length > 0;
  }

  return (
    <div className='flex w-full flex-col'>
      <div className='grid grid-cols-6 gap-x-12'>
        <div className='col-span-4 flex flex-col'>
          <div className='flex items-center justify-between'>
            <p className='pb-6 text-lg font-medium'>Plans</p>
          </div>
          <div className='pb-6'>
            <div className='flex flex-col gap-2'>
              {plans.length > 0 && plans.map((item: any, index: any) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-4 rounded-md border border-neutral-200 px-8 py-5 shadow-sm
                    ${hasSubscription(item.default_price.id) && 'border-blue-400'}`   
                  }
                >
                  <div className='flex w-full items-center justify-between'>
                    <div className='flex flex-col'>
                      <p className='text-base font-medium text-neutral-800'>
                        {item.name}
                      </p>
                      <p className='text-sm text-neutral-600'>
                        {item.description}
                      </p>
                    </div>
                    <div className='flex flex-row items-center gap-4'>
                      <p className='text-base font-medium'>
                        $
                        {'' + item.default_price?.unit_amount_decimal / 100}
                        <span className='font-normal text-neutral-600'>
                          /
                          {
                            item.default_price.recurring.interval
                          }
                        </span>
                      </p>
                      {
                        !hasSubscription(item.default_price.id) && (
                          <Link href={checkoutLinks['' + item.default_price.id] || ''}>
                            <Button 
                            text={"Buy"}
                            size='xs' 
                            variant='black'
                            />
                          </Link>
                        )
                      }
                      {
                        hasSubscription(item.default_price.id) && (
                          <Link href={checkoutLink || ''}>
                            <Button 
                            text={"Manage"}
                            size='xs' 
                            variant='black'
                            />
                          </Link>
                        )
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='col-span-2 flex flex-col'>
          <div className='flex items-center justify-between'>
            <p className='pb-6 text-lg font-medium'>Payment Methods</p>
          </div>
          <div className='pb-6'>
            <div className='flex flex-col gap-4'>
              {methods.length > 0 ? methods.map((item: any, index: any) => (
                <div
                  key={index}
                  className='grid min-h-[132px] items-center rounded-md border border-neutral-200 bg-gradient-to-tr from-white to-neutral-100 p-6 shadow-sm'
                >
                  <div className='flex flex-col gap-4 py-6'>
                    <p className='font-mono text-sm font-medium'>
                      **** **** **** {item.card_number}
                    </p>
                    <p className='font-mono text-sm font-medium'>{item.exp}</p>
                  </div>
                </div>
              )) :
               <div className='grid min-h-[132px] items-center rounded-md border border-neutral-200 bg-gradient-to-tr from-white to-neutral-100 p-6 shadow-sm'
                >
                  <div className='flex flex-col gap-4 py-6'>
                    <p className='font-mono text-sm font-medium'>
                      **** **** **** N/A
                    </p>
                    <p className='font-mono text-sm font-medium'>No Card Info</p>
                  </div>
                </div>
              }
            </div>
          </div>
          <Link href={checkoutLink || ''}>
            <Button 
            text={'Manage payment methods'}
            size='sm' 
            variant='black'
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string | undefined | null;
}) {
  return (
    <div className='flex flex-col'>
      <p className='text-sm text-neutral-400'>{label}</p>
      <p className='text-neutral-800'>
        {value != 'null' ? value : 'Not provided'}
      </p>
    </div>
  );
}
