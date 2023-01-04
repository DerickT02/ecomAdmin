import { useState, useEffect } from 'preact/hooks'
import {  deleteProduct } from '../databaseQueries/queries'
import ProductCard from './ProductCard'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../databaseQueries/config';


export default function ProductsList(){
    const [productList, setProductList] = useState<any[]>([])
    useEffect(() => {
       let productsListRef = collection(db, "products")
       onSnapshot(productsListRef, (snapshot) => {
        let productsList: any = []
          snapshot.docs.forEach((doc) => {
            let price = doc.data().productPrice
            let name = doc.data().productName
            let img = doc.data().productImage
            let sales = doc.data().sales
            let rating = doc.data().rating
            let stock = doc.data().stock
            let product = {productPrice: price, productName: name, id: doc.id, productImage: img, sales: sales, rating: rating, stock: stock}
            
            productsList.push(product)
          })
          setProductList(productsList)
       })
    }, [])
    return(
        <>
        <div class = "product-grid-metrics">
       <p>Name</p>
       <p>Price</p>
       <p># Of Sales</p>
       <p>Overall Rating</p>
       <p># in Stock</p>
     </div>

      
     <div class = "product-card-container">
         {productList.map((product) => {
           
           return (
             <ProductCard productImage={product.productImage}  productName={product.productName} productPrice={product.productPrice} id={product.id} deleteProduct={deleteProduct} sales = {product.sales} rating = {product.rating} stock = {product.stock}/>
           )
         })}
       </div>
        </>
    )
}