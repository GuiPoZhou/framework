<template>
    <KevinDrawer :show="showDrawer" title="表单组件树" size="30%" direction="ltr">
        <el-button slot="topbuttons" size="small" @click="close" style="margin-left: 3rem;">关闭</el-button>
        <div class="widgettreearea">
            <el-tree :data="widget" :props="treeProps" :expand-on-click-node="false">
                <template v-slot="{ data }">
                    <span style="font-size: 1rem;color: #000; font-weight: 500;">
                        <span>{{ data.title }}</span>
                        <el-link :underline="false" type="warning" style="margin-left: 2rem;"
                            @click="e_copyNodeWidgetId(data)">{{
                                formatUUIDWithStars(data.WIDGETID) }}</el-link>
                    </span>
                </template>
            </el-tree>
        </div>

    </KevinDrawer>
</template>

<script>
import KevinDrawer from '../../../../../KevinDrawer/kevindrawer.vue'
export default {
    components: {
        KevinDrawer
    },
    data() {
        return {
            widget: [],
            showDrawer: false,
            treeProps: {
                label: 'title', // 将 label 属性映射到 title
            }
        }
    },
    methods: {
        e_copyNodeWidgetId(data) {
            const textArea = document.createElement('textarea');
            textArea.value = data.WIDGETID;
            document.body.appendChild(textArea);
            textArea.select();

            try {
                const success = document.execCommand('copy');
                if (success) {
                    this.$message.success('节点ID复制成功')
                } else {
                    console.error('复制失败');
                }
            } catch (err) {
                console.error('复制失败', err);
            }

            document.body.removeChild(textArea);
        },
        close() {
            this.$emit('close')
        },
        init(widget) {
            this.showDrawer = true
            this.widget = widget
        },
        formatUUIDWithStars(inputString, maxLength = 14) {
            if (typeof inputString !== 'string') {
                return inputString;
            }

            if (inputString.length <= maxLength) {
                return inputString;
            }

            const prefixLength = Math.ceil((maxLength - 4) / 2);
            const suffixLength = Math.floor((maxLength - 4) / 2);

            const prefix = inputString.substring(0, prefixLength);
            const suffix = inputString.substring(inputString.length - suffixLength);

            return prefix + '****' + suffix;
        },
    }
}
</script>

<style scoped lang="scss">
.widgettreearea {
    height: 100%;
    padding: 0.7rem;
    overflow: auto;
    background-color: #fff;
    border-radius: 10px;
}
</style>