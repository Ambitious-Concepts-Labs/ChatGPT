import Layout from "../../components/Layout";
import Survey from "../../components/Survey";
import { DataProvider } from "../../utils/DataContext";

const Feedback = () => {
    return ( 
        <DataProvider>
            <Layout> 
                <Survey/>
            </Layout>
        </DataProvider>
    )
}

export default Feedback;