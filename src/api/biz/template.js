import request from '@/utils/request'

// 查询模版列表
export function listTemplate(query) {
  return request({
    url: '/biz/template/list',
    method: 'get',
    params: query
  })
}

// 查询模版详细
export function getTemplate(id) {
  return request({
    url: '/biz/template/' + id,
    method: 'get'
  })
}

// 新增模版
export function addTemplate(data) {
  return request({
    url: '/biz/template',
    method: 'post',
    data: data
  })
}

// 修改模版
export function updateTemplate(data) {
  return request({
    url: '/biz/template',
    method: 'put',
    data: data
  })
}

// 删除模版
export function delTemplate(id) {
  return request({
    url: '/biz/template/' + id,
    method: 'delete'
  })
}

// 获取模版新Number，自动增长列
export function getTemplateCode() {
  return request({
    url: '/biz/template/number',
    method: 'get'
  })
}