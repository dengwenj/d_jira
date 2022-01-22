import axios from "axios"

const api = process.env.REACT_APP_API_URL

// 创建一个axios实例，就是复制一个axios
const request = axios.create({
  baseURL: api
})

export default request