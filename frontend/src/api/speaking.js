import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/speakings',
    method: 'get',
    params
  })
}

export function create(data) {
  return request({
    url: '/speakings',
    method: 'post',
    data
  })
}

export function destroy(id) {
  return request({
    url: `/speakings/${id}`,
    method: 'delete'
  })
}

export function putItem(id, payload) {
  return request({
    url: `/speakings/${id}`,
    method: 'put',
    data: payload
  })
}

export function getItem(id) {
  return request({
    url: `/speakings/${id}`,
    method: 'get'
  })
}
