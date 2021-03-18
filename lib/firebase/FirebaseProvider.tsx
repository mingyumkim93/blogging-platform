import { useState, useEffect, useContext, createContext } from "react";
import firebase from "./firebase";

interface FirebaseProviderProps {
  children: JSX.Element;
}

interface FirebaseContext {
  auth: {
    user: firebase.User | null;
    loading: boolean;
    signin: (email: string, password: string) => Promise<firebase.User | null>;
    signup: (email: string, password: string) => Promise<firebase.User | null>;
    signout: () => Promise<void>;
  };
  storage: {
    addPhoto: (
      uid: string,
      photo: File
    ) => Promise<firebase.storage.UploadTaskSnapshot>;
  };
}

const firebaseContext = createContext<FirebaseContext>({} as FirebaseContext);

export function ProvideFirebase({ children }: FirebaseProviderProps) {
  const firebase = useProvideFirebase();
  return (
    <firebaseContext.Provider value={firebase}>
      {children}
    </firebaseContext.Provider>
  );
}

export const useFirebase = () => {
  return useContext(firebaseContext);
};

function useProvideFirebase() {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  const signin = async (email: string, password: string) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signup = async (email: string, password: string) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  const addPhoto = async (uid: string, photo: File) => {
    return firebase
      .storage()
      .ref("photos")
      .child("profile")
      .child(uid)
      .put(photo);
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setLoading(false);

      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    auth: {
      user,
      loading,
      signin,
      signup,
      signout
    },
    storage: {
      addPhoto
    }
  };
}
