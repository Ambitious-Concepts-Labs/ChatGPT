"use client"
import styles from '../(styles)/InvoiceDetailsHeader.module.css';
import centerStyles from '../(styles)/InvoiceCenter.module.css';
import itemsStyles from '../(styles)/InvoiceItems.module.css';
import { useEffect, useState } from 'react';
import { UserAuth } from '../../../../authContext';
import { usePathname } from 'next/navigation';


export function Invoices() {
    const pathname = usePathname();
    const [invoice, setInvoice] = useState<any>([])
    const [items, setItems] = useState<any>([])
    const { subscriptions, session } = UserAuth();

    useEffect(() => {
        if (subscriptions) {
            const subscriptionArray: any[] = []
            const queryId = pathname?.substring(pathname.lastIndexOf("/") + 1);
            subscriptions.forEach((element: { items: any; }) => {
                console.log("Element", element.items )
                if(element.items[0].plan.id === queryId) setInvoice(element.items[0].plan)
                subscriptionArray.push(element.items[0].plan)
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
            <InvoiceHeader id={invoice.id}  />
            <InvoiceCenter createdAt={invoice.created} paymentDue={invoice.interval} clientName={session?.user?.name || ''} 
            clientEmail={session?.user?.email || ''} clientAddress={senderAddress} />
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
            <div className={styles.container}>
                <section>
                    <h3 className={styles.id}><span>#</span>{id}</h3>
                    <span className={styles.description}>{description}</span>
                </section>
                <address className={styles.senderAddress}>
                    <span className={styles.street}>{senderAddress.street}</span>
                    <span className={styles.city}>{senderAddress.city}</span>
                    <span className={styles.postcode}>{senderAddress.postCode}</span>
                    <span className={styles.country}>{senderAddress.country}</span>
                </address>
            </div>
        </>
    )
}

export function InvoiceCenter({...props}) {
    const { clientAddress, clientEmail, clientName,
    createdAt, paymentDue } = props
 
    return (
        <div className={centerStyles.container}>
            <div className={centerStyles.leftBox}>
                <section className={centerStyles.topBox}>
                    <span>Invoice Date</span>
                    <h3>{createdAt}</h3>
                </section>
                <section className={centerStyles.bottomBox}>
                    <span>Payment Due</span>
                    <h3>{paymentDue}</h3>
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
                            <h3>$ {total}</h3>
                        </div>
                        <div className={itemsStyles.total}>
                            <span className={itemsStyles.title}>Total</span>
                            <h3>$ {total}</h3>
                        </div>
                    </div>
                    <div className={itemsStyles.bottomDiv}>
                        <span>Amount Due</span>
                        <h3>$ {total}</h3>
                    </div>
                </div>
            }
        </>
    )
}

