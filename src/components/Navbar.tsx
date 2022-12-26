import { logout, signIn, signUp } from "../databaseQueries/auth"
import { useEffect, useState } from 'preact/hooks'
interface Props{
    isLoggedIn: boolean

}

export default function Navbar(props: Props){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [navIsClicked, setNavIsClicked] = useState(false)
    const [userFormAction, setUserFormAction] = useState("")

    useEffect(() => {
        console.log("Email " + email, "Password " + password)
    }, [email, password])

    return(
        <>
            <div class = "nav-bar">
          {props.isLoggedIn ? <><button onClick = {logout}>Logout</button></> : <>
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
        </>
    )
}