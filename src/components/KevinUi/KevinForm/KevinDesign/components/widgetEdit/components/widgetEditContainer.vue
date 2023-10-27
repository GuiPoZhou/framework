<template>
    <div class="widget_edit_container">

        <div class="w_e_c_left" v-if="showLeft" :style="{ width: leftWidth }">
            <slot name="wecLeft"></slot>
        </div>
        <div class="w_e_c_right" :style="{ marginLeft: showLeft ? '0.7rem' : '0rem' }">
            <slot name="wecRight"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showLeft: {
            typeof: Boolean,
            default: true
        },
        leftWidth: {
            typeof: String,
            default: '70%'
        }
    }
}
</script>
<style lang="scss" scoped>
.widget_edit_container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;

    .w_e_c_left {
        width: 70%;
        height: 100%;
        background-color: #fff;

        overflow: auto;
        padding: 0.7rem;
        padding-bottom: 3rem;
        border-radius: 10px;
        scrollbar-width: none;
        /* 隐藏标准滚动条（适用于Firefox） */
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
            width: 0;
            /* 隐藏滚动条（适用于WebKit引擎，如Chrome和Safari） */
        }
    }

    .w_e_c_right {
        flex: 1;
        height: 100%;
        padding: 0.7rem 0;
        border-radius: 10px;
        overflow: auto;
        background-color: #fff;
    }
}
</style>