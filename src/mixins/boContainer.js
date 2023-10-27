/*
 *@author: 焦政
 *@date: 2022-02-18 11:37:40
 *@description:模块主页相关
*/
import { getToken } from '@/utils/auth'
export default {
    data() {
        return {}
    },
    computed: {
        /*
      *@author: 焦政
      *@date: 2022-02-18 11:45:04
      *@description:全局主页语言环境最新状态值
     */
        lang() {
            return this.$store.state.boshland.lang
        },
        mainTableHeight() {
            let height = this.$store.state.boshland.boMainHeight - this.$store.state.boshland.boMainNavHeight - 30
            return height
        },
        // 弹窗内部高度
        DialogHeight() {
            let height = this.$store.state.boshland.boDialogHeight
            return height
        },

    },
    mounted() {

    },
    methods: {
        // 页码连续
        getOrderNumber(arr, pageNum, pageSize) {
            arr.map((item, index) => {
                item.index = (pageNum - 1) * pageSize + index + 1
            })
            return arr
        },
        CreatePageOffice(){
            // if(getToken()){
            //     var scriptNode = document.createElement("script");
            //     scriptNode.type = "text/javascript"
            //     scriptNode.src = `${window.globalEnv.VUE_APP_BASE_API}/pageoffice.js?Authorization=${getToken()}`
            //     document.getElementsByTagName("head")[0].appendChild(scriptNode);
            // }
        },
    }
}
