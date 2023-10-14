"use client"
import headerStyles from '../(styles)/InvoiceDetailsHeader.module.css';
import centerStyles from '../(styles)/InvoiceCenter.module.css';
import itemsStyles from '../(styles)/InvoiceItems.module.css';
import { useEffect, useState } from 'react';
import { UserAuth } from '../../../../authContext';
// @ts-ignore
import { usePathname } from 'next/navigation';
import Loading from '../../../settings/billing/loading';


export function Invoices() {
    const pathname = usePathname();
    const [invoice, setInvoice] = useState<any>([])
    const [items, setItems] = useState<any>([])
    const { subscriptions, firebaseUser } = UserAuth();

    console.log(firebaseUser)
    useEffect(() => {
        if (subscriptions) {
        const subscriptionArray: any[] = []
        const queryId = pathname?.substring(pathname.lastIndexOf("/") + 1);
        let count = 1
        subscriptions.forEach((element: any) => {
            const plan = element.items[0].plan
            plan.created = element.created
            plan.key = count
            count++
            if(element.items[0].plan.id === queryId) setInvoice(plan)
            subscriptionArray.push(plan)
        });
        setItems(subscriptionArray)
        }
    }, [subscriptions, pathname])

    const senderAddress = {
        street: '909 Trey',
        city: 'Dallas',
        postCode: 75223,
        country: 'USA'
    }
    return (
        <>
            <InvoiceHeader id={invoice.key} senderAddress={senderAddress} />
            <InvoiceCenter createdAt={invoice.created} paymentDue={invoice.interval} clientName={firebaseUser?.displayName || ''} 
            clientEmail={firebaseUser?.email || ''} clientAddress={senderAddress} />
            <InvoiceItems items={invoice} total={invoice.amount} />
        </>
    )
}

export function InvoiceHeader(props: any) {
    const { id, senderAddress } = props

    const description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
    tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
    quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
    sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam`

    return (
        <>
            <nav className="bg-grey-light p-3 rounded font-sans w-full m-4">
                <ol className="list-reset flex text-grey-dark">
                    <li><a href="/dashboard/billing" className="text-blue font-bold">Billing</a></li>
                    <li><span className="mx-2">/</span></li>
                    <li>Invoice: {id}</li>
                </ol>
            </nav>
            <div className={headerStyles.container}>
                <section>
                    <h3 className={headerStyles.id}><span>#</span> {id}</h3>
                    <span className={headerStyles.description}>{description}</span>
                </section>
                <address className={headerStyles.senderAddress}>
                    <span>{senderAddress.street}</span>
                    <span>{senderAddress.city}</span>
                    <span>{senderAddress.postCode}</span>
                    <span>{senderAddress.country}</span>
                </address>
            </div>
        </>
    )
}

export function InvoiceCenter({...props}) {
    const { clientAddress, clientEmail, clientName,
    createdAt, paymentDue } = props
    const convertToUpperCase = (string: string) => {
        return `${string[0].toUpperCase()}${string.slice(1)}`;
    }
 
    if (!createdAt) return <Loading />
    return (
        <div className={centerStyles.container}>
            <div className={centerStyles.leftBox}>
                <section className={centerStyles.topBox}>
                    <span>Invoice Date</span>
                    <h3>{createdAt.toDate().toDateString()}</h3>
                </section>
                <section className={centerStyles.bottomBox}>
                    <span>Payment Due</span>
                    <h3>{convertToUpperCase(paymentDue)}</h3>
                </section>
            </div>
            <div className={centerStyles.centerBox}>
                <span>Bill To</span>
                <h3>{clientName}</h3>
                <address className={centerStyles.clientAddress}>
                    <span className={centerStyles.street}>{clientAddress.street}</span>
                    <span className={centerStyles.city}>{clientAddress.city}</span>
                    <span className={centerStyles.postcode}>{clientAddress.postCode}</span>
                    <span className={centerStyles.country}>{clientAddress.country}</span>
                </address>
            </div>
            <div className={centerStyles.rightBox}>
                <span>Sent to</span>
                <h3>{clientEmail}</h3>
            </div>
        </div>
    )
}

export function InvoiceItems(props: any) {
    const { total, items } = props
    return (
        <>
            {items &&
                <div className={itemsStyles.container}>
                    <div className={itemsStyles.topDiv}>
                        <div className={itemsStyles.item}>
                            <span className={itemsStyles.title}>Item Name</span>
                            <h3>{items.id}</h3>
                        </div>
                        <div className={itemsStyles.qty}>
                            <span className={itemsStyles.title}>QTY.</span>
                            <h3>1</h3>
                        </div>
                        <div className={itemsStyles.price}>
                            <span className={itemsStyles.title}>Price</span>
                            <h3>$ {(total / 100).toFixed(2)}</h3>
                        </div>
                        <div className={itemsStyles.total}>
                            <span className={itemsStyles.title}>Total</span>
                            <h3>$ {(total / 100).toFixed(2)}</h3>
                        </div>
                    </div>
                    <div className={itemsStyles.bottomDiv}>
                        <span>Amount Due</span>
                        <h3>$ {(total / 100).toFixed(2)}</h3>
                    </div>
                </div>
            }
        </>
    )
}

