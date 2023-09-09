import Invoice from './Invoice';
import styles from '../styles/InvoiceList.module.css';

const InvoiceList = (props: any) => {
    const { invoices } = props
    return (
        <div>
            {invoices.map((invoice: { id: any; }) => <Invoice key={invoice.id} invoice={invoice} />)}
        </div>
    )
}

export default InvoiceList