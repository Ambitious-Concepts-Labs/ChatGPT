import Layout from "../components/Layout";
import { DataProvider } from "../utils/DataContext";
import FolderContainer from "../components/Folders";

const Folders = () => {
    return ( 
        <DataProvider>
            <Layout> 
                <FolderContainer/>
            </Layout>
        </DataProvider>
    )
}

export default Folders;