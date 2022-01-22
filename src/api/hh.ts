import qs from 'qs'

import request from "utils/request"
import { clearObject } from 'utils'

export const login = <T>(data: T) => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

export const register = <T>(data: T) => {
  return request({
    url: '/register',
    method: 'POST',
    data
  })
}

export const projects = <T>(debounce: T) => {
  return request({
    url: `/projects?${qs.stringify(clearObject(debounce))}`,
    method: 'GET'
  })
}

export const user = () => {
  return request({
    url: '/users',
    method: 'GET'
  })
}