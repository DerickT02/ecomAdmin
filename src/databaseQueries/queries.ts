import { app, db } from './config'
import { addDoc, collection, deleteDoc, getDocs, doc } from 'firebase/firestore'


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
    let result: any[] = []
    productsSnapshot.forEach((doc) => {
        let price = doc.data().productPrice
        let name = doc.data().productName
        let product = {productPrice: price, productName: name, id: doc.id}
        result = [...result, product]
    })
    console.log(result)
    return result
}

export async function deleteProduct(productID: any){
    

    await deleteDoc(doc(db, "products", productID))
    .then(() => {
        console.log("Successfully Deleted")
    })
    .catch(() => {
        console.log("Unsuccessfully Deleted")
    })


}
