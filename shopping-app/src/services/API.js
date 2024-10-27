const BASE_URL = process.env.REACT_APP_BASE_URL

// Auth Endpoints
export const endpoints = {
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    LOGOUT_API: BASE_URL + "/auth/logout",
}

export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
}
// SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    // CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    // DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
  }