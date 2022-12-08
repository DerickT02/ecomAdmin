import { app, db } from './config'
import { addDoc, collection } from 'firebase/firestore'


export async function addProduct(productName?: string, productPrice?: number){
    let success = false
    let productRef = collection(db, 'products')
     await addDoc(productRef, {
        productName: productName,
        productPrice: productPrice
    }).then((res) => {
        console.log(res)
         success = true
    }).catch((err) => {
        console.log(err)
    })
    return success
}

