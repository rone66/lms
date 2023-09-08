
const BASE_URL= process.env.REACT_APP_BASE_URL
console.log(BASE_URL);


// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/Auth/sendotp",
    SIGNUP_API: BASE_URL + "/Auth/signup",
    LOGIN_API: BASE_URL + "/Auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/Auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/Auth/reset-password",
  }
//all category
export const categories={
    CATEGORIES_API:BASE_URL+"/course/showAllCategories",
};
//contact us 
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/Auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}