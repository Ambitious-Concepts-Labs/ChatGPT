"use client"
import { FC, useEffect, useState } from 'react';
import InvoiceHeader from '../../../../components/InvoiceDetailsHeader';
import InvoiceCenter from '../../../../components/InvoiceCenter';
import InvoiceItems from '../../../../components/InvoiceItems';
import styles from '../../../../styles/Invoice.module.css';
import { usePathname } from 'next/navigation';
import { UserAuth } from '../../../authContext';

const Invoice = () => {
    const pathname = usePathname();
    const [invoice, setInvoice] = useState<any>([])
    const [items, setItems] = useState<any>([])
    const { subscriptions, session } = UserAuth();

    useEffect(() => {
        if (subscriptions) {
            let subscriptionArray: any[] = []
            const queryId = pathname?.substring(pathname.lastIndexOf("/") + 1);
            subscriptions.forEach((element: { items: any; }) => {
                console.log("Element", element.items )
                if(element.items[0].plan.id === queryId) setInvoice(element.items[0].plan)
                subscriptionArray.push(element.items[0].plan)
            });
            setItems(subscriptionArray)
        }
    }, [subscriptions, pathname])

    console.log(items, invoice)
    const description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
    tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
    quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
    sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam`
    const senderAddress = {
        street: '909 Trey',
        city: 'Dallas',
        postCode: 75223,
        country: 'USA'
    }

    return (
        <div className={styles.container}>
            <nav className="bg-grey-light p-3 rounded font-sans w-full m-4">
                <ol className="list-reset flex text-grey-dark">
                    <li><a href="/dashboard/billing" className="text-blue font-bold">Billing</a></li>
                    <li><span className="mx-2">/</span></li>
                    <li>Invoice: {invoice.id}</li>
                </ol>
            </nav>
            <InvoiceHeader id={invoice.id} description={description} senderAddress={senderAddress} />
            <InvoiceCenter createdAt={invoice.created} paymentDue={invoice.interval} clientName={session?.user?.name || ''} 
            clientEmail={session?.user?.email || ''} clientAddress={senderAddress} />
            <InvoiceItems items={invoice} total={invoice.amount} />
        </div>
    )
}

export default Invoice