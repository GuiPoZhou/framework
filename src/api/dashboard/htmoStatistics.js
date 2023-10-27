import request from '@/utils/request'

// 最上部综合统计
export function getStatisticsTop() {
	return request({
		url: '/v1/homeStatistics/statisticsTop',
		method: 'get'
	})
}

// 委托订单数据统计
export function getEntrustAgreement(currentTabId) {
	return request({
		url: '/v1/homeStatistics/entrustAgreement/'+currentTabId,
		method: 'get'
	})
}

// 检测报告数据统计
export function getDetectReport(currentTabId) {
	return request({
		url: '/v1/homeStatistics/detectReport/'+currentTabId,
		method: 'get'
	})
}

// 样品交接数据统计
export function getHandover(currentTabId) {
	return request({
		url: '/v1/homeStatistics/handover/'+currentTabId,
		method: 'get'
	})
}

// 检验样品数据统计
export function getDetectSample(currentTabId) {
	return request({
		url: '/v1/homeStatistics/detectSample/'+currentTabId,
		method: 'get'
	})
}

// 采样情况统计
export function getSampleInfo() {
	return request({
		url: '/v1/homeStatistics/sampleInfo',
		method: 'get'
	})
}

