'use client';

import * as React from "react"
// @ts-ignore
import { usePathname } from 'next/navigation';
import Link from "next/link";

export function Card({
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

export function Stat({
    value,
    label,
    icon,
  }: {
    value: any;
    label: string;
    icon: any;
  }) {
    return (
      <div className='border-border flex flex-row items-center justify-between rounded-md rounded-md border px-8 py-6 shadow-sm'>
        <div className='flex flex-col'>
          <div className='text-accent-foreground text-sm'>{label}</div>
          <div className='text-primary text-2xl font-medium'>{value}</div>
        </div>
        {icon}
      </div>
    );
  }
  
export function NavbarItem({ href, text }: { href: string; text: string }) {
  const pathname = usePathname() ?? '';
  const active = pathname == href;

  return (
    <Link
      href={href}
      className={`w-full rounded-md px-3 py-1.5 text-sm font-medium duration-150 hover:bg-neutral-100 ${active &&  'bg-neutral-100'}`}
    >
      <span>{text}</span>
    </Link>
  );
}


const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className="w-full caption-bottom text-sm"
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className="[&_tr]:border-b" {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className="[&_tr:last-child]:border-0"
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className="bg-neutral-100 font-medium text-neutral-600"
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className="border-b transition-colors hover:bg-neutral-100 data-[state=selected]:bg-muted"
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  any,
  React.ThHTMLAttributes<any>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className="h-10 px-4 text-left align-middle font-normal text-neutral-500 [&:has([role=checkbox])]:pr-0"
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
any,
  React.TdHTMLAttributes<any>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className="px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0"
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
any,
  React.HTMLAttributes<any>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className="mt-4 text-sm text-muted-foreground"
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}