import axios from 'axios'

declare const process: {
  env?: Record<string, string | undefined>
}

const httpClient = axios.create({
  baseURL: process.env?.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

httpClient.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

export default httpClient
