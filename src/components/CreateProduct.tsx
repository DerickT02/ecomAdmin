import { useState, useEffect } from 'preact/hooks'
import { addProduct } from '../databaseQueries/queries';
import { storage } from '../databaseQueries/config';
import { uploadBytes,ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';


export default function CreateProducts(){
    const [imgUrl, setImgUrl] = useState("");
    const [currImage, setCurrImage] = useState<File>();
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState(0.00)
    const [loadingState, setLoadingState] = useState("")

    const handleProductNameChange = (event: any) => {
        setProductName(event.target.value)
      }
    
      const handleProductPriceChange = (event: any) => {
        setProductPrice(event.target.value)
      }

      const handleImageSubmit = () => {
        
        uploadImageToFirebase(currImage)
      }

      async function uploadImageToFirebase(file: any){
       setLoadingState("")
        let productsImagesStorage = ref(storage, `productImages/${file.name}`)
        let uploadTask = uploadBytesResumable(productsImagesStorage, file)
        uploadTask.on("state_changed", (snapshot) => {
          console.log("Progress", (snapshot.bytesTransferred / snapshot.totalBytes) * 100, "%")
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              setLoadingState("Loading")
              break;
            case 'success':
             
          }
        }, (error) => {
          setLoadingState("Could Not Load Image")
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            
            setImgUrl(downloadURL)
            setLoadingState("Done")
          });
        })
        
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
      }, [imgUrl])

      useEffect(() => {
        handleImageSubmit()
      },[currImage])

    return (
        <>
        <div class = "input-form"> 
        <div class = "input">
        <h1>Create Product</h1>
         <input placeholder= "Product Name" onChange = {handleProductNameChange}></input>
         <input type = "number" placeholder= "Product Price" onChange = {handleProductPriceChange}></input>
         <input type = "file" onChange = {handleImageChange}/>
         {loadingState}
         <div class = "submit">
           <button onClick = {() => {addProduct(productName, productPrice, imgUrl)}}>
             Add Product
           </button>
         </div>
       </div> 

     <div class = "product-metrics">
         <h1>Product Metrics</h1>
     </div>
   </div>
        </>
    )
}