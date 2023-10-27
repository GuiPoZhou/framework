<template>
    <div class="kevin_drawer">
        <el-drawer :visible.sync="show" close-on-press-escape destroy-on-close :show-close="false" @close="close"
            :wrapperClosable="false" size="100%" custom-class="customerdraw">
            <div slot="title" class="kevin_drawer_head" ref="kevin_drawer_head">
                <logoVue :title="title"/>
                <div class="kevin_top_steps">
                    <el-steps :active="stepIndex" simple finish-status="success">
                        <el-step :title="item.label" v-for="item in stepList" :key="item.value"></el-step>
                    </el-steps>
                </div>
                <div class="kevin_top_buttons">
                    <slot name="topbuttons"></slot>
                </div>
            </div>
            <div class="kevin_drawer_body" ref="kevin_drawer_body" :style="{ height: KevinDrawerBodyHeight + 'px' }">
                <slot></slot>
            </div>

        </el-drawer>
    </div>
</template>

<script>
import logoVue from './components/logo.vue'
export default {
    components: {
        logoVue
    },
    props: {
        title:String,
        show: {
            typeof: Boolean,
            default: false,
        },
        stepList: Array,
        stepIndex: Number
    },
    data() {
        return {
            showDrawer: false,
            KevinDrawerBodyHeight: 0,
        }
    },
    mounted() {
        this.getBrowserHeight()
        window.addEventListener('resize', this.getBrowserHeight);
    },
    methods: {
        getBrowserHeight() {
            let browserHeight = window.innerHeight;
            // 使用 $refs 来访问 ref 为 "kevin_drawer_head" 的元素
            const drawerHeadElement = this.$refs.kevin_drawer_head;

            // 获取元素的实际高度
            if (drawerHeadElement) {
                const height = drawerHeadElement.clientHeight; // 或者 offsetHeight
                this.KevinDrawerBodyHeight = browserHeight - height
            }
        },
        getDrawerHeadHeight() {

        },
        close() {

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
    /deep/.el-drawer__body{
        overflow: hidden !important;
    }
    /deep/.el-form-item__content >div{
        width: 100%;
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

        .kevin_top_steps {
            width: 25rem;

            /deep/.el-steps--simple {
                background: none;
            }

        }

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
        background-color: #EBEEF5;
        overflow: hidden;

        scrollbar-width: none;
        /* 隐藏标准滚动条（适用于Firefox） */
        -ms-overflow-style: none;
        /* 隐藏IE和Edge浏览器的滚动条 */
    }

    .kevin_drawer_body::-webkit-scrollbar {
        width: 0;
        /* 隐藏滚动条（适用于WebKit引擎，如Chrome和Safari） */
    }
}</style> 