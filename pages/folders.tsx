import Layout from "../components/user/layout";
import { DataProvider } from "../utils/DataContext";
import FolderContainer from "../components/Folders";

const Folders = () => {
    return ( 
        <DataProvider>
            <Layout> 
                <div>
                    <FolderContainer/>
                </div>
            </Layout>
        </DataProvider>
    )
}

export default Folders;