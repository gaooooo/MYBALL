import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user-info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getList(params) {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}

export function getUserByOpenid(params) {
  return request({
    url: `/user-info-byopenid`,
    method: 'get',
    params
  })
}
