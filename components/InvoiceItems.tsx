import { Fragment, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from 'react';
import styles from '../styles/InvoiceItems.module.css';

const InvoiceItems = (props: any) => {
    const { items, total } = props
    return (
        <>
            {items &&
                <div className={styles.container}>
                    <div className={styles.topDiv}>
                        <div className={styles.item}>
                            <span className={styles.title}>Item Name</span>
                            {items.map((item: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null; quantity: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null ; price: number; }, index: Key | null ) => (
                                <Fragment key={index}>
                                    <span>{item.name}
                                        <span className={styles.mobileShow} key={index}>{item.quantity} x £ {item.price}</span>
                                    </span>
                                </Fragment>
                            )
                            )}
                        </div>
                        <div className={styles.qty}>
                            <span className={styles.title}>QTY.</span>
                            {items.map((item: { quantity: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null ; }, index: Key | null ) => <span key={index}>{item.quantity}</span>)}
                        </div>
                        <div className={styles.price}>
                            <span className={styles.title}>Price</span>
                            {items.map((item: { price: number; }, index: Key | null ) => <span key={index}>£ {item.price}</span>)}
                        </div>
                        <div className={styles.total}>
                            <span className={styles.title}>Total</span>
                            {items.map((item: { total: number; }, index: Key | null ) => <span className={styles.itemTotal} key={index}>£ {item.total}</span>)}
                        </div>
                    </div>
                    <div className={styles.bottomDiv}>
                        <span>Amount Due</span>
                        <h3>£ {total}</h3>
                    </div>
                </div>
            }
        </>
    )
}

export default InvoiceItems