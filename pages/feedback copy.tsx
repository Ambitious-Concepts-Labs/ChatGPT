import Layout from "../components/user/layout";
import { DataProvider } from "../utils/DataContext";
import Survey from "../components/Survey";

const Feedback = () => {
    return ( 
        <DataProvider>
            <Layout> 
                <div>
                    <Survey/>
                </div>
            </Layout>
        </DataProvider>
    )
}

export default Feedback;