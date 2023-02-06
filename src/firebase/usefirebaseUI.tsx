import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import React, {
  useMemo,
  useState,
  createContext,
  useContext,
  useEffect,
} from 'react';
import {
  DocumentData,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { updateCurrentUser } from 'firebase/auth';
import { db, auth } from './fireBase';

export interface Iinput {
  displayName?: string;
  email: string;
  password: string;
  photoUrl: string;
}
//for register
export interface IRegister {
  name: string;
  email: string;
  password: string;
}

//our autentication settings for firebase
interface AProps {
  children: React.ReactNode;
}

interface IAuth {
  currentUser: User | null;
  isLoading: boolean;
  logIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  Register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<IAuth>({
  //set user credential and variables to null
  currentUser: null,
  isLoading: false,
  //function to get object from auth
  logIn: async () => {},
  logout: async () => {},
  Register: async () => {},
});

export const AuthProvider = ({ children }: AProps) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firstLoading, setFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    () =>
      onAuthStateChanged(auth, user => {
        if (user) {
          setCurrentUser(user);
          setIsLoading(false);
        } else {
          setCurrentUser(null);
          setIsLoading(true);
          //router.push('/Signin_signup');
        }
        setFirstLoading(false);
      }),
    []
  );

  const Register = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    console.log('in register', displayName, email, password);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async userinfo => {
        const docRef: any = await addDoc(collection(db, 'users'), {
          displayName: displayName,
          userId: `${userinfo.user.uid}`,
          email: `${userinfo.user.email}`,
        });
        setCurrentUser(docRef);
        router.push('/');
        setIsLoading(false);
      })
      .catch(error => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  const logIn = async (email: string, password: string) => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(userinfo => {
        setCurrentUser(userinfo.user);
        router.push('/');
        setIsLoading(false);
      })
      .catch(error => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  const logout = async () => {
    setIsLoading(true);

    signOut(auth)
      .then(() => {
        setCurrentUser(null);
      })
      .catch(error => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  //return authcontext
  return (
    <AuthContext.Provider
      value={{ currentUser, logIn, logout, Register, isLoading }}
    >
      {!firstLoading && children}
    </AuthContext.Provider>
  );
};
//export the settings
export default function useAuth() {
  return useContext(AuthContext);
}

export const useUserLibrary = (UID: undefined | string) => {
  const [getList, setGetList] = useState<DocumentData[]>([]);
  const [getCurrentUser, setGetCurrentUser]: any = useState();
  const [getAllUsers, setGetAllUsers]: any = useState();
  useEffect(() => {
    if (!UID) return;
    return onSnapshot(collection(db, 'users'), snapshot => {
      setGetAllUsers(snapshot);

      setGetList(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          ...(doc.data().userId === UID && setGetCurrentUser(doc.data())),
        }))
      );
    });
  }, [db, UID]);

  return { getList, getCurrentUser, getAllUsers };
};
