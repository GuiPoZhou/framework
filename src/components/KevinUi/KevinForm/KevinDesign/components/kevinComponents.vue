<template>
    <div class="kevin_components_area">
        <div class="kevin_components_list" v-for="(v, i) in componentsList" :key="i">
            <span class="k_c_l_title">{{ v.title }}</span>
            <div class="k_c_area">
                <div slot="reference" class="kevin_components_item" v-for="(item, itemIndex) in v.list" :key="itemIndex"
                    @click="e_selectComponents(item)">
                    <!-- <svg-icon class="k_c_area_icon" :icon-class="item.icon" /> -->
                    <span>{{ item.title }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import componentsList from './componentsList'
import draggable from 'vuedraggable'
export default {
    components: {
        draggable
    },
    data() {
        return {
            componentsList
        }
    },
    methods: {
        pull_end() {
            this.componentsList = JSON.parse(JSON.stringify(this.componentsList))
        },
        e_selectComponents(componentsInfo) {
            this.$emit('appendWidget', JSON.parse(JSON.stringify(componentsInfo)))
        },
        e_start(e) {
            console.log('拖动信息', e)
        },
    }
}
</script>
<style scoped lang="scss">
.kevin_components_area {
    min-height: 100%;
    .kevin_components_list {
        margin-bottom: 1rem;
        background-color: #fff;
        border-radius: 10px;
        padding: 10px;

        .k_c_l_title {
            font-size: 1rem;
            font-weight: 600;
        }

        .k_c_area {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 1rem;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        .kevin_components_item {
            width: 47%;
            height: 28px;
            background-color: #F4F6FC;
            margin-bottom: 0.6rem;
            font-size: 11px;
            font-weight: 500;
            cursor: pointer;
            line-height: 28px;
            color: #333;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            .k_c_area_icon {
                font-size: 14px;
                margin: 0 3px;
            }

            &:hover {
                border: 1px dashed #1890ff;
                color: #1890ff;
                // height: 27px;
                // line-height: 27px;
            }
        }

    }
}
</style>