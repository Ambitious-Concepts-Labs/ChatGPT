import { FC, useState } from 'react';
// import FilterBox from './FilterBox';
// import styles from './styles/Header.module.css';
import { BiPlusMedical } from 'react-icons/bi';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
// import { useFormState } from '../../state/form.state';
// import { useFilterState } from '../../state/home.state';
import styles from '../styles/InvoiceHeader.module.css';
import { ImCheckmark } from 'react-icons/im';

const Header  = (props: any) => {
    const { numInvoices } = props
    const [showBox, setShowBox] = useState(false)
    const statuses = ['Draft', 'Pending', 'Paid']
    let filterState: any
    const wrapFilterState = (state: any) => ({
        get: () => state.value,
        change: (filter: string) => state.set(filter),
    })
    const useFilterState = () => wrapFilterState(useState(filterState))
    const filteredState = useFilterState()
    const currentStatus = filteredState.get()
    const checked = currentStatus === status ? true : false

    // const formState = useFormState();
    // const statusState = useFilterState().get();
    // const status = statusState ? statusState.toLowerCase() : 'total';

    return (
        <header className={styles.container}>
            <div className={styles.titleDiv}>
                <h1>Invoices</h1>
                <span>{numInvoices ? 
                <span><span className={styles.mobileHidden}>There {numInvoices !== 1 ? 'are' : 'is'}</span> 
                {numInvoices}  <span className={styles.mobileHidden}>{status}</span> 
                invoice{numInvoices !== 1 ? 's' : ''}</span> : 'No invoices'}</span>
            </div>
            <div className={`${styles.lowerDiv} items-baseline`}>
               
                {/* <FilterBox /> */}
                <div className={`${styles.container} `}>
                    {/* <div onClick={handleBox} className={styles.selectFilter}> */}
                    <div className={styles.selectFilter}>
                        <h3>Filter <span>by status</span></h3>
                        <span>{showBox ? <HiChevronUp /> : <HiChevronDown />}</span>
                    </div>
                    {showBox &&
                        <div className={styles.filterList}>
                            {statuses && statuses.map((status: string) => 
                            //  <div onClick={handleClick} className={styles.filter}>
                             <div className={styles.filter}>
                                <span className={checked ? styles.checkbox__checked : styles.checkbox}>
                                    {checked ? <ImCheckmark /> : ''}
                                </span>
                                <h3 className={styles.label}>{status}</h3>
                            </div>
                            // <Filter setShowBox={setShowBox} status={status} key={status} />
                            )}
                        </div>
                    }
                </div>

                {/* <div onClick={() => formState.open()} className={styles.buttonDiv}> */}
                <div className={styles.buttonDiv}>
                    <button><BiPlusMedical /></button>
                    <h3>New<span className={styles.mobileHidden}> Invoice</span></h3>
                </div>
            </div>
        </header>
    )
}

export default Header