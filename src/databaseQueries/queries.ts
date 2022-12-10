import { app, db } from './config'
import { addDoc, collection, getDocs } from 'firebase/firestore'


export async function addProduct(productName?: string, productPrice?: number){
    let success = false
    let productRef = collection(db, 'products')
     await addDoc(productRef, {
        productName: productName,
        productPrice: productPrice
    }).then((res) => {
         success = true
    }).catch((err) => {
        console.log(err)
        throw err
    })
    return success
}

export async function getAllProducts(){
    let productsSnapshot = await getDocs(collection(db, "products"))
    productsSnapshot.forEach((doc) => {
        console.log(doc.id)
        console.log(doc.data())
    })
    return "Get All Products"
}

export async function deleteProduct(productID: string){
    //save for later 
}
