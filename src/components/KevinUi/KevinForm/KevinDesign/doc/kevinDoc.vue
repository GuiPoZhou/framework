<template>
    <div class="kevin_drawer">
        <el-drawer :visible.sync="showDrawer" close-on-press-escape destroy-on-close :show-close="false" @close="e_close"
            :wrapperClosable="false" size="70%" custom-class="customerdraw" direction="ltr">
            <div slot="title" class="kevin_drawer_head" ref="kevin_drawer_head">
                <span class="drawertitle">低码表单开发文档(文档持续更新中。。。)</span>
                <div class="kevin_top_buttons">
                    <el-button size="small" @click="e_close">关闭</el-button>
                </div>
            </div>
            <div class="kevin_drawer_body" ref="kevin_drawer_body" :style="{ height: KevinDrawerBodyHeight + 'px' }">

                <div class="k_d_b_left">
                    <el-tree :data="treeList" :props="defaultProps" @node-click="e_selProject" :highlight-current="true"
                        :default-expand-all="true" icon-class="el-icon-menu"></el-tree>
                </div>
                <div class="k_d_b_center">
                    <markdown-it-vue class="md-body" :content="htmlMD" :options="options" />
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import axios from 'axios'
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
export default {
    components: {
        MarkdownItVue,
    },
    props: {
        localSaveHost: String,

    },
    data() {
        return {
            options: {
                markdownIt: {
                    linkify: false
                },
            },
            htmlMD: '',
            showDrawer: false,
            KevinDrawerBodyHeight: 0,
            treeList: [
                {
                    name: '开发指南',
                    childList: [
                        {
                            name: '表单模版',
                            docName: 'KevinRenderModule',
                        }, {
                            name: '全局参数',
                            docName: 'KevinContainer'
                        }
                    ]
                },
                {
                    name: '导航组件',
                    childList: [
                        {
                            name: 'ELTabs',
                            docName: 'ELTabs',
                        }
                    ]
                }, {
                    name: '数据组件',
                    childList: [
                        {
                            name: '基础表格 el-table',
                            docName: 'ELTable',
                        }, {
                            name: '树形组件 el-tree',
                            docName: 'ELTree'
                        }
                    ]
                }

            ],
            defaultProps: {
                children: 'childList',
                label: 'name'
            },
            mainTypeId: '',
            selProjectId: '',
            detailIds: [],
            projectModuleList: [],
            selProjectModuleId: '',
            saveLocalInfo: {}
        }
    },
    created() {


    },
    mounted() {

        this.getBrowserHeight()
        window.addEventListener('resize', this.getBrowserHeight);
    },
    methods: {
        e_save() {
            this.$confirm('确定执行提交保存,已存在的表单将被覆盖').then(async () => {
                await this.getLowCodeForm()
                this.saveLocalInfo.projectId = this.selProjectId
                this.saveLocalInfo.projectModuleId = this.selProjectModuleId
                axios.post(this.localSaveHost + '/admin/boshland/projectForm/saveProjectForm', this.saveLocalInfo, {
                    headers: {
                        'Authorization': sessionStorage.getItem('localAccountToken'), // 添加Authorization头，替换为实际的令牌
                    }
                }).then(re => {
                    console.log('re', re)
                    if (re.data.code == 1000) {
                        this.$message.success('提交保存成功')
                        this.$emit('saveSuccess')
                    }

                }).catch(error => {
                    sessionStorage.removeItem('localAccountToken')
                    this.$message.error('授权账户登录失效')
                    this.$emit('localLogin')
                })
            })
        },
        e_selProject(data) {
            if (data.docName) {
                let url = `./doc/${data.docName}.md`
                axios.get(url).then(re => {
                    this.htmlMD = re.data;
                })
            } else {
                this.htmlMD = ''
            }

        },
        // 查询项目
        getlocalProject() {
            axios.get(this.localSaveHost + '/open/boshland/getKevinList/getProject').then(re => {
                this.treeList = re.data.data
            })
        },
        init() {
            this.showDrawer = true
        },
        getBrowserHeight() {
            let browserHeight = window.innerHeight;
            // 使用 $refs 来访问 ref 为 "kevin_drawer_head" 的元素
            const drawerHeadElement = this.$refs.kevin_drawer_head;

            // 获取元素的实际高度
            if (drawerHeadElement) {
                const height = drawerHeadElement.clientHeight; // 或者 offsetHeight
                console.log('Drawer Head Height:', height);
                this.KevinDrawerBodyHeight = browserHeight - height - 50
            }
        },
        async getLowCodeForm() {
            let re = await this.$net('/formLayout/v2/getFormLayoutConfig', 'get', { id: this.saveLocalInfo.id })
            this.saveLocalInfo.configStr = JSON.parse(re.data.configStr)
        },
        getDrawerHeadHeight() {

        },
        e_close() {
            this.$emit('close')
        }
    }

}
</script>

<style scoped lang="scss">
.kevin_drawer {
    width: 100%;
    height: 100%;
    overflow: hidden;



    /deep/.el-drawer {
        padding: 0 !important;
        overflow: hidden;
    }

    /deep/.el-drawer__body {
        overflow: hidden !important;
    }

    /deep/.el-form-item__content>div {
        width: 98.5%;
    }

    /deep/.el-drawer__header {
        padding: 0 !important;
        margin: 0 !important;
    }

    .kevin_drawer_head {
        width: 100%;
        height: 3.5rem;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .kevin_top_buttons {
            width: 20%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            margin-right: 1rem;
        }
    }

    .kevin_drawer_body {
        width: 100%;
        height: 100%;
        background-color: #EBEEF5;
        overflow: hidden;
        padding: 0.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;

        .k_d_b_left {
            width: 19%;
            height: 100%;
            background-color: #fff;
            border-radius: 10px;
            padding: 0.7rem;

            /deep/.el-tree-node.is-current>.el-tree-node__content {

                background-color: #4468EE !important;
                color: #FFD55E;
                font-size: 1.2rem;
                font-weight: bold;
                border-radius: 0.2rem;

            }
        }

        .k_d_b_center {
            flex: 1;
            height: 100%;
            background-color: #fff;
            border-radius: 10px;
            margin: 0 0.7rem;
            padding: 0.7rem;
            overflow: auto;

            /deep/.el-tree-node.is-current>.el-tree-node__content {

                background-color: #4468EE !important;
                color: #FFD55E;
                font-size: 1.2rem;
                font-weight: bold;
                border-radius: 0.2rem;

            }
        }

        .k_d_b_right {
            flex: 1;
            height: 100%;
            background-color: #fff;
            border-radius: 10px;
            padding: 0.7rem;
        }

        .tree_area {
            width: 100%;
            height: 100%;
            overflow: auto;
            scrollbar-width: none;
            /* 隐藏标准滚动条（适用于Firefox） */
            -ms-overflow-style: none;

            /* 隐藏IE和Edge浏览器的滚动条 */
            &::-webkit-scrollbar {
                width: 0;
                /* 隐藏滚动条（适用于WebKit引擎，如Chrome和Safari） */
            }
        }
    }

    .drawertitle {
        font-size: 1.4rem;
        margin-left: 1rem;
        // background: linear-gradient(to right, #1267CE 33%, #D4D4D4 33%, #D4D4D4 66%, #EB8918 66%);
        // background-clip: text;
        // -webkit-background-clip: text;
        // color: transparent;
        // user-select: none;
        // -webkit-user-select: none;
        // -moz-user-select: none;
        // -ms-user-select: none;
    }
}
</style> 