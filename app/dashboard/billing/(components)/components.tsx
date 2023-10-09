import styles from '../(styles)/InvoiceHeader.module.css';
import listStyles from '../(styles)/InvoiceList.module.css';
import invoiceStyles from '../(styles)/MainInvoice.module.css';

import { FC } from 'react';
import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi';

export function InvoiceHeader(props: any) {
    const { numInvoices } = props

    return (
        <header>
            <div className={styles.titleDiv}>
                <h1>Invoices</h1>
                <span>
                    {numInvoices ? 
                        <span>
                            <span className={styles.mobileHidden}>
                                There {numInvoices !== 1 ? 'are ' : 'is '} 
                            </span> 
                            {`${numInvoices  } `} 
                            <span className={styles.mobileHidden}>
                                {status}
                            </span> 
                            invoice
                            {numInvoices !== 1 ? 's' : ''}
                        </span> 
                        :
                        'No invoices'
                    }
                </span>
            </div>
        </header>
    )
}

export function InvoiceList(props: any) {
    const { invoices } = props
    return (
        <div>
            {invoices.map((invoice: { id: any; }) => <Invoice key={invoice.id} invoice={invoice} />)}
        </div>
    )
}

function Invoice(props: any) {
    const { invoice } = props
    let color: number[];
    // const getStatusColors = (statusName: string) => {
    //     let color: number[];
    //     statusName = statusName.toLowerCase();
    //     switch (statusName) {
    //         case 'pending':
    //             color = [255, 143, 0]
    //             break;
    //         case 'paid':
    //             color = [51, 214, 159]
    //             break;
    //         case 'draft':
    //             color = [55, 59, 83]
    //             break;
    //         default:
    //             color = []
    //             break;
    //     }
    //     return color;
    // }
    // color = getStatusColors(invoice.status)
    // const status = invoice.status[0].toUpperCase() + invoice.status.substring(1);
    const createdAt = new Date(invoice.created); 
    return (
        <Link href={`dashboard/billing/${invoice.id}`}>
            <section className={invoiceStyles.container}>
                <h2 className={invoiceStyles.id}>
                    <span>#</span> 1
                </h2>
                {/* <p className={invoiceStyles.dueDate}>Created {createdAt.toLocaleDateString()}</p> */}
                {/* <p className={invoiceStyles.dueDate}>Due {invoice.interval}</p> */}
                <p className={invoiceStyles.name}>{invoice.product}</p>
                <h2 className={invoiceStyles.total}>£ {invoice.amount.toFixed(2)}</h2>
                <div style={{ backgroundColor: `rgba(${[51, 214, 159]},0.06)` }} className={invoiceStyles.status}>
                    <span style={{ backgroundColor: `rgb(${[51, 214, 159]})` }} />
                    <h3 style={{ color: `rgb(${[51, 214, 159]})` }} className={invoiceStyles.label}>{invoice.active ? 'Paid' : 'Pending'}</h3>
                </div>
                <span className={invoiceStyles.icon}><HiChevronRight /></span>
            </section>
        </Link>
    )
}

