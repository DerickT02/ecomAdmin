import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, collection, updateDoc, doc } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyD1BCr3zikGp705QH8YBbr01OxISO3ImAQ",
    authDomain: "ecommerceproject-416fd.firebaseapp.com",
    projectId: "ecommerceproject-416fd",
    storageBucket: "ecommerceproject-416fd.appspot.com",
    messagingSenderId: "71973758576",
    appId: "1:71973758576:web:1b160343d5c21d606936b5",
    measurementId: "G-H6MQ6MZNC4"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)






async function getAllProducts(){
   
    let productsSnapshot = await getDocs(collection(db, "products"))
   
 
    productsSnapshot.forEach((document) => {
        
        let docRef = doc(db, "products", document.id)
        updateDoc(docRef, {
            stock: 10,
        }).then(() => {
            console.log(document.data())
        })
        
    })
    
}

getAllProducts()
