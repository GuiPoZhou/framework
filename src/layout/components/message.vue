<template>
    <div>
        <el-drawer class="custom-drawer" size="30%" title="站内消息" :visible.sync="drawer" :direction="direction"
            append-to-body close-on-press-escape destroy-on-close show-close @close="close" :wrapperClosable="false"
            custom-class="messageDraw">
            <div class="changeStatusarea">
                <div class="status_change_area" v-for="(v, i) in statusList" :key="i" @click="e_changeStatus(v)">
                    <span :class="activeStatus == v.value ? 'aciveStatus' : ''">{{ v.label }}</span>
                    <span class="s_c_a_fenge" v-if="i < statusList.length - 1">/</span>
                </div>
            </div>
            <div class="redad_fask">
                <el-button v-if="activeStatus != 1" class="r_f_b" type="text" @click="e_readFac">一键已读</el-button>
            </div>
            <div class="messagearea drawer-content" infinite-scroll-disabled v-infinite-scroll="load"
                :infinite-scroll-distance="30" :infinite-scroll-disabled="isGetAll">

                <div style="margin-bottom: 1rem;" v-for="(item, index) in messageList">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>{{ item.title }}</span>
                            <el-popconfirm title="确定已知晓？" @confirm="e_read(item.id, index)">
                                <el-button slot="reference" style="float: right; padding: 3px 0" type="text"
                                    v-if="item.readStatus == 0">标记已读</el-button>
                            </el-popconfirm>
                            <el-button style="float: right; padding: 3px 0" type="text" disabled
                                v-if="item.readStatus == 1">消息已读</el-button>
                        </div>
                        <div class="content_message_area" style="margin-bottom: 1rem;cursor: pointer;"
                            @click="e_goMessageInfo(item, index)">
                            <div class="text item">
                                消息内容：{{ item.content }}
                            </div>
                            <div class="text item">
                                创建时间：{{ item.createTime }}
                            </div>
                        </div>

                    </el-card>
                </div>

                <el-empty v-if="messageList.length == 0" description="暂无消息哦"></el-empty>
            </div>

        </el-drawer>

    </div>
</template>
<script>
export default {
    data() {
        return {
            drawer: false,
            direction: 'rtl',
            messageList: [],
            isGetAll: true,
            total: 0,
            queryParams: {
                pageSize: 1000,
                pageNum: 1,
                readStatus: undefined
            },
            statusList: [
                {
                    label: '全部消息',
                    value: -1
                },
                {
                    label: '未读消息',
                    value: 0
                },
                {
                    label: '已读消息',
                    value: 1
                }
            ],
            activeStatus: -1
        }
    },
    mounted() {

    },
    methods: {
        e_readFac() {
            this.$confirm('确定标记所有消息为已读？').then(() => {
                this.$net('/message/clearAllMessage','get').then(re => {
                    if (re.code == 200) {
                        this.messageList =[]
                        this.queryParams.pageNum = 1
                        this.e_getMessageList()
                    } else {
                        this.$message.error(re.msg)
                    }
                })
            })
        },
        e_changeStatus(v) {
            this.activeStatus = v.value
            this.isGetAll = true
            this.queryParams.pageNum = 1
            this.messageList = []
            if (this.activeStatus == -1) {
                this.queryParams.readStatus = undefined
            } else {
                this.queryParams.readStatus = this.activeStatus
            }
            this.e_getMessageList()
        },
        e_goMessageInfo(item, index) {
            console.log('aa', item)
            this.e_read(item.id, index)
            this.e_goPath(item)
            this.$emit('close')
        },
        e_goPath(infos) {
            if (!infos.redirectUrl) {
                this.$message.info('很遗憾！该消息类型也许暂未配置跳转设定，请联系管理员')
                return
            }
            const whiteList = ['/micProject', '/micFoundation', '/micGenric']
            const containsWhiteList = whiteList.some(item => infos.redirectUrl.includes(item));
            if (containsWhiteList) {
                this.$router.push(infos.redirectUrl)
            } else {
                this.$message.info('很遗憾！该消息类型也许暂未配置跳转设定，请联系管理员')
                return
            }
        },
        e_read(id, index) {
            this.$net('/message/updateReadStatus', 'post', { messageIdList: [id] }).then(re => {
                if (re.code == 200) {
                    let info = this.messageList[index]
                    info.readStatus = 1
                    this.$set(this.messageList, index, info)
                }
            })
        },
        e_getMessageList() {
            console.log('当前页码', this.queryParams.pageNum)
            this.$net('/message/list', 'get', this.queryParams).then(re => {
                this.messageList = [...this.messageList, ...re.data.list]
                this.total = re.data.total
                console.log('this.messageList.length', this.messageList.length)
                this.messageList.length == this.total ? this.isGetAll = true : this.isGetAll = false
            })
        },
        loadMoreContent() {
            // Implement your lazy loading logic here, e.g., fetching more data
            // and appending it to the existing content.
            console.log('Loading more content...');
        },
        init() {
            this.drawer = true
            this.e_getMessageList()

        },
        close() {
            this.$emit('close')
        },
        load() {
            console.log('分页加载')
            this.queryParams.pageNum += 1
            this.e_getMessageList()
        }
    }
}
</script>
<style scoped lang="scss">
.messageDraw {
    padding-bottom: 1rem;
    position: relative;
}

/deep/.messageDraw .el-drawer__body {
    background-color: #EFF2FA;
}

/deep/.messageDraw .el-card__body {
    padding-bottom: 13px !important;
}

.messagearea {
    padding: 1rem;
    height: auto;
    // background-color: #EFF2FA;

}

.redad_fask {
    position: absolute;
    top: 38px;
    right: 3.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}

.r_f_b {
    // margin-right: 2rem;
}

.content_message_area div {
    margin-bottom: 1rem;
}

.changeStatusarea {
    width: 100%;
    position: absolute;
    top: 48px;
    left: 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    .status_change_area {
        margin-right: 1rem;

        span {
            font-size: 0.8rem;
            color: #929597;
            cursor: pointer;

            &.aciveStatus {
                color: #000;
                font-weight: bold;
            }
        }

        .s_c_a_fenge {
            margin-left: 1rem;
        }
    }
}
</style>