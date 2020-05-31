import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/balls',
    method: 'get',
    params
  })
}

export function create(data) {
  return request({
    url: '/balls',
    method: 'post',
    data
  })
}

export function destroy(id) {
  return request({
    url: `/balls/${id}`,
    method: 'delete'
  })
}