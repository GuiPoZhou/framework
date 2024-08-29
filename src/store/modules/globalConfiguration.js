/**
 * 存放 ** 数据
 * **/
    // initial state
const state = {
        globalObj: {}
    }

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
    setGlobal(state, payload) { //设置参数
        state.globalObj = payload;
        //这里打印下看下是否有接收到,
        console.log('是否有接收到',state.globalObj);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}