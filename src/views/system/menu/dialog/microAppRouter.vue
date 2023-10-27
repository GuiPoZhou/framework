<template>
    <BoDialog dia-log-title="选择路由表" :dia-log-show="showlog" dia-log-width="70%" @close="e_close">

        <template slot="bologbody">
            <el-form ref="form" :model="form" label-width="100px">

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="模块选择">
                            <el-select v-model="moduleEntry" placeholder="请选择模块" @change="e_selectModule">
                                <el-option v-for="(v, i) in MicroApps" :key="i" :label="v.title"
                                    :value="v.entry"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="菜单名称">
                            <el-input v-model="metaName" @change="searchMeta"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-table :data="scope.row.permList" style="width: 100%">
                            <el-table-column prop="name" align="center" label="权限名称">
                            </el-table-column>
                            <el-table-column prop="symbolName" align="center" label="权限标识">
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column prop="meta" align="center" label="菜单名称">
                </el-table-column>
                <el-table-column prop="path" align="center" label="菜单路径">
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="e_selRouter(scope.row)">选择</el-button>
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
            metaName: '',// 名称
            moduleEntry: '',//模块路由请求路径
            form: {},
            MicroApps,
            showlog: false,
            tableData: [],
            queryParams: {
                pageNum: 1,
                pageSize: 10
            },
            originalData: [],
        }
    },
    methods: {
        searchMeta() {
            this.tableData = this.originalData.filter(item => item.meta.includes(this.metaName))
        },
        /**
         * @author Coder
         * @date 2022/12/6
         * @des 选择模块
         */
        async e_selectModule(e) {
            let url = ''
            process.env.NODE_ENV === "production" ? url = `${e}profiles/router.json` : url = `${e}/profiles/router.json`
            let getRes = await axios.get(url, { headers: { 'Authorization': getToken() } })
            let info = getRes.data
            let arr = []
            for (let j = 0; j < info.routerList.length; j++) {
                let item = info.routerList[j]
                if (item.permList) {
                    for (let i = 0; i < item.permList.length; i++) {
                        item.permList[i].symbolName = `${info.moduleName}:${item.name}:${item.permList[i].symbolName}`
                    }
                } else {
                    item.permList = []
                }

                let obj = {
                    meta: item.meta,
                    path: `${info.routerPrefix}${item.path}`,
                    permList: item.permList
                }
                arr.push(obj)
            }
            this.tableData = arr
            this.originalData = arr
        },
        /**
         * @author Coder
         * @date 2022/11/29
         * @des 选择地址
         */
        e_selRouter(row) {
            let params = {
                meta: row.meta,
                path: row.path,
                children: []
            }
            for (let i = 0; i < row.permList.length; i++) {
                let obj = {
                    menuName: row.permList[i].name,
                    perms: row.permList[i].symbolName,
                    orderNum: 0
                }
                params.children.push(obj)
            }
            this.$emit('confirm', params)
            this.showlog = false
        },
        /**
         * @author Coder
         * @date 2022/11/29
         * @des 渲染
         */
        init() {
            this.showlog = true
        },
        e_close() {
            this.$emit('close')
        },
        /**
         * @author Coder
         * @date 2022/11/29
         * @des 获取路由表
         */
        async e_getMicroRouterList() {
            console.log('aa', this.MicroApps)
            let arr = []
            for (let i = 0; i < this.MicroApps.length; i++) {

                arr.push(list)
            }
            console.log('结果', arr)
            // let url = `${process.env.VUE_APP_MICROAPI}/app/boshland/appRouter/getMicroRouterList`
            // axios.get(url,{params:this.queryParams}).then(re=>{
            //     this.tableData = re.data.data.rows
            //     console.log(re)
            // })
        },
        async getMicroRouterList(url) {
            return new Promise((re, rj) => {
                axios.get(url).then(res => {
                    re(res.data)
                })
            })
        }
    }
}
</script>
