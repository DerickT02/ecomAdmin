import { useState, useEffect } from 'preact/hooks'
import { getAllProducts, deleteProduct } from '../databaseQueries/queries'
import ProductCard from './ProductCard'

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
           
           return (
             <ProductCard productImage={product.productImage}  productName={product.productName} productPrice={product.productPrice} id={product.id} deleteProduct={deleteProduct} />
           )
         })}
       </div>
        </>
    )
}