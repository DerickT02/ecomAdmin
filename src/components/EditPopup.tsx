import { useRef } from 'preact/hooks'



interface Props{
    toggleEditState: () => void,
    editState: boolean,
    productId: any
}


export default function EditPopup(props: Props){
    
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleInputRef = () => {
        inputRef.current?.click()
    }
    return(
        <>
            <div class = "edit-card">
                <div class = "edit-card-input">
                    <input ref = {inputRef} type = "file" placeholder="Image" value = "Choose Image" style = {{"display":"none"}}></input>    
                    <input placeholder="Name"></input>
                    <input type = "number" placeholder="Price"></input>
                    <button onClick = {handleInputRef} id = "upload-new-image">Upload Image</button>
                    <div class = "button-container">
                        <button id = "confirm-change">Confirm Changes</button>
                        <button id = "cancel-change" onClick={props.toggleEditState}>Cancel</button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}