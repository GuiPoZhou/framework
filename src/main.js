import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive
import plugins from './plugins' // plugins
import { download, downloadNew } from '@/utils/request'

import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from '@/api/system/dict/data'
import { getConfigKey } from '@/api/system/config'
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from '@/utils/ruoyi'
// 分页组件
import Pagination from '@/components/Pagination'
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar'
// 富文本组件
import Editor from '@/components/Editor'
// 文件上传组件
import FileUpload from '@/components/FileUpload'
// 图片上传组件
import ImageUpload from '@/components/ImageUpload'
// 图片预览组件
import ImagePreview from '@/components/ImagePreview'
// 字典标签组件
import DictTag from '@/components/DictTag'
// 头部标签组件
import VueMeta from 'vue-meta'
// 字典数据组件
import DictData from '@/components/DictData'
import { scrollBoard } from '@jiaminghi/data-view'
// 时间插件
import moment from "moment";

Vue.use(scrollBoard)
// 全局方法挂载
Vue.prototype.$BASE_API = window.globalEnv.VUE_APP_BASE_API
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.downloadNew = downloadNew
Vue.prototype.handleTree = handleTree
Vue.prototype.moment = moment

// 全局组件挂载
Vue.component('DictTag', DictTag)
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.component('Editor', Editor)
Vue.component('FileUpload', FileUpload)
Vue.component('ImageUpload', ImageUpload)
Vue.component('ImagePreview', ImagePreview)

Vue.use(directive)
Vue.use(plugins)
Vue.use(VueMeta)
DictData.install()
// //挂载mixins
// import BoContainerMixin from './mixins/boContainer'
// Vue.mixin(BoContainerMixin)

//外层布局容器
import BoContainer from './components/Boshland/BoContainer/boContainer'
import BoMain from './components/Boshland/BoContainer/boMain'
import BoDialog from "./components/Boshland/BoContainer/boDialog";
Vue.component('BoContainer', BoContainer)
Vue.component('BoMain', BoMain)
Vue.component('BoDialog', BoDialog)

import {net} from '@/api/jiaozhengRequest'
Vue.prototype.$net = net



// import MasterBanUi from '/Users/jiaozheng/Desktop/MyProject/masterban-ui/masterban-ui'
// import "/Users/jiaozheng/Desktop/MyProject/masterban-ui/masterban-ui/masterban-ui.css"

// import MasterBanUi from 'masterban-ui'
// import "masterban-ui/masterban-ui.css"
// Vue.use(MasterBanUi)

import MasterBanUi from  '@/components/MasterBanUi/index'
Vue.use(MasterBanUi)
import { registerMicroApps,loadMicroApp, start,setDefaultMountApp } from 'qiankun';
window.loadMicroApp = loadMicroApp
import {checkPermi} from "@/utils/permission";
Vue.prototype.$checkPermi = checkPermi
/**
* @author Coder
* @date 2022/10/25
* @des register micro apps to zhe pedestal
*/
import MicroApps from './microConfig'
registerMicroApps(MicroApps);

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#pedestal',
  router,
  store,
  render: h => h(App)
})
// start();
