import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const notionAPI = axios.create({
  baseURL: `https://www.notion.so/api/v3`,
})

notionAPI.interceptors.response.use((res) => res.data)

export const notion = <T = any>(config: AxiosRequestConfig) =>
  notionAPI.request<any, T>(config)
