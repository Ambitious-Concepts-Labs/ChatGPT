import Layout from "../components/Layout";
import { DataProvider } from "../utils/DataContext";
import Billing from "../components/Billing";

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