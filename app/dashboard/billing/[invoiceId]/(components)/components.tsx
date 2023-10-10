import styles from '../(styles)/InvoiceDetailsHeader.module.css';
import centerStyles from '../(styles)/InvoiceCenter.module.css';
import itemsStyles from '../(styles)/InvoiceItems.module.css';

export function InvoiceHeader(props: any) {
    const { id, description, senderAddress } = props
    return (
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
    )
}

export function InvoiceCenter({ ...props }) {
    const { createdAt, paymentDue, clientName, clientEmail, clientAddress } = props
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
    const { items, total } = props
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

