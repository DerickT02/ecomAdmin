import { useState } from "preact/hooks"
import EditPopup from "./EditPopup"

interface Props{
    productImage: any,
    productName: any
    productPrice: number,
    id: any,
    deleteProduct: any,
    sales: number,
    rating: number
  
}

export default function ProductCard(props: Props){
    const [edit, setEdit] = useState(false)

    const toggleEdit = () => {
      setEdit(editState => !editState)
    }
    return (
        <>
        {
        !edit ? 
        <>
          <div class = "product-card">
            <div class = "product-name-and-image">
              {props.productImage ? <img src = {props.productImage}></img> : <img></img>}
              <p>{props.productName}</p>
            </div>   
            <p class= "price">${props.productPrice}</p>
            <p>{props.sales}</p>
            <p>{props.rating}</p>
            <button id = "edit" onClick={toggleEdit}>Edit</button>
            <button onClick = {() => {props.deleteProduct(props.id)}}>Delete Product</button>
          </div>
        </> 
        :
        <>
          <EditPopup editState={edit} toggleEditState={toggleEdit} productId = {props.id} productName = {props.productName} productPrice = {props.productPrice} productImage = {props.productImage} />
        </>
        }       
        </>
      )
}