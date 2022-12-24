import { useState, useEffect } from 'preact/hooks'
import { getAllProducts, deleteProduct } from '../databaseQueries/queries'

export default function ProductsList(){
    const [productList, setProductList] = useState<any[]>([])
    useEffect(() => {
        getAllProducts().then((res) => {
            setProductList(res)
        })
    }, [])
    return(
        <>
        <div class = "product-grid-metrics">
       <p>Name</p>
       <p>Price</p>
       <p># Of Sales</p>
       <p>Overall Rating</p>
     </div>

      
     <div class = "product-card-container">
         {productList.map((product) => {
           console.log(product.productImage)
           return (
             <div class = "product-card">
               <div class = "product-name-and-image">
                 {product.productImage ? <img src = {product.productImage}></img> : <img></img>}
                 <p>{product.productName}</p>
               </div>
               <p class= "price">${product.productPrice}</p>
               <p>300</p>
               <p>5.0</p>
               <button onClick = {() => {deleteProduct(product.id)}}>Delete Product</button>
             </div>
           )
         })}
       </div>
        </>
    )
}