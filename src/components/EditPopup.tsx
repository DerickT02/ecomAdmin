import { useState, useEffect, useRef } from "preact/hooks" 
import { storage } from '../databaseQueries/config';
import { uploadBytes,ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { updateProduct } from '../databaseQueries/queries'
interface Props{
    toggleEditState: () => void,
    editState: boolean,
    productId: any,
    productName: string,
    productPrice: number,
    productImage: string

}


export default function EditPopup(props: Props){
    const [currImage, setCurrImage] = useState<File>();
    const [productName, setProductName] = useState(props.productName)
    const [productPrice, setProductPrice] = useState(props.productPrice)
    const [imgUrl, setImgUrl] = useState(props.productImage)
    const [loadingState, setLoadingState] = useState("")
    const inputRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    console.log(nameRef.current?.value)



    const handleProductNameChange = (event: any) => {
        setProductName(event.target.value)
        console.log(productName)
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
    
    
    const handleInputRef = () => {
        inputRef.current?.click()
        
    }

    const handleSubmit = (productID: any, productName: string, productPrice: number, productImage: any) => {
        props.toggleEditState()
        updateProduct(productID, productName, productPrice, productImage)
    }

    console.log(productName)
    return(
        <>
            <div class = "edit-card">
                <div class = "edit-card-input">
                    <input onChange = {handleImageChange} ref = {inputRef} type = "file" style = {{"display":"none"}}></input>    
                    <input onChange = {handleProductNameChange} placeholder="Name" type = "text"></input>
                    <input onChange = {handleProductPriceChange} placeholder="Price"  type = "number"></input>
                    <button onClick = {handleInputRef} id = "upload-new-image">Upload Image</button>
                    {loadingState}
                    <div class = "button-container">
                        <button id = "confirm-change" onClick = {() => {handleSubmit(props.productId,productName,productPrice,imgUrl)}}>Confirm Changes</button>
                        <button id = "cancel-change" onClick={props.toggleEditState}>Cancel</button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}