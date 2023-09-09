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
                            <h3>{items.id}</h3>
                        </div>
                        <div className={styles.qty}>
                            <span className={styles.title}>QTY.</span>
                            <h3>1</h3>
                        </div>
                        <div className={styles.price}>
                            <span className={styles.title}>Price</span>
                            <h3>$ {total}</h3>
                        </div>
                        <div className={styles.total}>
                            <span className={styles.title}>Total</span>
                            <h3>$ {total}</h3>
                        </div>
                    </div>
                    <div className={styles.bottomDiv}>
                        <span>Amount Due</span>
                        <h3>$ {total}</h3>
                    </div>
                </div>
            }
        </>
    )
}

export default InvoiceItems