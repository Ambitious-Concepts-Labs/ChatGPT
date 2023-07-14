import Layout from "../components/Layout";
import { DataProvider } from "../utils/DataContext";
import Survey from "../components/Survey";

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