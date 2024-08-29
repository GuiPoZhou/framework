<template>
<div class="reportCont">
    <div class="titleBox">
        <div class="line"></div>
        <div class="name">报告数据</div>
    </div>
    <div>
        <el-row :gutter="20">
            <el-col :span="5">
                <div class="grid-content">
                    <div v-for="item in dataList" class="grid_bot">
                        <div class="itemName">
                            <img :src="item.img" alt="">
                            <p class="sp1 sp4">{{item.name}}</p>
                        </div>
                        <p class="sp2 sp3" :style="{cursor:(activeName==1 && item.value > 0?'pointer':'default')}" @click="handleUrl(item)">
                            <CountTo
                                :startVal='startVal'
                                :endVal='item.value'
                                :duration='duration'
                            /></p>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content">
                    <div class="secBox">
                        <div v-for="item in dataList1">
                            <div v-for="items in item.list" class="grid_bot">
                                <div class="itemName">
                                    <img :src="items.img" alt="">
                                    <p class="sp1 sp4">{{items.name}}</p>
                                </div>
                                <p class="sp2 sp3" :style="{cursor:(activeName==1 && items.value > 0?'pointer':'default')}" @click="handleUrl(items)">
                                    <CountTo
                                        :startVal='startVal'
                                        :endVal='items.value'
                                        :duration='duration'
                                    /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content">
                    <div class="secBox">
                        <div v-for="item in dataList2">
                            <div v-for="items in item.list" class="grid_bot">
                                <div class="itemName">
                                    <img :src="items.img" alt="">
                                    <p class="sp1 sp4">{{items.name}}</p>
                                </div>
                                <p class="sp2 sp3" :style="{cursor:(activeName==1 && items.value > 0?'pointer':'default')}" @click="handleUrl(items)">
                                    <CountTo
                                        :startVal='startVal'
                                        :endVal='items.value'
                                        :duration='duration'
                                    />
                                </p>
                            </div>
                    </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</div>
</template>
<script>
import item from "@/layout/components/Sidebar/Item.vue";
import CountTo from "vue-count-to";

