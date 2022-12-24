import { useState, useEffect } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import { addProduct, getAllProducts, deleteProduct} from './databaseQueries/queries'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage, auth } from './databaseQueries/config'
import { signUp, logout, signIn } from './databaseQueries/auth'
import { onAuthStateChanged } from 'firebase/auth'
import './app.css'
import ProductsList from './components/ProductsList'
import CreateProducts from './components/CreateProduct'

export function App() {
  const [count, setCount] = useState(0)
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState(0.00)
  const [productList, setProductList] = useState<any[]>([])
  const [currImage, setCurrImage] = useState<File>();
  const [imgUrl, setImgUrl] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [navIsClicked, setNavIsClicked] = useState(false)
  const [userFormAction, setUserFormAction] = useState("")

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
  console.log(email)
}, [email, password])

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


useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if(user){
      console.log("User UID " + user.uid)
      setIsLoggedIn(true)
    }
    else{
      console.log("No User")
      setIsLoggedIn(false)
    }
  })
}, [isLoggedIn])

  return (
    <>
      <div class="card">
        {/*Navbar.tsx*/}
        <div class = "nav-bar">
          {isLoggedIn ? <><button onClick = {logout}>Logout</button></> : <>
          {navIsClicked ? <>
          <h2>{userFormAction}</h2>
          <input placeholder={"email"} onChange = {(e) => {setEmail((e.target as HTMLInputElement).value)}}></input><input placeholder={"password"} type = "password" onChange={(e) => {setPassword((e.target as HTMLInputElement).value)}}></input>
          {userFormAction == "Login" ? <button onClick = {() => {signIn(email, password)}}>Log In</button> : <button onClick = {() => {signUp(email, password)}}>Sign Up</button>}
          <button onClick = {() => {setNavIsClicked(!navIsClicked)}}>Cancel</button>
          </> : 
          <>
          <button onClick={() => {setUserFormAction("Login"); setNavIsClicked(!navIsClicked)}}>Login</button> <button onClick={() => {setUserFormAction("Sign Up"); setNavIsClicked(!navIsClicked)}}>Sign Up</button>
          </>
          }
          
          </>
          }
    
        </div>
        {/**/}
        {isLoggedIn ? <>
        {/*<div class = "input-form"> 
        <div class = "input">
        <h1>Create Product</h1>
         <input placeholder= "Product Name" onChange = {handleProductNameChange}></input>
         <input type = "number" placeholder= "Product Price" onChange = {handleProductPriceChange}></input>
         <input type = "file" onChange = {handleImageChange}/>
         <div class = "submit">
           <button onClick = {() => {addProduct(productName, productPrice, imgUrl)}}>
             Add Product
           </button>
         </div>
       </div> 

     <div class = "product-metrics">
         <h1>Product Metrics</h1>
     </div>
   </div>*/}
        <CreateProducts />
    
       {/* ProductsList.tsx && ProductsList.css/ Line 135-161*/}
       {/*
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
       
       */}
       <ProductsList />
     
        </> : 
        <>
        <h1>Please Log In Or Sign Up</h1>
        </>}
      
      </div>
        
       
    </>
  )
}
