import { createContext, useEffect, useState } from 'react';
export let AuthContex = createContext(null)
import { FacebookAuthProvider, GoogleAuthProvider, updateProfile , createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import app from '../Firebase/firebase.config';










const auth = getAuth(app);

// google and facebook 
const GoogleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({children}) => {
    let [user , setUser] = useState(null)
    let [loding, setLoading]= useState(true)

   

    function verifyPassword(password) {
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const lengthRequirement = password.length >= 6;
    
        return uppercaseRegex.test(password) && lowercaseRegex.test(password) && lengthRequirement;
    }
    
    let createUser = (email, password)=>{
        setLoading(true)
        if (!verifyPassword(password)) {
            return toast("Password must be 6 characters long and at least 1 uppercase letter, 1 lowercase letter");
        }
        return createUserWithEmailAndPassword(auth, email, password)
    }

   const updateUserProfile = (fullName, email)=>{
    return updateProfile(auth.currentUser, {

        displayName: fullName, 
        // photoURL: photoUrl, 
        email: email

        }).then(() => {
        // Profile updated!
        // ...
        }).catch((error) => {
        // An error occurred
        // ...
        });
   }
 

    const signIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
  

    const googleLOgin= ()=>{
        signInWithPopup(auth, GoogleProvider)
        .then((result)=>{
            if(result.user){
               
                console.log('login hoiche');
               
                toast('google logging')
            }
        })
    }
    const facebookLOgin= ()=>{
        signInWithPopup(auth, facebookProvider)
        .then((result) =>{
            toast('Login successfull')
        })
    }

    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
      const unsubscribe=  onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }

    },[])
    let authInfo = {
        user,
        loding,
        createUser,
        updateUserProfile,
        signIn,
        googleLOgin,
        facebookLOgin,
        logOut,
    }
    return (
        <>
            <AuthContex.Provider value={authInfo}>
                {children}
            </AuthContex.Provider>
        
        </>
    );
};

export default AuthProvider;