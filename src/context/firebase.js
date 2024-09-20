import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext();
const firebaseConfig = {
  apiKey: "AIzaSyDv6jixYFk_JUWwu2YDY-b_hoXtuxzSyGk",
  authDomain: "bookify-e5aa7.firebaseapp.com",
  projectId: "bookify-e5aa7",
  storageBucket: "bookify-e5aa7.appspot.com",
  messagingSenderId: "1052173132533",
  appId: "1:1052173132533:web:861e6a1ce622852cb21bbc",
};

export const useFirebase = () => useContext(FirebaseContext);
const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(FirebaseApp);
const GoogleProvider = new GoogleAuthProvider();
const Firestore = getFirestore(FirebaseApp);
const storage = getStorage(FirebaseApp);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const isLoggedIn = user ? true : false;

  const signUpWithEmailandPassword = (email, password) => {
    return createUserWithEmailAndPassword(FirebaseAuth, email, password);
  };

  const loginWithEmailandPassword = (email, password) => {
    return signInWithEmailAndPassword(FirebaseAuth, email, password);
  };

  const loginWithGoogle = () => {
    return signInWithPopup(FirebaseAuth, GoogleProvider);
  };

  const handelNewListing = async (bookName, ibnNumber, price, coverPic) => {
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverPic.name}`
    );
    const uplodedImageRef = await uploadBytes(imageRef, coverPic);
    return await addDoc(collection(Firestore, "books"), {
      bookName,
      ibnNumber,
      price,
      imageURL: uplodedImageRef.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const allBooksListed = () => {
    return getDocs(collection(Firestore, "books"));
  };

  const getImageUrl = (imageUrl) => {
    return getDownloadURL(ref(storage, imageUrl));
  };

  const logoutUser = () => {
    return signOut(FirebaseAuth);
  };

  const getBookById = async (bookId) => {
    const docRef = doc(Firestore, "books", bookId);
    const result = await getDoc(docRef);
    return result;
  };

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(Firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qty: Number(qty),
    });
    return result;
  };

  const fetchMyBooks = async (userId)  => {
    const collectionRef = collection(Firestore, "books");
    const q = query(collectionRef, where("userID", "==", userId));

    const result = await getDocs(q);
    return result;
  }

  const orderedBooks = async (bookId) => {
    const collectionRef = collection(Firestore, "books", bookId, "orders");
    const result = getDocs(collectionRef);
    return result;
  }

  const getBookName = async (bookId) => {
    const docRef = doc(Firestore, "books", bookId);
    const docSnap = await getDoc(docRef);
    return docSnap;
  }

  return (
    <FirebaseContext.Provider
      value={{
        signUpWithEmailandPassword,
        loginWithEmailandPassword,
        loginWithGoogle,
        logoutUser,
        handelNewListing,
        allBooksListed,
        getImageUrl,
        getBookById,
        placeOrder,
        fetchMyBooks,
        orderedBooks,
        getBookName,
        isLoggedIn,
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
