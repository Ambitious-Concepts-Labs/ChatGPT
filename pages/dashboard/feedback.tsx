import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import Survey from "../../components/Survey";
import Title from "../../components/Title";
import { DataProvider } from "../../utils/DataContext";

const Feedback = () => {
    const { data: session } = useSession();
    return ( 
        <DataProvider>
            <Layout> 
                <Title button={"Document"} title={"Feedback"} session={session}/>
                <Survey session={session}/>
            </Layout>
        </DataProvider>
    )
}

export default Feedback;