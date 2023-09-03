"use client"
import { FC, useEffect, useState } from 'react';
import InvoiceHeader from '../../../../components/InvoiceDetailsHeader';
import InvoiceCenter from '../../../../components/InvoiceCenter';
import InvoiceItems from '../../../../components/InvoiceItems';
import styles from '../../../../styles/Invoice.module.css';
import { usePathname } from 'next/navigation';

const Invoice = () => {
    // const {invoice} = props
    const pathname = usePathname();
    const invoices = [
    {
    id: 1,
    createdAt: "2021-06-30",
    description: 'hello description',
    status: 'paid',
    items: [
        {
            id:"1", 
            name:'item one',
            quantity: 90,
            price: 80,
            itemTotal: 900,
        },
        {
            id:"2", 
            name:'item two',
            quantity: 190,
            price: 820,
            itemTotal: 900,
        },
    ],
    total: 90,
    paymentDue: 80,
    senderAddress: {
        street: 'street',
        city: 'dallas',
        postCode: 777777,
        country: 'usa'
    },
    clientEmail : '<NAME>',
    clientName: 'name',
    clientAddress: {
        street: 'street',
        city: 'dallas',
        postCode: 777777,
        country: 'usa'
    },
},{
    id: 1,
    createdAt: "2021-06-30",
    description: 'hello description',
    status: 'pending',
    items: [
        {
            id:"1", 
            name:'item one',
            quantity: 90,
            price: 80,
            itemTotal: 900,
        },
        {
            id:"2", 
            name:'item two',
            quantity: 190,
            price: 820,
            itemTotal: 900,
        },
    ],
    total: 90,
    paymentDue: 80,
    senderAddress: {
        street: 'street',
        city: 'dallas',
        postCode: 777777,
        country: 'usa'
    },
    clientEmail : '<NAME>',
    clientName: 'name',
    clientAddress: {
        street: 'street',
        city: 'dallas',
        postCode: 777777,
        country: 'usa'
    },
},
    ]
    const [invoice, setInvoice] = useState(invoices[0])
    useEffect(() => {
        if (pathname) {
            const queryId = pathname.substring(pathname.lastIndexOf("/") + 1);
            const idx = parseInt(queryId)
            setInvoice(invoices[idx])
        }
        
    }, []);
    
    return (
        <div className={styles.container}>
            <nav className="bg-grey-light p-3 rounded font-sans w-full m-4">
                <ol className="list-reset flex text-grey-dark">
                    <li><a href="/dashboard/billing" className="text-blue font-bold">Billing</a></li>
                    <li><span className="mx-2">/</span></li>
                    <li>Invoice: {invoice.id}</li>
                </ol>
            </nav>
            <InvoiceHeader id={invoice.id || ''} description={invoice.description} senderAddress={invoice.senderAddress} />
            <InvoiceCenter createdAt={invoice.createdAt} paymentDue={invoice.paymentDue} clientName={invoice.clientName} clientEmail={invoice.clientEmail} clientAddress={invoice.clientAddress} />
            <InvoiceItems items={invoice.items} total={invoice.total} />
        </div>
    )
}

export default Invoice