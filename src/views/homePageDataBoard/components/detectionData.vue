<template>
<div class="flexItem">
    <div class="titleBox">
        <div class="line"></div>
        <div class="name">检测数据</div>
    </div>
    <div class="detectCont">
        <el-row :gutter="20">
            <el-col :span="7" v-for="item in dataList">
                <div class="grid-content">
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
            </el-col>
            <el-col :span="10">
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
            duration: 3000,
            startVal: 0,
        }
    },
    watch: {
        dataDetail (val) {
            var list = []
            var list1 = []
            var obj = []
            var obj1 = []
            val.map(item => {
                if (item.id == '检测数据-分配') {
                    obj = []
                    item.info.resultData.map(items => {
                        if (items.name == '待分配') {
                            obj.push({
                                name: '待分配',
                                img: require('@/assets/images/icon_paint_brush.png'),
                                value: items.value,
                              url: '/micProject/business/detectionManage/taskAllocation?type=1',
                            })
                        }
                        if (items.name == '已分配') {
                            obj.push({
                                name: '已分配',
                                img: require('@/assets/images/icon_pocket.png'),
                                value: items.value,
                              url: '/micProject/business/detectionManage/taskAllocation?type=2',
                            })
                        }
                    })
                    list.push({
                        name: '分配',
                        list: [...obj]
                    })
                }
                if (item.id == '检测数据-审批') {
                    obj = []
                    item.info.resultData.map(items => {
                        if (items.name == '待审批') {
                            obj.push({
                                name: '待审批',
                                img: require('@/assets/images/icon_pencil.png'),
                                value: items.value,
                              url: '/micProject/business/detectionManage/resultsAudit?type=2',
                            })
                        }
                        if (items.name == '已审批') {
                            obj.push({
                                name: '已审批',
                                img: require('@/assets/images/icon_pocket.png'),
                                value: items.value,
                              url: '/micProject/business/detectionManage/resultsAudit?type=2',
                            })
                        }
                    })
                    list.push({
                        name: '审批',
                        list: [...obj]
                    })
                }
                if (item.id == '检测数据-接收') {
                    obj1 = []
                    item.info.resultData.map(items => {
                        if (items.name == '待接收') {
                            obj1.push({
                                name: '待接收',
                                img: require('@/assets/images/icon_download.png'),
                                value: items.value,
                              url: '/micProject/business/detectionManage/resultEntry?type=0',
                            })
                        }
                        if (items.name == '被退回') {
                            obj1.push({
                                name: '被退回',
                                img: require('@/assets/images/icon_mail_reply.png'),
                                value: items.value,
                              url: '/micProject/business/detectionManage/resultEntry?type=2',
                            })
                        }
                    })
                    list1.push({
                        name: '接收',
                        list: [...obj1]
                    })
                }
                if (item.id == '检测数据-录入') {
                    obj1 = []
                    item.info.resultData.map(items => {
                        if (items.name == '待录入') {
                            obj1.push({
                                name: '待录入',
                                img: require('@/assets/images/icon_magic.png'),
                                value: items.value,
                              url: '/micProject/business/detectionManage/resultEntry?type=1',
                            })
                        }
                        if (items.name == '已完成') {
                            obj1.push({
                                name: '已完成',
                                img: require('@/assets/images/icon_pocket.png'),
                                value: items.value,
                              url: '/micProject/business/detectionManage/resultEntry?type=3',
                            })
                        }
                    })
                    list1.push({
                        name: '录入',
                        list: [...obj1]
                    })
                }
            })
            this.dataList = list
          console.log('this.dataList',this.dataList)
            this.dataList1 = list1
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