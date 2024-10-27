import { toast } from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"
import { APIConnector } from "../APIConnecter"
import { settingsEndpoints } from "../API"
import { logout } from "./authAPI"

const {
    UPDATE_DISPLAY_PICTURE_API , 
    // CHANGE_PASSWORD_API , DELETE_PROFILE_API ,
    UPDATE_PROFILE_API , 
} = settingsEndpoints

export function updateProfile(token , formData){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        console.log("Form Data",formData)
        try{
            const response = await APIConnector("PUT",UPDATE_PROFILE_API , formData , {
                Authorisation: `Bearer ${token}`
            })
            console.log("Update Profile API API RESPONSE...",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            const userImage = response.data.updatedUserDetails.image ? response.data.updatedUserDetails.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
            console.log("useImage",userImage)

            console.log("useImage",userImage)
            
            dispatch(
                setUser({...response.data.updatedUserDetails,image:userImage})
            )
            
        }catch(error){
            console.log("UPDATE PROFILE API ERROR...",error)
            toast.error("Could not update profile")
        }
        toast.dismiss(toastId)
    }
}

export function updateDisplayPicture(token , formData){
    return async (dispatch) => {
        const toastId = toast.loading("Loading")
        try{
            const response = await APIConnector("PUT" , UPDATE_DISPLAY_PICTURE_API , formData , {
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            })
            console.log("UPDATE DISPLAY_PICTURE_API API RESPONSE....",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            dispatch(setUser(response.data.data))
        }
        catch(error){
            console.log("UPDATE DISPLAY PICTURE API ERROR....",error)
            toast.error("Could not Update Display Picture")
        }
        toast.dismiss(toastId)
    }
}
