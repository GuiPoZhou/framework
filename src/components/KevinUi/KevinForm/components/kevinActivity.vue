<template>
    <div>
        <div class="processbox">
            <ul>
                <li>
                    <div class="nostep"></div>
                    <span>未经过步骤</span>
                </li>
                <li>
                    <div class="finishstep"></div>
                    <span>已完成步骤</span>
                </li>
                <li>
                    <div class="pendingstep"></div>
                    <span>待处理步骤</span>
                </li>
            </ul>
        </div>
        <div class="stepbox">
            <ul>
                <li v-for="(item, index) in processList.FlowElement" :key="index" class="stb_line">
                    <el-tooltip v-if="item.user && item.user.length > 0" class="item" effect="dark"
                        :content="typeof item.user == 'object' ? item.user.join('、') : item.user" placement="bottom">
                        <div :class="test(item.activity)">{{ item.name }}</div>
                    </el-tooltip>
                    <div v-else :class="test(item.activity)">{{ item.name }}</div>
                    <p v-if="index !== processList.FlowElement.length - 1">
                        <i class="el-icon-plus"
                            v-if="processList.dangerFlag == 1 && (index != 0 && index != processList.FlowElement.length - 2)"
                            :class="test1(item.activity)"></i>
                        <i class="el-icon-right" v-else :class="test1(item.activity)"></i>
                    </p>
                </li>
            </ul>
        </div>
        <div>
            <el-timeline>
                <el-timeline-item v-for="(activity, index) in processList.hisTaskList" :key="index" icon="el-icon-more"
                    type="primary" size="large" class="timeline">
                    <!-- 时间线左侧 -->
                    <div class="companydel">
                        {{ activity.assigneeName }}
                        <p style="font-size: 14px;">{{ activity.endTime }}</p>
                    </div>
                    <!-- 时间线右侧 -->
                    <div class="line_container">
                        <div class="el-row">
                            <div class="fl"><strong>{{ activity.activityName }}</strong></div>
                        </div>
                        <div class="cont">
                            <ul>
                                <li>状态：{{ activity.flowName }}</li>
                                <li>处理人：{{ activity.assigneeName }}</li>
                                <li>意见：{{ activity.comment }}</li>
                                <li>完成时间：{{ activity.endTime }}</li>
                            </ul>
                        </div>
                    </div>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "index",
    props: {
        approvalProcess: Object
    },
    data() {
        return {
            processList: []
        }
    },
    watch: {
        approvalProcess: {
            handler() {
                this.processList = this.approvalProcess
                console.log('this.processList', this.processList)
                if (this.approvalProcess.FlowElement[0].activity) {
                    this.$set(this.processList.FlowElement[0], 'user', this.$store.state.user.userInfo.nickName)
                    this.approvalProcess.FlowElement.map((item, index) => {
                        if (item == null) {
                            this.approvalProcess.FlowElement.splice(index, 1)
                        }
                    })
                }
                console.log('this.approvalProcess', this.approvalProcess)
            },
            immediate: true
        }
    },
    mounted() {
    },
    methods: {
        test(status) {
            switch (status) {
                case 10:
                    return 'colorGry'
                case 20:
                    return 'colorOrange'
                case 30:
                    return 'colorGreen'
            }
        },
        test1(status) {
            switch (status) {
                case 10:
                    return 'iconGry'
                case 20:
                    return 'iconOrange'
                case 30:
                    return 'iconGreen'
            }
        },
    }
}
</script>
  
<style scoped lang="less">
ul li {
    list-style: none;
}

.processbox {
    ul {
        display: flex;

        li {
            color: #3C4353;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 30px;

            div {
                width: 16px;
                height: 16px;
                margin-right: 10px;
            }

            .nostep {
                background: #838A9D;
            }

            .finishstep {
                background: #1DD0BD;
            }

            .pendingstep {
                background: #F4BB4A;
            }
        }
    }
}

.stepbox {
    margin: 30px 0 50px;

    ul {
        display: flex;
        align-items: center;

        li {
            display: flex;
            align-items: center;
            justify-content: center;

            div {
                width: 120px;
                height: 40px;
                opacity: 1;
                border-radius: 3px;
                text-align: center;
                line-height: 40px;
            }

            .colorGry {
                background: #F9FBFF;
                border: 1px solid #838A9D;
                color: #838A9D;
            }

            .iconGry {
                color: #838A9D;
            }

            .colorOrange {
                background: #FFF9EE;
                border: 1px solid #F4BB4A;
                color: #F4BB4A;
            }

            .iconOrange {
                color: #F4BB4A;
            }

            .colorGreen {
                background: #EEFFFD;
                border: 1px solid #1DD0BD;
                color: #1DD0BD;
            }

            .iconGreen {
                color: #1DD0BD;
            }

            p {
                font-size: 190%;
                // margin-bottom: 0;
                padding: 0 10px;
            }
        }
    }
}

.timeline {
    position: relative;
    left: 155px;
}

.companydel {
    color: #909399;
    position: absolute;
    left: -155px;
    top: 1px;
    font-size: 12px;
}

.fl {
    float: left;
}

.fr {
    float: right;
}

.cont {
    background: #EEF6FF;
    padding: 16px 30px;

    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-inline-start: 0;

        li {
            width: 33.3333%;
            margin-bottom: 5px;
        }
    }
}
/deep/.el-timeline-item__wrapper{
    width: 90%;
}
.timeline {
    width: 100%;
    display: flex;
    flex-basis: row;
}

.companydel {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.line_container {
    flex: 1;
    .cont{
        width: 100%;
    }
}
/deep/.el-timeline-item__wrapper{
    // margin-left: 10rem;
}
.stb_line{
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>
  