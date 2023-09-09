import styles from '../styles/InvoiceHeader.module.css';

const Header  = (props: any) => {
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
                            {numInvoices + ' '} 
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

export default Header