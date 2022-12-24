import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth} from "firebase/auth"
import { auth, db } from './config'
import { addDoc, collection, doc, setDoc } from "firebase/firestore"

export async function signUp(email: string, password: string){
    let credential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(credential)
    await setDoc(doc(db, "users", credential.user.uid), {
        email: email,
        role: "admin"
    })
    
}

export async function signIn(email: string, password: string){
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        console.log(userCredential)
    })
    .catch((error) => {
        console.log(error)
        alert(error)
    })
}

export async function logout(){
    signOut(auth).then(() => {
        console.log("Sign Out Successful")
    })
    .catch((error) => {
        console.log(error)
    })
}