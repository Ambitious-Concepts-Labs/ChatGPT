import Billing from "../../components/Billing";
import Layout from "../../components/Layout";
import { DataProvider } from "../../utils/DataContext";

const index = () => {
    return ( 
        <DataProvider>
            <Layout> 
                <Billing/>
            </Layout>
        </DataProvider>
    )
}

export default index;