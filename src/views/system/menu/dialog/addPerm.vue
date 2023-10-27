<template>
    <BoDialog dia-log-title="新增权限" :dia-log-show="showlog" dia-log-width="70%" @close="e_close">
        <template slot="bologbody">
            <el-table
                :data="permsList"
                style="width: 100%">
                <el-table-column
                    prop="menuName"
                    align="center"
                    label="权限名称"></el-table-column>
                <el-table-column
                    prop="perms"
                    align="center"
                    label="权限标识">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="e_add(scope.row)" :disabled="submiLoading">添加
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template slot="bologfooter">
            <el-button size="small" @click="e_close">关闭</el-button>
        </template>
    </BoDialog>
</template>
<script>
import axios from "axios";
import MicroApps from '@/microConfig'
import { getToken } from '@/utils/auth'

export default {
    data() {
        return {
            submiLoading: false,
            showlog: false,
            menuInfo: null,
            hasPermList: [],
            MicroApps,
            permsList: []
        }
    },
    methods: {
        /**
         * @author Coder
         * @date 2022/12/16
         * @des 新增
         */
        async e_add(row) {
            let params = {
                isCache: "0",
                isFrame: "1",
                menuType: "F",
                orderNum: 0,
                parentId: this.menuInfo.menuId,
                status: "0",
                visible: "0",
                ...row
            }
            this.submiLoading = true
            setTimeout(()=>{this.submiLoading = false},2500)
            let addRes = await this.$net('system/menu', 'post', params)
            this.submiLoading = false
            if (addRes.code == 200) {
                this.$message.success('添加成功')
                await this.e_getPermsList()
                this.e_getPerList()
            }
        },
        e_close() {
            this.$emit('close')
        },
        async init(menuInfo) {
            this.showlog = true
            this.menuInfo = menuInfo
            await this.e_getPermsList()
            this.e_getPerList()
        },
        /**
         * @author Coder
         * @date 2022/12/16
         * @des 获取菜单下的权限信息
         */
        async e_getPermsList() {
            let info = await this.$net(`system/menu/${this.menuInfo.menuId}`, 'get')
            this.hasPermList = info.data.children
        },
        /**
         * @author Coder
         * @date 2022/12/16
         * @des 根据当前菜单所属的应用查询对应的路由表并筛选出未添加的权限
         */
        async e_getPerList() {
            let microActiveRule = this.menuInfo.path.split('/')[1]
            let microEntry = 'sub' + microActiveRule.split('mic')[1]
            console.log('microEntry',microEntry)
            let url = ''
            if (process.env.NODE_ENV == 'production') {

                url = `${window.location.protocol}//${window.location.host}/${microEntry}/profiles/router.json`
                console.log('生产读取',url)
            } else {
                let microInfo = this.MicroApps.filter(item => {
                    return item.activeRule == `/${microActiveRule}`
                })
                let entry = microInfo[0].entry
                url = `${entry}/profiles/router.json`
            }
            let microRouterInfo = await axios.get(url, { headers: { 'Authorization': getToken() } })
            let microRouterList =JSON.parse(JSON.stringify(microRouterInfo.data.routerList))
            if(microRouterList && microRouterList.length !=0){
                microRouterList.forEach(item=>{
                    item.path = item.path.split('/:')[0]
                    item.path = `${microRouterInfo.data.routerPrefix}${item.path}`
                })
            }
            console.log('this.menuInfo.path',this.menuInfo.path)
            
            let checkPath = this.menuInfo.path.split(/(\/[0-9]+)$/)[0]
            
            let microFuncRouterList = microRouterList.filter(item => {
                return item.path == checkPath
            })
            if (microFuncRouterList.length != 0) {
                let arr = []
                let microFuncRouterInfo = microFuncRouterList[0]
                let hasPerms = this.hasPermList.map(item => {
                    return item.perms
                })
                microFuncRouterInfo.permList.map(item => {
                    if (hasPerms.indexOf(`${microRouterInfo.data.moduleName}:${microFuncRouterInfo.name}:${item.symbolName}`) == -1) {
                        let obj = {
                            menuName: item.name,
                            perms: `${microRouterInfo.data.moduleName}:${microFuncRouterInfo.name}:${item.symbolName}`
                        }
                        arr.push(obj)
                    }
                })
                this.permsList = arr
            }

        },

    }
}
</script>