export default {
    components: {CountTo},
    computed: {
        item() {
            return item
        }
    },
    props: {
        dataDetail: {
            type: Array,
            default: []
        },
      activeName: String
    },
    data() {
        return {
            dataList: [],
            dataList1: [],
            dataList2: [],
            duration: 3000,
            startVal: 0,
        }
    },
    watch: {
        dataDetail (val) {
            var list = []
            var list1 = []
            var list2 = []
            var obj1 = []
            var obj2 = []
            val.map(item => {
                if (item.id == '报告数据-分配') {
                    item.info.resultData.map(items => {
                        if (items.name == '待分配') {
                            list.push({
                                name: '待分配',
                                img: require('@/assets/images/icon_paint_brush.png'),
                                value: items.value,
                                url: '/micFoundation/reportDistributeLowCode?type=0'
                            })
                        }
                        if (items.name == '已分配') {
                            list.push({
                                name: '已分配',
                                img: require('@/assets/images/icon_pocket.png'),
                                value: items.value,
                              url: '/micFoundation/reportDistributeLowCode?type=1'
                            })
                        }
                    })
                }
                if (item.id == '报告数据-编制') {
                    obj1 = []
                    item.info.resultData.map(items => {
                        if (items.name == '待编制') {
                            obj1.push({
                                name: '待编制',
                                img: require('@/assets/images/icon_download.png'),
                                value: items.value,
                              url: '/micFoundation/reportCompileLowCode?type=0'
                            })
                        }
                        if (items.name == '被退回') {
                            obj1.push({
                                name: '被退回',
                                img: require('@/assets/images/icon_mail_reply.png'),
                                value: items.value,
                              url: '/micFoundation/reportCompileLowCode?type=2'
                            })
                        }
                    })
                    list1.push({
                        name: '编制',
                        list: [...obj1]
                    })
                }
                if (item.id == '报告数据-提交') {
                    obj1 = []
                    item.info.resultData.map(items => {
                        if (items.name == '待提交') {
                            obj1.push({
                                name: '待提交',
                                img: require('@/assets/images/icon_magic.png'),
                                value: items.value,
                              url: '/micFoundation/reportCompileLowCode?type=1'
                            })
                        }
                        if (items.name == '已提交') {
                            obj1.push({
                                name: '已提交',
                                img: require('@/assets/images/icon_pocket.png'),
                                value: items.value,
                              url: '/micFoundation/reportCompileLowCode?type=3'
                            })
                        }
                    })
                    list1.push({
                        name: '提交',
                        list: [...obj1]
                    })
                }
                if (item.id == '报告数据-审批') {
                    obj2 = []
                    item.info.resultData.map(items => {
                        if (items.name == '待审批') {
                            obj2.push({
                                name: '待审批',
                                img: require('@/assets/images/icon_pencil.png'),
                                value: items.value,
                              url: '/micFoundation/reportAuditLowCode?type=0'
                            })
                        }
                        if (items.name == '已审批') {
                            obj2.push({
                                name: '已审批',
                                img: require('@/assets/images/icon_pocket.png'),
                                value: items.value,
                              url: '/micFoundation/reportAuditLowCode?type=1'
                            })
                        }
                    })
                    list2.push({
                        name: '审批',
                        list: [...obj2]
                    })
                }
                if (item.id == '报告数据-批准') {
                    obj2 = []
                    item.info.resultData.map(items => {
                        if (items.name == '待批准') {
                            obj2.push({
                                name: '待批准',
                                img: require('@/assets/images/icon_feather.png'),
                                value: items.value,
                              url: '/micFoundation/reportApproveLowCode?type=0'
                            })
                        }
                        if (items.name == '已批准') {
                            obj2.push({
                                name: '已批准',
                                img: require('@/assets/images/icon_award_fill.png'),
                                value: items.value,
                              url: '/micFoundation/reportApproveLowCode?type=1'
                            })
                        }
                    })
                    list2.push({
                        name: '批准',
                        list: [...obj2]
                    })
                }
                if (item.id == '报告数据-发布') {
                    obj2 = []
                    item.info.resultData.map(items => {
                        if (items.name == '待发布') {
                            obj2.push({
                                name: '待发布',
                                img: require('@/assets/images/icon_paper_plane.png'),
                                value: items.value,
                              url: '/micFoundation/reportReleaseLowCode?type=0'
                            })
                        }
                        if (items.name == '已发布') {
                            obj2.push({
                                name: '已发布',
                                img: require('@/assets/images/icon_capslock_fill.png'),
                                value: items.value,
                              url: '/micFoundation/reportReleaseLowCode?type=1'
                            })
                        }
                    })
                    list2.push({
                        name: '发布',
                        list: [...obj2]
                    })
                }
                if (item.id == '报告数据-归档') {
                    obj2 = []
                    item.info.resultData.map(items => {
                        if (items.name == '待归档') {
                            obj2.push({
                                name: '待归档',
                                img: require('@/assets/images/icon_collection_fill.png'),
                                value: items.value,
                              url: '/micProject/reportPigeonhole?type=0'
                            })
                        }
                        if (items.name == '已归档') {
                            obj2.push({
                                name: '已归档',
                                img: require('@/assets/images/icon_briefcase_fill.png'),
                                value: items.value,
                              url: '/micProject/reportPigeonhole?type=1'
                            })
                        }
                    })
                    list2.push({
                        name: '发布',
                        list: [...obj2]
                    })
                }
            })
            this.dataList = list
            this.dataList1 = list1
            this.dataList2 = list2
            // console.log(this.dataList1)
        }
    },
  methods: {
    handleUrl (item) {
      if (item.value > 0) {
        this.$router.replace({ path: item.url })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/styles/homepage';
</style>