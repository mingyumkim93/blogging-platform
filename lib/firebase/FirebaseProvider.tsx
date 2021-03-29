import { useState, useEffect, useContext, createContext } from "react";
import firebase from "./firebase";
import User from "types/User";
import { useRouter } from "next/router";
import axios from "axios";

interface FirebaseProviderProps {
  children: JSX.Element;
}

interface FirebaseContext {
  auth: {
    user: User | null;
    loading: boolean;
    signin: (
      email: string,
      password: string
    ) => Promise<void | FirebaseAuthError>;
    signinWithGoogle: () => Promise<void | FirebaseAuthError>;
    signup: (
      email: string,
      password: string,
      displayName: string
    ) => Promise<void | FirebaseAuthError>;
    signout: () => Promise<void>;
    updateDisplayName: (displayName: string) => Promise<void>;
    updatePassword: (
      currentPassword: string,
      newPassword: string
    ) => Promise<void>;
    updateProfilePhoto: (photo: File | null) => Promise<void>;
  };
  storage: {
    addPhoto: (
      uid: string,
      photo: File
    ) => Promise<firebase.storage.UploadTaskSnapshot>;
  };
}

//TODO: Think about its location
interface FirebaseAuthError {
  code: string;
  message: string;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const formatUser = (user: firebase.User): User => {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      provider: user.providerData[0] ? user.providerData[0].providerId : null,
      photoURL: user.photoURL
    };
  };

  const handleUser = (rawUser: firebase.User | null) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      setUser(user);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const saveUserInDB = (rawUser: firebase.User | null) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      return axios.post("/api/users", user).catch((err) => alert(err));
    }
  };

  const updateUserInDB = (rawUser: firebase.User | null) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      return axios
        .put(`/api/users/${user.uid}`, user)
        .catch((err) => alert(err));
    }
  };

  const signin = async (email: string, password: string) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user);
        router.back();
      })
      .catch((err: FirebaseAuthError) => {
        return err;
      });
  };

  const signinWithGoogle = async () => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (response) => {
        handleUser(response.user);
        await saveUserInDB(response.user);
        router.back();
      });
  };

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        await response.user?.updateProfile({ displayName });
        handleUser(response.user);
        await saveUserInDB(response.user);
        router.back();
      })
      .catch((err: FirebaseAuthError) => {
        return err;
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

  const updateDisplayName = async (displayName: string) => {
    return firebase
      .auth()
      .currentUser?.updateProfile({ displayName })
      .then(() => {
        handleUser(firebase.auth().currentUser);
        updateUserInDB(firebase.auth().currentUser);
      });
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user?.email!,
      currentPassword
    );
    const userCredential = await user
      ?.reauthenticateWithCredential(credential)
      .catch(() => alert("Invalid password!"));
    if (userCredential) {
      return firebase
        .auth()
        .currentUser?.updatePassword(newPassword)
        .then(() => alert("Password updated!"))
        .catch((err) => alert(err));
    }
  };

  const updateProfilePhoto = async (photo: File | null) => {
    const user = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref(`photos/profile/${user!.uid}`);
    //delete photo
    if (photo) {
      await storageRef.put(photo);
      const photoURL = (await storageRef.getDownloadURL()) as string;
      return user?.updateProfile({ photoURL }).then(() => {
        handleUser(firebase.auth().currentUser);
        updateUserInDB(firebase.auth().currentUser);
      });
    } else if (!photo && user?.photoURL) {
      await storageRef.delete();
      return user?.updateProfile({ photoURL: null }).then(() => {
        handleUser(firebase.auth().currentUser);
        updateUserInDB(firebase.auth().currentUser);
      });
    }
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
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    auth: {
      user,
      loading,
      signin,
      signinWithGoogle,
      signup,
      signout,
      updateDisplayName,
      updatePassword,
      updateProfilePhoto
    },
    storage: {
      addPhoto
    }
  };
}
