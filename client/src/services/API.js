import axios from "axios"
require("dotenv").config()

const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL })

console.log("API Base URL:", process.env.REACT_APP_BASEURL)

API.interceptors.request.use(
  (req) => {
    if (localStorage.getItem("token")) {
      req.headers.Authorization = `Bearer ${localStorage.getItem("token")} `
    }
    console.log("Request:", req.method.toUpperCase(), req.url, req.data)
    return req
  },
  (error) => {
    console.error("Request Error:", error)
    return Promise.reject(error)
  }
)

API.interceptors.response.use(
  (response) => {
    console.log("Response:", response.status, response.data)
    return response
  },
  (error) => {
    console.error(
      "Response Error:",
      error.response ? error.response.data : error.message
    )
    return Promise.reject(error)
  }
)

export default API
