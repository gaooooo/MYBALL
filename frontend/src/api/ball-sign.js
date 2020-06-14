import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/ball-signs',
    method: 'get',
    params
  })
}

export function create(data) {
  return request({
    url: '/ball-signs',
    method: 'post',
    data
  })
}

export function destroy(id) {
  return request({
    url: `/ball-signs/${id}`,
    method: 'delete'
  })
}

export function putItem(id, payload) {
  return request({
    url: `/ball-signs/${id}`,
    method: 'put',
    data: payload
  })
}

export function getItem(id) {
  return request({
    url: `/ball-signs/${id}`,
    method: 'get'
  })
}
