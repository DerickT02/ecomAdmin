import { app, db } from './config'
import { addDoc, collection } from 'firebase/firestore'


export async function addProduct(productName: string, productPrice: number){
    let productRef = collection(db, 'products')
    let addProductDoc = await addDoc(productRef, {
        productName: productName,
        productPrice: productPrice
    }).then((res) => {
        console.log("Successfully Added Product")
    }).catch((err) => {
        console.log("Unsuccessfully Added Product")
    })
    
}

