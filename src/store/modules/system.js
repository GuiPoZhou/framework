import {net} from '@/api/jiaozhengRequest'
import themeList from '../theme/index'

const system = {
    state: {
        systemInfo: {
            projectName: 'LIMS管理系统',
            logoPath: 'aaa',
            title: 'LIMS管理系统',
            extData: {
                icoName:'',
                onlineOfficeServer:"http://192.168.36.59:9980",
                nameColor: '#000000',
            }
        },
        themeList: themeList,
        defaultTheme:'',
        themeTypeName:'envKevin'
    },
    mutations: {
        set_systemInfo(state, info) {
            state.systemInfo = info
        },
        set_themeList(state, list) {
            state.themeList = list
        },
        set_defaultTheme(state,name){
            state.defaultTheme = name
        },
        set_themeTypeName(state,name){
            state.themeTypeName = name
        }
    },
    actions: {
        getSystemInfo({commit}) {
            net('/v1/theme/queryProjectInfo', 'get').then(re => {
                if (re.code == 200 && re.data) {
                    commit('set_systemInfo', re.data)
                    commit('set_themeTypeName', re.data.extData.themeTypeName || 'envKevin')
                    document.title = re.data.title
                }

            })
        },
        async getSystemThem({commit}) {
            let re = await net('/v1/theme/queryThemeSkinList', 'get')
            if(re.code == 200) {
                if (re.data && re.data.length != 0) {
                    let list = re.data.filter(item => {
                        return item.hasDefault == true
                    })
                    if(list.length!=0){
                        commit('set_defaultTheme', list[0].themeSkin)
                    }else{
                        commit('set_defaultTheme', themeList[0])
                    }

                } else {
                    commit('set_defaultTheme', themeList[0])
                }
            }
        }
    }
}
export default system

