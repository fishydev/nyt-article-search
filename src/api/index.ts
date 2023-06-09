import axios from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  params: {
    "api-key": process.env.REACT_APP_NYT_API_KEY,
  },
})

export default axiosInstance
