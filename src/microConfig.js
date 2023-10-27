import store from './store'
import directive from './directive'
import request from "@/utils/request";
import { net } from '@/api/jiaozhengRequest'
import router from './router'
import { checkPermi, checkRole } from "@/utils/permission"; //基座向各级子应用传递权限校验工具
import { loadMicroApp } from 'qiankun';
import KevinEditor from '@/components/KevinEditor'
import KevinRender from '@/components/KevinUi/KevinForm/kevinRender'
import KevinLog from '@/components/KevinUi/KevinLog/index'
import KevinUtil from '@/components/KevinUi/KevinForm/utils/kevinUtils'
const KevinUtils = KevinUtil
const MainComponents = {
    KevinEditor,
    KevinRender,
    KevinLog
}
const commonComponents = {};
window.commonComponents = commonComponents
const MicroApps = [
    //    generic模块  LIMS通用部分
    {
        title: "LIMS通用",//微应用中文描述
        name: 'micGenric',//微应用的name
        // entry 微应用的入口  开发环境对应微应用的服务  生产环境的对应nginx的代理转发
        entry: process.env.NODE_ENV === "production" ? '/subGenric/' : `//${window.location.hostname}:7002`,
        container: '#subcontainer',//用于渲染微应用的容器
        activeRule: '/micGenric',//activeRule 微应用的激活规则  注意微应用之间该值的唯一性
        props: {
            net,
            request,
            store, //基座应用向微应用的传递store
            directive,//共享指令集（权限）
            checkPermi,
            checkRole,
            window: window,
            router,
            loadMicroApp,
            commonComponents,
            MainComponents,
            KevinUtils
        }
    },
    //     foundation模块  行业通用部分
    {
        title: "行业通用",//微应用中文描述
        name: 'micFoundation',//微应用的name
        // entry 微应用的入口  开发环境对应微应用的服务  生产环境的对应nginx的代理转发
        entry: process.env.NODE_ENV === "production" ? '/subFoundation/' : `//${window.location.hostname}:7003`,
        container: '#subcontainer',//用于渲染微应用的容器
        activeRule: '/micFoundation',//activeRule 微应用的激活规则  注意微应用之间该值的唯一性
        props: {
            net,
            request,
            store, //基座应用向微应用的传递store
            directive,//共享指令集（权限）
            checkPermi,
            checkRole,
            window: window,
            router,
            loadMicroApp,
            commonComponents,
            MainComponents
        }
    },
    {
        title: "独有功能",//微应用中文描述
        name: 'micProject',//微应用的name
        // entry 微应用的入口  开发环境对应微应用的服务  生产环境的对应nginx的代理转发
        entry: process.env.NODE_ENV === "production" ? '/subProject/' : `//${window.location.hostname}:7004`,
        container: '#subcontainer',//用于渲染微应用的容器
        activeRule: '/micProject',//activeRule 微应用的激活规则  注意微应用之间该值的唯一性
        props: {
            net,
            request,
            store, //基座应用向微应用的传递store
            directive,//共享指令集（权限）
            checkPermi,
            checkRole,
            router,
            window: window,
            loadMicroApp,
            commonComponents,
            MainComponents
        }
    }, {
        title: "ELN",//微应用中文描述
        name: 'micEln',//微应用的name
        // entry 微应用的入口  开发环境对应微应用的服务  生产环境的对应nginx的代理转发
        entry: process.env.NODE_ENV === "production" ? '/subEln/' : `//${window.location.hostname}:7005`,
        container: '#subcontainer',//用于渲染微应用的容器
        activeRule: '/micEln',//activeRule 微应用的激活规则  注意微应用之间该值的唯一性
        props: {
            net,
            request,
            store, //基座应用向微应用的传递store
            directive,//共享指令集（权限）
            checkPermi,
            checkRole,
            router,
            window: window,
            loadMicroApp,
            commonComponents
        }
    }, {
        title: "物联网",//微应用中文描述
        name: 'micIot',//微应用的name
        // entry 微应用的入口  开发环境对应微应用的服务  生产环境的对应nginx的代理转发
        entry: process.env.NODE_ENV === "production" ? '/subIot/' : `//${window.location.hostname}:7006`,
        container: '#subcontainer',//用于渲染微应用的容器
        activeRule: '/micIot',//activeRule 微应用的激活规则  注意微应用之间该值的唯一性
        props: {
            net,
            request,
            store, //基座应用向微应用的传递store
            directive,//共享指令集（权限）
            checkPermi,
            checkRole,
            router,
            window: window,
            loadMicroApp,
            commonComponents
        }
    },
]
export default MicroApps

