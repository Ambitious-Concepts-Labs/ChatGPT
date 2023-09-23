// @ts-nocheck

"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { doc, getDoc, getDocs, collection, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { getProductsWithRecurringPrices } from "../utils/helperFunctions"
import { getProducts, getAllSubscriptions, getPaymentMethods,
  generateCheckoutLink, generateCustomerPortalLink } from "../utils/stripeHelpers"
import { User, onAuthStateChanged } from "firebase/auth";


const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('')
  const [users, setUsers] = useState('')
  const [products, setProducts] = useState('')
  const [recurringProducts, setRecurringProducts] = useState('')
  const [checkoutLinks, setCheckoutLinks] = useState('')
  const [checkoutLink, setCheckoutLink] = useState('')
  const [methods, setMethods] = useState('')
  const [id, setId] = useState(window.localStorage.getItem('id_help') || null)
  const [currUser, setCurrUser] = useState('')
  const [documents, setDocuments] = useState([])
  const [payments, setPayments] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [subs, setSubs] = useState([])
  const [folders, setFolders] = useState([])
  const [showModal, setShowModal] = useState(false);

  const [firebaseUser, setFirebaseUser] = useState<null | User>(null)
  const [loading, setLoading] = useState(true)


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
  
  if (firebaseUser !== null) {
      getUser(firebaseUser.uid)
      getUsers(firebaseUser.uid)
      getDocuments(firebaseUser.uid)
      getFolders(firebaseUser.uid)
      getPayments()
      getSubscriptions()
      getCurrProducts()
      getRecurringProducts()
      getSubs()
      getCheckoutLinks()
      getCheckoutLink()
      getMethods()
      // requireUserLoggedIn();
  }
  }, [firebaseUser]);

  const registerNewUser = async (currentUser) => {
    const docRef = doc(db, "users", currentUser.uid);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return true;
  } else {
    await setDoc(doc(db, "users", currentUser.uid), {
      // uid: newUser?.user.uid,
      email: currentUser.email,
      name: currentUser.displayName || "",
      // provider: account.provider,
      photoUrl: currentUser.photoURL || "",
      createdAt: serverTimestamp(),
    });
  }}
  
  
  
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser: any) => {
    setFirebaseUser(currentUser);
    if (currentUser) {
      await registerNewUser(currentUser)
    }
    setLoading(false);
  });

  return unsubscribe;
}, []);
  
useEffect(() => {
  const nonProtectedPaths = ["/sign-in"];
  if (!loading) {
    (async () => {
      if (firebaseUser === null) {
        if (!nonProtectedPaths.includes(location.pathname))
          window.location.assign("/sign-in");
      } else {
        if (nonProtectedPaths.includes(location.pathname)) window.location.assign("/dashboard");
      }
    })();
  }
}, [firebaseUser, loading]);

  return (
    <AuthContext.Provider
      value={{ 
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
        showModal, setShowModal , firebaseUser
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const UserAuth: any = () => {
  return useContext(AuthContext);
};