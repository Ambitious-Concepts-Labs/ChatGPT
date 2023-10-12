import 'server-only'
import styles from './(styles)/Invoice.module.css';
import { Invoices } from "./(components)/components";

function Invoice() {
   
    return (
        <div className={styles.container}>
           <Invoices />
        </div>
    )
}

export default Invoice