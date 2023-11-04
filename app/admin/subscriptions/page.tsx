"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../(components)/components';
import { format } from 'date-fns';
import { UserAuth } from '../../authContext';

export default function Page() {
  const { subs } = UserAuth();
  const subscriptions = subs

  return (
    <div className='w-full'>
      <div className='flex justify-between pb-6'>
        <p className='text-2xl font-medium'>Subscriptions</p>
      </div>
      <div className='flex flex-col gap-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.length > 0 && subscriptions.map((item: any, index: any) => (
              <TableRow key={index}>
                {/*@ts-ignore */}
                <TableCell>{item.customer.email}</TableCell>
                {/*@ts-ignore */}
                <TableCell>{item.items.data.at(0).plan.product}</TableCell>
                <TableCell>
                  ${item.items.data.at(0).price.unit_amount / 100}
                </TableCell>
                <TableCell>
                  {format(item.start_date * 1000, 'yyyy-MM-dd')}
                </TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
