import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import {addProduct} from './databaseQueries/queries'
import './app.css'

export function App() {
  const [count, setCount] = useState(0)
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState(0.00)

  const handleProductNameChange = (event: any) => {
    setProductName(event.target.value)
  }

  const handleProductPriceChange = (event: any) => {
    setProductPrice(event.target.value)
  }

  
//help

  return (
    <>
     
      <h1>Welcome To Admin</h1>
      <div class="card">
        <div class = "input">
          <input placeholder= "Product Name" onChange = {handleProductNameChange}></input>
          <input type = "number" placeholder= "Product Price" onChange = {handleProductPriceChange}></input>
        </div>
        <div class = "submit">
          <button onClick = {() => {addProduct(productName, productPrice)}}>
            Add Product
          </button>
        </div>
      </div>
        
       
    </>
  )
}
