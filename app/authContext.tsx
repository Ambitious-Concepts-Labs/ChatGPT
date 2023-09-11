// @ts-nocheck

"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { doc, getDoc, getDocs, collection, collectionGroup } from "firebase/firestore";
import { db } from "../firebase";
import { getProductsWithRecurringPrices } from "../utils/helperFunctions"
import { getProducts, getAllSubscriptions, getPaymentMethods,
  generateCheckoutLink, generateCustomerPortalLink } from "../utils/stripeHelpers"
import { requireUserLoggedIn } from '../utils/auth/helpers';


const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState('')
  const [users, setUsers] = useState('')
  const [products, setProducts] = useState('')
  const [recurringProducts, setRecurringProducts] = useState('')
  const [checkoutLinks, setCheckoutLinks] = useState('')
  const [checkoutLink, setCheckoutLink] = useState('')
  const [methods, setMethods] = useState('')
  const [id, setId] = useState(localStorage.getItem('id_help') || null)
  const [currUser, setCurrUser] = useState('')
  const [documents, setDocuments] = useState([])
  const [payments, setPayments] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [subs, setSubs] = useState([])
  const [folders, setFolders] = useState([])
  const [showModal, setShowModal] = useState(false);

  const getSubscriptions = async () => {
    const dataArr:{}[] = []
    const querySnapshot = await getDocs(collection(db, "users", id, "subscriptions"));
    querySnapshot.forEach((subscription) => {
        const obj = { ...subscription.data(), subscriptionId: subscription.id }
        dataArr.push(obj)
    });
    setSubscriptions(dataArr)
    return dataArr
  }

  const getCheckoutLinks = async () => {
    let currCheckoutLinks = {};

    for (var plan of subscriptions) {
      let link = await generateCheckoutLink(
        //@ts-ignore
        '' + plan.default_price.id, process.env.NEXTAUTH_URL,
        user.stripe_customer_id
        );
        //@ts-ignore
      currCheckoutLinks['' + plan.id] = link;
    }
    setCheckoutLinks(currCheckoutLinks)
    return currCheckoutLinks
  }

  const getCheckoutLink = async () => {
    const link = await generateCustomerPortalLink(
    String(user?.stripe_customer_id),
    process.env.NEXTAUTH_URL 
    + '/dashboard/settings/billing');
    setCheckoutLink(link)
    return link
  }

  const getMethods = async () => {
    const currMethod = await getPaymentMethods(user.stripe_customer_id);
    console.log(currMethod, 'currMethod')
    setMethods(currMethod)
    return currMethod
  }

  const getPayments = async () => {
    const dataArr:{}[] = []
    const querySnapshot = await getDocs(collection(db, "users", id, "payments"));
    querySnapshot.forEach((payment) => {
        const obj = { ...payment.data(), paymentId: payment.id }
        dataArr.push(obj)
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
    if (uid) {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap) {
        setUser(docSnap.data())
        setCurrUser(docSnap.data())
        return docSnap.data()
      }
    }
  }

  const getUsers = async (id) => {
    const dataArr:{}[] = []
    if (id) {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          const obj = { ...doc.data(), documentId: doc.id }
          dataArr.push(obj)          
          console.log(doc.id, " => ", doc.data());
        });
        setUsers(dataArr)
        return dataArr
      } catch(error) {
        console.log(error)
      }
    }
  }

  const getRecurringProducts = async () => {
    const generatedProducts = await getProductsWithRecurringPrices();
    setRecurringProducts(generatedProducts)
    return generatedProducts
  }

  const getCurrProducts = async () => {
    const generatedProducts = await getProducts();
    setProducts(generatedProducts)
    return generatedProducts;
  }

  const getSubs = async () => {
    const subs = await getAllSubscriptions();
    setSubs(subs)
    return subs
  }

useEffect(() => {
  if (!user) {
    if (session?.user?.id) {
      getUser(session?.user?.id)
      getUsers(session?.user?.id)
      getDocuments(session?.user?.id)
      getFolders(session?.user?.id)
      getPayments()
      getSubscriptions()
      getCurrProducts()
      getRecurringProducts()
      getSubs()
      getCheckoutLinks()
      getCheckoutLink()
      getMethods()
      requireUserLoggedIn();
    } else {
      setUser(currUser)
      getUser(id)
      getUsers(id)
      getDocuments(id)
      getFolders(id)
      getPayments()
      getSubscriptions()
      getCurrProducts()
      getRecurringProducts()
      getSubs()
      getCheckoutLinks()
      getCheckoutLink()
      getMethods()
      requireUserLoggedIn();
    }
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
        id, products, methods,
        recurringProducts,
        subs, checkoutLinks,
        user, users, checkoutLink,
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