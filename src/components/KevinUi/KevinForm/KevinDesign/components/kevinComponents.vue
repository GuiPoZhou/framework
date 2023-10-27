<template>
    <div class="kevin_components_area">
        <div class="kevin_components_list" v-for="(v, i) in componentsList" :key="i">
            <span class="k_c_l_title">{{ v.title }}</span>
            <div class="k_c_area">
                <div slot="reference" class="kevin_components_item" v-for="(item, itemIndex) in v.list" :key="itemIndex"
                    @click="e_selectComponents(item)">
                    <el-popover placement="top-start" trigger="hover" :content="item.describe ? item.describe : ''">
                        <span slot="reference">{{ item.title }}</span>
                    </el-popover>
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
    .kevin_components_list {
        margin-bottom: 1rem;
        background-color: #fff;
        border-radius: 10px;
        padding: 0.5rem 1rem;

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
        }

        .kevin_components_item {
            width: fit-content;
            padding: 0.4rem 0.5rem;
            background-color: #ccddff;
            border-radius: 5px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            margin-bottom: 0.6rem;
            font-size: 0.7rem;
            font-weight: 400;
            cursor: pointer;

            // &:hover {
            //     border: 1px dashed #4468EE;
            //     color: #4468EE;
            // }
        }

    }
}
</style>