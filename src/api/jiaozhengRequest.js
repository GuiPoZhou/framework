/*
 *@author: 焦政
 *@date: 2021-09-14 16:31:34
 *@description:独立封装请求  把接口地址 放置到实际业务页面中去，免除多余文件的创建与多文件的引入
 */
import request from '@/utils/request'

export function net(url, method, params = {}) {
    return new Promise((re, rj) => {
        switch (method) {
            case 'post':
                re(requestPost(url, params))
                break;
            case 'get':
                re(requestGet(url, params))
                break;
            case 'delete':
                re(requestDelete(url, params))
                break;
            case 'deleteData':
                re(requestDeleteData(url, params))
                break;
            case 'put':
                re(requestPut(url, params))
                break;
            case 'postFile'://导出文档
                re(requestPostFile(url, params))
                break
            case 'getFile'://导出文档
                re(requestGetFile(url, params))
                break
        }
    })
}

function requestGetFile(url, data) {
    return request({
        url,
        method: 'get',
        params: data,
        responseType: 'blob',
    })
}

function requestPostFile(url, data) {
    return request({
        url,
        method: 'post',
        data,
        responseType: 'blob',
    })
}

function requestPost(url, data) {
    return request({
        url,
        method: 'post',
        data
    })
}

function requestGet(url, params) {
    return request({
        url,
        method: 'get',
        params
    })
}


function requestDelete(url, params) {
    return request({
        url,
        method: 'delete',
        data: params,
    })
}


function requestDeleteData(url, params) {
    return request({
        url,
        method: 'delete',
        data: params,
    })
}


function requestPut(url, data) {
    return request({
        url,
        method: 'put',
        data
    })
}
