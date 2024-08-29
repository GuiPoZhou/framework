import request from '@/utils/request'

// 查询模版关系列表
export function listTplink(query) {
  return request({
    url: '/biz/tplink/list',
    method: 'get',
    params: query
  })
}

// 查询模版关系详细
export function getTplink(id) {
  return request({
    url: '/biz/tplink/' + id,
    method: 'get'
  })
}

// 新增模版关系
export function addTplink(data) {
  return request({
    url: '/biz/tplink',
    method: 'post',
    data: data
  })
}

// 修改模版关系
export function updateTplink(data) {
  return request({
    url: '/biz/tplink',
    method: 'put',
    data: data
  })
}

// 删除模版关系
export function delTplink(id) {
  return request({
    url: '/biz/tplink/' + id,
    method: 'delete'
  })
}
