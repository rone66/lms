
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