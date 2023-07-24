import Layout from "../../components/Layout";
import { DataProvider } from "../../utils/DataContext";
import Documents from "../../components/Documents";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSession } from "next-auth/react";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import Filters from "../../components/Filters"
import Title from "../../components/Title";

const Feedback = () => {
    const [user, userLoading] = useAuthState(auth);
    const { data: session } = useSession();
    const router = useRouter();

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log({ uid });
            } else {
                console.log("no user");
            }
        });
    }, []);
  console.log(user)
    return ( 
        <DataProvider>
            <Layout> 
                <div>
                    <Title button={"Document"} title={"Documents"} session={session}/>
                    <Filters />
                    <Documents user={user} session={session}/>
                </div>
            </Layout>
        </DataProvider>
    )
}

export default Feedback;