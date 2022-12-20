import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { auth } from './config'

export async function signUp(email: string, password: string){
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        console.log(userCredential.user)
       
    })
    .catch((error) => {
        console.log(error)
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