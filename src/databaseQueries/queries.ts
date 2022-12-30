import { app, auth, db, storage } from './config'
import { addDoc, collection, deleteDoc, getDocs, doc, updateDoc, query, onSnapshot} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { signIn } from './auth'


export async function addProduct(productName?: string, productPrice?: number, productImage?: any){
   
    let success = false
    let productRef = collection(db, 'products')
     await addDoc(productRef, {
        productName: productName,
        productPrice: productPrice,
        productImage: productImage
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
        let img = doc.data().productImage
        let product = {productPrice: price, productName: name, id: doc.id, productImage: img}
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
    .catch((error) => {
        
        console.log(error)
        console.log("Unsuccessfully Deleted")
    })
}

export async function updateProduct(id: any, productName: string, productPrice: number, productImage: any){
    let success = false
    const docToUpdate = doc(db, "products", id)
    await updateDoc(docToUpdate, {
        productName: productName,
        productPrice: productPrice,
        productImage: productImage
    }).then((res) => {
        success = true
   }).catch((err) => {
       console.log(err)
       throw err
   })
   return success
}




