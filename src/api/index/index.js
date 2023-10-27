import request from '@/utils/request'

// 首页统计
export function getIndexData(query) {
  return request({
    url: '/home/index',
    method: 'get',
    params: query,
  })
}
// 公告详情
export function noticeDetail(noticeId) {
  return request({
    url: '/home/notice/' + noticeId,
    method: 'get'
  })
}
// 超期表格数据
export function getOverdueList(query, buttonCode) {
  return request({
    url: '/home/selectList/' + buttonCode,
    method: 'get',
    params: query,
  })
}
// 消息列表
export function getMessageList(query) {
  return request({
    url: '/qualityMessage/list',
    method: 'get',
    params: query,
  })
}
// 消息详情
export function messageDetail(id) {
  return request({
    url: '/qualityMessage/' + id,
    method: 'get'
  })
}
// 修改消息状态
export function messageStatus(id) {
  return request({
    url: '/qualityMessage/updateStatus/' + id,
    method: 'put'
  })
}
// 未读消息
export function getMessageCount(query) {
  return request({
    url: '/qualityMessage/unReadCount',
    method: 'get',
    params: query,
  })
}
// 不再提醒
export function noMoreReminders(id) {
	return request({
		url: `home/noMoreReminders?id=${id}`,
		method: 'post',
	})
}
