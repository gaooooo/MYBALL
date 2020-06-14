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

export function getList() {
  return request({
    url: '/users',
    method: 'get'
  })
}

export function getUserByOpenid(openid) {
  return request({
    url: `/user-info-byopenid`,
    method: 'get',
    params: openid
  })
}
