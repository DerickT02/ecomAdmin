import React,  { useState, useEffect, useContext } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import { addProduct, getAllProducts, deleteProduct} from './databaseQueries/queries'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage, auth } from './databaseQueries/config'
import { signUp, logout, signIn } from './databaseQueries/auth'
import { onAuthStateChanged } from 'firebase/auth'
import './app.css'
import ProductsList from './components/ProductsList'
import CreateProducts from './components/CreateProduct'
import Navbar from './components/Navbar'
import { createContext } from 'preact'
import EditPopup from './components/EditPopup'




export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showEditPopup, setShowEditPopup] = useState(false)
  
  const toggleShowEditProductUI = () => {
    setShowEditPopup(option => !option)
  }

 


useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if(user){
      console.log("User UID " + user.uid)
      setIsLoggedIn(true)
    }
    else{
      console.log("No User")
      setIsLoggedIn(false) 
    }
  })
}, [isLoggedIn])

  return (
    <>
      <div class="card">
      
        <Navbar isLoggedIn = {isLoggedIn}/>
        {isLoggedIn ? <>
            <CreateProducts />
            <ProductsList /> 
          </> : 
          <>
          <h1>Please Log In Or Sign Up</h1>
          </>}
      
      </div>
        
       
    </>
  )
}
