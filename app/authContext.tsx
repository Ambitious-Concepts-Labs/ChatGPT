// @ts-nocheck

"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";


const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState('')
  const [id, setId] = useState(localStorage.getItem('id_help') || null)
  const [currUser, setCurrUser] = useState('')
  const [documents, setDocuments] = useState([])
  const [payments, setPayments] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [folders, setFolders] = useState([])
  const [folderDocs, setFolderDocs] = useState([])
  const [showModal, setShowModal] = useState(false);

  const getSubscriptions = async () => {
    const dataArr:{}[] = []
    const querySnapshot = await getDocs(collection(db, "users", id, "subscriptions"));
    querySnapshot.forEach((subscription) => {
        const obj = { ...subscription.data(), subscriptionId: subscription.id }
        dataArr.push(obj)
        // resolve(dataArr);
    });
    setSubscriptions(dataArr)
    return dataArr
  }

  const getPayments = async () => {
    const dataArr:{}[] = []
    const querySnapshot = await getDocs(collection(db, "users", id, "payments"));
    querySnapshot.forEach((payment) => {
        const obj = { ...payment.data(), paymentId: payment.id }
        dataArr.push(obj)
        // resolve(dataArr);
    });
    setPayments(dataArr)
    return dataArr
  }

  const getSingleFolder = async (name) => {
      const docRef = await getDoc(doc(db, "users", id, "folders",  name));
      const docData = docRef.data();
      return docData
  }
  const getFoldersDocuments = async (name) => {
      const docRef = await getDoc(doc(db, "users", id, "folders",  name));
      const docData = docRef.data();
      return docData
  }

  const getFolders = async (id) => {
    const dataArr:{}[] = []
    const querySnapshot = await getDocs(collection(db, "users", id, "folders"));
    querySnapshot.forEach((folder) => {
        const obj = { ...folder.data(), folderId: folder.id }
        dataArr.push(obj)
        // resolve(dataArr);
    });
    setFolders(dataArr)
    return dataArr
  }

  const getDocuments = async (id) => {
    const dataArr:{}[] = []
    const querySnapshot = await getDocs(collection(db, "users", id, "documents"));
    querySnapshot.forEach((doc) => {
        const obj = { ...doc.data(), documentId: doc.id }
        dataArr.push(obj)
        // resolve(dataArr);
    });
    setDocuments(dataArr)
    return dataArr
  }

  const getUser = async (id) => {
    const uid = id
    if (id) {
        localStorage.setItem('id_help', id)
    }
    setId(uid)
    console.log(uid, 'uidddd')
    console.log(session, 'uidddd')
    if (session && uid) {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      console.log("Document data:", docSnap.data());
      if (docSnap) {
        setUser(docSnap.data())
        setCurrUser(docSnap.data())
        return docSnap.data()
    }
}
}

useEffect(() => {
    if (session?.user?.id) {
        getUser(session?.user?.id)
        getDocuments(session?.user?.id)
        getFolders(session?.user?.id)
        getPayments()
        getSubscriptions()
        console.log(id)
    } else {
        setUser(currUser)
        getUser(id)
        getDocuments(id)
        getFolders(id)
        getPayments()
        getSubscriptions()
    }
  }, [session, id]);

  return (
    <AuthContext.Provider
      value={{ 
        session, 
        getSingleFolder, 
        getFoldersDocuments, 
        documents, getDocuments, 
        folders, getFolders, 
        payments, getPayments,
        subscriptions, getSubscriptions, 
        id, 
        user, 
        showModal, setShowModal 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth: any = () => {
  return useContext(AuthContext);
};