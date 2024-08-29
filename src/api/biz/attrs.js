import request from '@/utils/request'

// 查询类型属性列表
export function listAttrs(query) {
  return request({
    url: '/biz/attrs/list',
    method: 'get',
    params: query
  })
}

// 查询类型属性详细
export function getAttrs(id) {
  return request({
    url: '/biz/attrs/' + id,
    method: 'get'
  })
}

// 新增类型属性
export function addAttrs(data) {
  return request({
    url: '/biz/attrs',
    method: 'post',
    data: data
  })
}

// 修改类型属性
export function updateAttrs(data) {
  return request({
    url: '/biz/attrs',
    method: 'put',
    data: data
  })
}

// 删除类型属性
export function delAttrs(id) {
  return request({
    url: '/biz/attrs/' + id,
    method: 'delete'
  })
}

// 查询类型树结构
export function typeTreeSelect() {
  return request({
    url: '/biz/attrs/typeTree',
    method: 'get'
  })
}