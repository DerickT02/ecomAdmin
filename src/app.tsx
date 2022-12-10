import { useState, useEffect } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import { addProduct, getAllProducts} from './databaseQueries/queries'
import './app.css'

export function App() {
  const [count, setCount] = useState(0)
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState(0.00)
  const [productList, setProductList] = useState<any[]>([])

  const handleProductNameChange = (event: any) => {
    setProductName(event.target.value)
  }

  const handleProductPriceChange = (event: any) => {
    setProductPrice(event.target.value)
  }

useEffect(() => {
  getAllProducts().then((res) => {
    console.log(res)
    setProductList(res)

  }).catch(() => {
    console.log("Could Not Get Products")
  })
})

console.log(JSON.stringify(productList))



  return (
    <>
     
      <h1>Welcome To Admin</h1>
      <div class="card">
        <div class = "input">
          <input placeholder= "Product Name" onChange = {handleProductNameChange}></input>
          <input type = "number" placeholder= "Product Price" onChange = {handleProductPriceChange}></input>
        </div>
        <div class = "submit">
          <button onClick = {() => {addProduct(undefined, productPrice)}}>
            Add Product
          </button>
          
        </div>
        <div>
            {productList.map((product) => {
              return (
                <>
                  <p>{product.productName}</p>
                  <p>{product.productPrice}</p>
                </>
              )
            })}
          </div>
      </div>
        
       
    </>
  )
}
