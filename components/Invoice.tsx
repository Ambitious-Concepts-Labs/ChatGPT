import { FC } from 'react';
import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi';
import styles from '../styles/MainInvoice.module.css';

const Invoice = (props: any) => {
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
            <section className={styles.container}>
                <h2 className={styles.id}>
                    <span>#</span> 1
                </h2>
                {/* <p className={styles.dueDate}>Created {createdAt.toLocaleDateString()}</p> */}
                {/* <p className={styles.dueDate}>Due {invoice.interval}</p> */}
                <p className={styles.name}>{invoice.product}</p>
                <h2 className={styles.total}>£ {invoice.amount.toFixed(2)}</h2>
                <div style={{ backgroundColor: `rgba(${[51, 214, 159]},0.06)` }} className={styles.status}>
                    <span style={{ backgroundColor: `rgb(${[51, 214, 159]})` }}></span>
                    <h3 style={{ color: `rgb(${[51, 214, 159]})` }} className={styles.label}>{invoice.active ? 'Paid' : 'Pending'}</h3>
                </div>
                <span className={styles.icon}><HiChevronRight /></span>
            </section>
        </Link>
    )
}

export default Invoice