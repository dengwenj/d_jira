import request from "utils/request"

export const login = <T>(data: T) => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}