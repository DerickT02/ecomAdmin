import { useState, useEffect } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import { addProduct, getAllProducts, deleteProduct} from './databaseQueries/queries'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from './databaseQueries/config'
import './app.css'

export function App() {
  const [count, setCount] = useState(0)
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState(0.00)
  const [productList, setProductList] = useState<any[]>([])
  const [currImage, setCurrImage] = useState<File>();
  const [imgUrl, setImgUrl] = useState("");

  const handleProductNameChange = (event: any) => {
    setProductName(event.target.value)
  }

  const handleProductPriceChange = (event: any) => {
    setProductPrice(event.target.value)
  }

async function uploadImageToFirebase(file: any){
   
    let productsImagesStorage = ref(storage, `productImages/${file.name}`)
    uploadBytes(productsImagesStorage, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            
            setImgUrl(url)
            console.log(imgUrl)
        })
        
    })
    
}

  const handleImageSubmit = () => {
    uploadImageToFirebase(currImage)
  }

  const handleImageChange = (e: any) => {
    const files = (e.target as HTMLInputElement).files
    if(files && files.length >= 0){
      setCurrImage(files[0])
    }
    console.log("Files " + JSON.stringify(files))
    console.log(currImage?.name)  
    
   }

useEffect(() => {
  getAllProducts().then((res) => {
  
    setProductList(res)

  }).catch(() => {
    console.log("Could Not Get Products")
  })
}, [])

useEffect(() => {
  console.log("File in State " + currImage)
  handleImageSubmit()
}, [currImage, imgUrl])

console.log(JSON.stringify(productList))



  return (
    <>
     
      <h1>Welcome To Admin</h1>
      <div class="card">
        <div class = "input-form">
          <div class = "input">
            <input placeholder= "Product Name" onChange = {handleProductNameChange}></input>
            <input type = "number" placeholder= "Product Price" onChange = {handleProductPriceChange}></input>
            <input type = "file" onChange = {handleImageChange}/>
          </div>
        
          <div class = "submit">
            <button onClick = {() => {addProduct(productName, productPrice, imgUrl)}}>
              Add Product
            </button>
          </div>
        </div>

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
      </div>
        
       
    </>
  )
}
