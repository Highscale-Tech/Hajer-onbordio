import {createContext,useContext, useEffect, useState} from 'react'
import { 
    GoogleAuthProvider,
    signOut,
    signInWithRedirect,
    onAuthStateChanged, } from "firebase/auth";
import {auth} from '../firebase/config'


const GlobalContext = createContext()


export const GlobalContextProvider = ({children})=>{
    const [user,setUser]=useState(null)
    const googleSignIn = ()=>{
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth,provider)
    }
    const logedOut = ()=>{
        signOut(auth)
    }
    useEffect(()=>{
        const logedIn =  onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            console.log(currentUser)
        })

        return() =>{
            logedIn()
        }

    },[])
    return(
        <GlobalContext.Provider value={{googleSignIn,logedOut,user}}>
            {children}
        </GlobalContext.Provider>
    )
}
export const useGlobalContext = ()=>{
    return useContext(GlobalContext)
}