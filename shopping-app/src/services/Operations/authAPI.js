import {toast} from "react-hot-toast"
import {endpoints} from "../API"
import {APIConnector} from "../APIConnecter" 
import { setLoading ,setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"

const {
    SIGNUP_API,
    LOGIN_API,
    LOGOUT_API
} = endpoints

export function signUp(accountType , firstName , lastName , email , password , confirmPassword , navigate){
    return async (dispatch) => {
        const toastId = toast.loading("LOADING...")
        dispatch(setLoading(true))
        try{
            const response = await APIConnector("POST",SIGNUP_API , {
                accountType,firstName,lastName,email,password,confirmPassword
            
            })

            console.log("SIGNUP API RESPONSE........." , response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Signup Successfully")
            dispatch(setToken(response.data.token))
            dispatch(setUser({...response.data.user}))


            localStorage.setItem("user",JSON.stringify(response.data.user))
            localStorage.setItem("jwt",JSON.stringify(response.data.token))
            // navigate("/login")
            navigate("/")
        }
        catch(error){
            console.log("SIGNUP API ERROR......",error)
            toast.error("SignUp Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email , password , navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        try{
            const response = await APIConnector("POST",LOGIN_API,{
                email,password,
            })

            console.log("LOGIN API RESPONSE...... " , response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Login Successfull")
            dispatch(setToken(response.data.token))

            console.log(response.data)

            const userImage = response.data?.existUser?.image ? response.data.existUser.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({...response.data.user , image:userImage}))

            localStorage.setItem("user",JSON.stringify(response.data.user))
            localStorage.setItem("jwt",JSON.stringify(response.data.token))
           
            navigate("/")
        }
        catch (error) {
            console.error("LOGIN API ERROR......", error);
            toast.error(`Login Failed: ${error.message || "An unexpected error occurred"}`);
          }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate){
    return async(dispatch) => {

        await APIConnector("POST" , LOGOUT_API , {})
        dispatch(setToken(null))
        dispatch(setUser(null))
        // dispatch(resetCart())
        localStorage.removeItem("jwt")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}