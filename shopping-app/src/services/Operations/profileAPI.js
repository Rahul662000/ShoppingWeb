import { profileEndpoints } from "../API"
import { APIConnector } from "../APIConnecter"
import { logout } from "./authAPI"
import { setLoading , setUser } from "../../slices/profileSlice"
import { toast } from "react-hot-toast"

const { GET_USER_DETAILS_API , 
    // GET_USER_ENROLLED_COURSES_API , GET_INSTRUCTOR_DATA_API 
} = profileEndpoints

export function getUserDetails(token,navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{    
            const response = await APIConnector("GET",GET_USER_DETAILS_API,null,{
                Authorisation:`Bearer ${token}`,
            })
            console.log("Get User Details API Response....",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            const userImage = response.data.data.image ? response.data.data.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
            console.log(userImage)
            dispatch(setUser({...response.data.data , image:userImage}))
        }
        catch(error){
            dispatch(logout(navigate))
            console.log("Get User Details API Error.......",error)
            toast.error("Could not get user details")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))

    }
}