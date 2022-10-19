import { getAuth, Unsubscribe } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import type { AppProps } from "next/app";
import { useEffect, useRef, useState } from "react";
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
  useFirestore,
  useUser,
} from "reactfire";
import Navbar from "../components/Navbar";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import "../styles/globals.css";

const firebaseConfig = {
  apiKey: "AIzaSyAEqMYOzhsZx5H1sFjMQhS5mXm4ErPKS4o",
  authDomain: "nextfire-app-5d683.firebaseapp.com",
  projectId: "nextfire-app-5d683",
  storageBucket: "nextfire-app-5d683.appspot.com",
  messagingSenderId: "697032585858",
  appId: "1:697032585858:web:a6a5f9d8008cd0fb8e7a9b",
};

type Props = {
  children: React.ReactNode;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <FirebaseComponents>
          <UserManager>
            <Navbar />
            <Component {...pageProps} />
          </UserManager>
        </FirebaseComponents>
      </FirebaseAppProvider>
    </>
  );
}

function FirebaseComponents(props: Props) {
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`

  // initialize Database and Auth with the normal Firebase SDK functions
  const auth = getAuth(app);

  const firestore = getFirestore(app);

  // any child components will be able to use `useUser`, `useDatabaseObjectData`, etc
  return (
    <FirestoreProvider sdk={firestore}>
      <AuthProvider sdk={auth}>{props.children}</AuthProvider>;
    </FirestoreProvider>
  );
}

function UserManager(props: Props) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      {props.children}
    </UserContext.Provider>
  );
}

export default MyApp;
