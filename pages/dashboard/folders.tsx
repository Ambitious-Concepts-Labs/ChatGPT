import FolderContainer from "../../components/Folders";
import Layout from "../../components/Layout";
import { DataProvider } from "../../utils/DataContext";

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