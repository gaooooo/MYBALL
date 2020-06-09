import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/topics',
    method: 'get',
    params
  })
}

export function create(data) {
  return request({
    url: '/topics',
    method: 'post',
    data
  })
}

export function destroy(id) {
  return request({
    url: `/topics/${id}`,
    method: 'delete'
  })
}

export function putItem(id, payload) {
  return request({
    url: `/topics/${id}`,
    method: 'put',
    payload
  })
}

export function getItem(id) {
  return request({
    url: `/topics/${id}`,
    method: 'get'
  })
}
