<template>
    <div class="kevin_equipment_chart" :style="{ height: kevin_equipment_chart_height() + 'px' }">
        <div class="equipment_container" v-infinite-scroll="load"
            :infinite-scroll-disabled="data.length != 0 && data.length == total">
            <div class="e_c_list" v-on:mouseenter="showMask(index)" v-on:mouseleave="hideMask(index)"
                v-for="(item, index) in data" :key="index">
                <!-- <svg class="device_status_icon" t="1699927484598" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="15939" xmlns:xlink="http://www.w3.org/1999/xlink" width="200"
                    height="200">
                    <path
                        d="M511.965867 88.302933l-323.4816 183.637334L512 456.226133l321.160533-182.954666zM465.066667 541.866667l-324.369067-185.309867v366.830933l324.369067 186.811734z"
                        p-id="15940" :fill="handleStatus(item.status)"></path>
                    <path
                        d="M958.122667 257.911467a35.874133 35.874133 0 0 0-11.912534-12.322134l-0.546133-0.4096-0.785067-0.477866-0.785066-0.443734L527.496533 6.212267a27.409067 27.409067 0 0 0-30.958933 0L79.906133 244.258133c-0.273067 0.1024-0.546133 0.273067-0.785066 0.4096l-0.853334 0.512-0.512 0.4096a36.420267 36.420267 0 0 0-11.8784 12.322134 31.197867 31.197867 0 0 0-3.106133 24.712533v469.162667c0 12.731733 6.212267 22.289067 15.496533 28.672l418.269867 238.967466c6.178133 3.1744 9.250133 3.1744 15.496533 3.1744 6.178133 0 9.284267 0 15.496534-3.1744l418.2016-238.967466a33.5872 33.5872 0 0 0 15.530666-28.672V282.589867a31.1296 31.1296 0 0 0-3.140266-24.6784zM496.981333 965.461333L108.782933 741.853867V301.568l388.232534 221.7984v442.094933zM123.904 271.872L512.068267 51.541333l385.297066 221.866667L512 492.919467 123.904 271.872zM915.217067 745.130667L527.018667 965.461333V523.3664l388.232533-221.7984V745.130667z"
                        p-id="15941" :fill="handleStatus(item.status)"></path>
                    <path d="M883.336533 356.5568l-324.4032 185.309867v368.8448l324.4032-184.183467z" p-id="15942"
                        :fill="handleStatus(item.status)"></path>
                </svg> -->
                <svg v-if="item.status == 1" t="1699947380780" class="device_status_icon" viewBox="0 0 1024 1024"
                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2392" xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="200" height="200">
                    <path d="M512 512m-460.8 0a460.8 460.8 0 1 0 921.6 0 460.8 460.8 0 1 0-921.6 0Z" fill="#DAF9F4"
                        p-id="2393"></path>
                    <path
                        d="M243.2 320m38.4 0l460.8 0q38.4 0 38.4 38.4l0 332.8q0 38.4-38.4 38.4l-460.8 0q-38.4 0-38.4-38.4l0-332.8q0-38.4 38.4-38.4Z"
                        fill="#09D3B6" p-id="2394"></path>
                    <path
                        d="M320 396.8m25.6 0l51.2 0q25.6 0 25.6 25.6l0 51.2q0 25.6-25.6 25.6l-51.2 0q-25.6 0-25.6-25.6l0-51.2q0-25.6 25.6-25.6Z"
                        fill="#B3EEE5" p-id="2395"></path>
                    <path
                        d="M320 537.6m25.6 0l51.2 0q25.6 0 25.6 25.6l0 51.2q0 25.6-25.6 25.6l-51.2 0q-25.6 0-25.6-25.6l0-51.2q0-25.6 25.6-25.6Z"
                        fill="#B3EEE5" p-id="2396"></path>
                    <path
                        d="M460.8 396.8m25.6 0l51.2 0q25.6 0 25.6 25.6l0 51.2q0 25.6-25.6 25.6l-51.2 0q-25.6 0-25.6-25.6l0-51.2q0-25.6 25.6-25.6Z"
                        fill="#B3EEE5" p-id="2397"></path>
                    <path
                        d="M678.4 396.8a47.8336 47.8336 0 0 1 45.888 61.2736c-8.832 30.144-13.248 50.24-13.248 60.3264 0 8.4352 3.0976 23.8848 9.28 46.336 0.512 1.8688 1.8304 6.2464 3.9424 13.1456A48 48 0 0 1 678.4 640a48 48 0 0 1-45.888-62.1184c2.1376-6.9248 3.456-11.3152 3.968-13.184 6.1824-22.4512 9.2672-37.888 9.2672-46.2976 0-10.0608-4.416-30.1568-13.248-60.3136A47.8336 47.8336 0 0 1 678.4 396.8z"
                        fill="#80DCCE" p-id="2398"></path>
                    <path
                        d="M460.8 537.6m25.6 0l51.2 0q25.6 0 25.6 25.6l0 51.2q0 25.6-25.6 25.6l-51.2 0q-25.6 0-25.6-25.6l0-51.2q0-25.6 25.6-25.6Z"
                        fill="#80DCCE" p-id="2399"></path>
                </svg>
                <svg v-if="item.status == 2" t="1699945979968" class="device_status_icon" viewBox="0 0 1024 1024"
                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6154" xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="200" height="200">
                    <path d="M512 512m-460.8 0a460.8 460.8 0 1 0 921.6 0 460.8 460.8 0 1 0-921.6 0Z" fill="#FFE5E3"
                        p-id="6155"></path>
                    <path
                        d="M313.6 755.2h102.4c10.24 0 19.2 8.96 19.2 19.2v12.8c0 10.24-8.96 19.2-19.2 19.2h-102.4c-10.24 0-19.2-8.96-19.2-19.2v-12.8c0-10.24 8.96-19.2 19.2-19.2zM620.8 755.2h102.4c10.24 0 19.2 8.96 19.2 19.2v12.8c0 10.24-8.96 19.2-19.2 19.2h-102.4c-10.24 0-19.2-8.96-19.2-19.2v-12.8c0-10.24 8.96-19.2 19.2-19.2zM627.2 281.6h115.2v64h-115.2z"
                        fill="#d81e06" p-id="6156" data-spm-anchor-id="a313x.collections_detail.0.i54.705b3a81yJRT0X"
                        class="selected"></path>
                    <path
                        d="M268.8 332.8h486.4c21.76 0 38.4 16.64 38.4 38.4v358.4c0 21.76-16.64 38.4-38.4 38.4h-486.4c-21.76 0-38.4-16.64-38.4-38.4v-358.4c0-21.76 16.64-38.4 38.4-38.4z"
                        fill="#d81e06" p-id="6157" data-spm-anchor-id="a313x.collections_detail.0.i51.705b3a81yJRT0X"
                        class="selected"></path>
                    <path
                        d="M345.6 243.2h149.76c15.36 0 29.44 8.96 35.84 23.04l33.28 79.36h-256v-64c-1.28-21.76 15.36-38.4 37.12-38.4z"
                        fill="#d81e06" p-id="6158" data-spm-anchor-id="a313x.collections_detail.0.i52.705b3a81yJRT0X"
                        class="selected"></path>
                    <path
                        d="M332.8 435.2h153.6c14.08 0 25.6 11.52 25.6 25.6s-11.52 25.6-25.6 25.6h-153.6c-14.08 0-25.6-11.52-25.6-25.6s11.52-25.6 25.6-25.6zM332.8 537.6h153.6c14.08 0 25.6 11.52 25.6 25.6s-11.52 25.6-25.6 25.6h-153.6c-14.08 0-25.6-11.52-25.6-25.6s11.52-25.6 25.6-25.6zM332.8 640h153.6c14.08 0 25.6 11.52 25.6 25.6s-11.52 25.6-25.6 25.6h-153.6c-14.08 0-25.6-11.52-25.6-25.6s11.52-25.6 25.6-25.6z"
                        fill="#FABEB9" p-id="6159"></path>
                    <path d="M665.6 563.2m-89.6 0a89.6 89.6 0 1 0 179.2 0 89.6 89.6 0 1 0-179.2 0Z" fill="#FABEB9"
                        p-id="6160"></path>
                    <path
                        d="M640 550.4h51.2c7.68 0 12.8 5.12 12.8 12.8s-5.12 12.8-12.8 12.8h-51.2c-7.68 0-12.8-5.12-12.8-12.8s5.12-12.8 12.8-12.8z"
                        fill="#d81e06" p-id="6161" data-spm-anchor-id="a313x.collections_detail.0.i55.705b3a81yJRT0X"
                        class="selected"></path>
                    <path
                        d="M627.2 243.2h115.2c14.08 0 25.6 11.52 25.6 25.6s-11.52 25.6-25.6 25.6h-115.2c-14.08 0-25.6-11.52-25.6-25.6s11.52-25.6 25.6-25.6z"
                        fill="#d81e06" p-id="6162" data-spm-anchor-id="a313x.collections_detail.0.i53.705b3a81yJRT0X"
                        class="selected"></path>
                </svg>
                <svg v-if="item.status == 5" t="1699945660668" class="device_status_icon" viewBox="0 0 1024 1024"
                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3342" id="mx_n_1699945660669"
                    xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
                    <path d="M512 512m-460.8 0a460.8 460.8 0 1 0 921.6 0 460.8 460.8 0 1 0-921.6 0Z" fill="#e6e6e6"
                        p-id="3343" data-spm-anchor-id="a313x.collections_detail.0.i9.705b3a81yJRT0X" class=""></path>
                    <path
                        d="M268.8 281.6m38.4 0l422.4 0q38.4 0 38.4 38.4l0 460.8q0 38.4-38.4 38.4l-422.4 0q-38.4 0-38.4-38.4l0-460.8q0-38.4 38.4-38.4Z"
                        fill="#707070" p-id="3344" data-spm-anchor-id="a313x.collections_detail.0.i10.705b3a81yJRT0X"
                        class=""></path>
                    <path d="M518.4 569.6m-134.4 0a134.4 134.4 0 1 0 268.8 0 134.4 134.4 0 1 0-268.8 0Z" fill="#bfbfbf"
                        p-id="3345" data-spm-anchor-id="a313x.collections_detail.0.i11.705b3a81yJRT0X" class=""></path>
                    <path
                        d="M422.404849 518.859683m22.627417-22.627417l0 0q22.627417-22.627417 45.254834 0l99.560634 99.560634q22.627417 22.627417 0 45.254834l0 0q-22.627417 22.627417-45.254834 0l-99.560634-99.560634q-22.627417-22.627417 0-45.254834Z"
                        fill="#e6e6e6" p-id="3346" data-spm-anchor-id="a313x.collections_detail.0.i12.705b3a81yJRT0X"
                        class=""></path>
                    <path
                        d="M461.1456 243.2a57.6 57.6 0 0 1 114.5088 0H627.2a25.6 25.6 0 0 1 25.6 25.6v38.4a25.6 25.6 0 0 1-25.6 25.6h-217.6a25.6 25.6 0 0 1-25.6-25.6v-38.4a25.6 25.6 0 0 1 25.6-25.6h51.5456z"
                        fill="#cdcdcd" p-id="3347" data-spm-anchor-id="a313x.collections_detail.0.i13.705b3a81yJRT0X"
                        class="selected"></path>
                </svg>
                <svg v-if="item.status != 1 && item.status != 2 && item.status != 5" t="1699947297443"
                    class="device_status_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="2060" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
                    <path d="M512 512m-460.8 0a460.8 460.8 0 1 0 921.6 0 460.8 460.8 0 1 0-921.6 0Z" fill="#FFF3E2"
                        p-id="2061"></path>
                    <path
                        d="M386.56 453.12l6.4-17.92c6.4-17.92 25.6-28.16 43.52-23.04 5.12 1.28 8.96 3.84 12.8 7.68l235.52 222.72c25.6 24.32 26.88 65.28 2.56 90.88l-2.56 2.56c-24.32 24.32-64 25.6-88.32 1.28l-3.84-3.84-193.28-218.88c-14.08-16.64-19.2-40.96-12.8-61.44z"
                        fill="#FBB03B" p-id="2062"></path>
                    <path
                        d="M256 357.12l55.04 66.56 61.44-61.44-65.28-56.32c15.36-7.68 33.28-11.52 51.2-11.52 64 0 115.2 51.2 115.2 115.2s-51.2 115.2-115.2 115.2-115.2-51.2-115.2-115.2c0-19.2 5.12-37.12 12.8-52.48zM609.28 472.32l-176.64 253.44c-21.76 32-65.28 39.68-97.28 17.92l-2.56-2.56c-28.16-21.76-34.56-64-11.52-92.16 1.28-1.28 2.56-3.84 5.12-5.12l213.76-224 21.76-93.44 88.32-44.8 66.56 51.2-23.04 96-84.48 43.52z"
                        fill="#FBB03B" p-id="2063"></path>
                    <path
                        d="M648.96 567.04v-12.8c0-16.64 12.8-29.44 29.44-29.44s29.44 12.8 29.44 29.44v12.8c12.8 2.56 25.6 8.96 37.12 15.36l8.96-8.96c11.52-11.52 29.44-11.52 40.96 0 11.52 11.52 11.52 29.44 0 40.96l-8.96 8.96c7.68 11.52 12.8 24.32 15.36 37.12h12.8c16.64 0 29.44 12.8 29.44 29.44s-12.8 29.44-29.44 29.44h-12.8c-2.56 12.8-8.96 25.6-15.36 37.12l8.96 8.96c11.52 11.52 11.52 29.44 0 40.96-11.52 11.52-29.44 11.52-40.96 0l-8.96-8.96c-11.52 7.68-24.32 12.8-37.12 15.36v12.8c0 16.64-12.8 29.44-29.44 29.44s-29.44-12.8-29.44-29.44v-12.8c-12.8-2.56-25.6-8.96-37.12-15.36l-8.96 8.96c-11.52 11.52-29.44 11.52-40.96 0-11.52-11.52-11.52-29.44 0-40.96l8.96-8.96c-7.68-11.52-12.8-24.32-15.36-37.12h-12.8c-16.64 0-29.44-12.8-29.44-29.44s12.8-29.44 29.44-29.44h12.8c2.56-12.8 8.96-25.6 15.36-37.12l-8.96-8.96c-11.52-11.52-11.52-29.44 0-40.96 11.52-11.52 29.44-11.52 40.96 0l8.96 8.96c11.52-6.4 24.32-11.52 37.12-15.36z m29.44 183.04c32 0 58.88-26.88 58.88-58.88s-26.88-58.88-58.88-58.88-58.88 26.88-58.88 58.88 26.88 58.88 58.88 58.88z"
                        fill="#FAC573" p-id="2064"></path>
                </svg>
                <span class="e_c_equipmentName">{{ item.equipmentName }}</span>
                <span class="e_c_equipmentNumber">{{ item.equipmentNumber }}</span>
                <div class="device_status_box" v-if="isMaskVisible && currentIndex == index">
                    <span class="d_s_b_label">{{ handelStatusLabel(item.status) }}</span>
                    <i v-hasPermi="['micGenric:EquipmentStatus:edit']" class="el-icon-sort d_s_b_change"
                        @click="e_chagneStatus(item, index)"></i>
                </div>
            </div>
        </div>
        <div class="emptyarea" v-if="data.length == 0">
            <el-empty description="数据信息为空"></el-empty>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: Array,
        handleStatusColor: String,
        handleStatusLabel: String,
        total: Number,
        context: Object,
        height: {
            typeof: Number,
            default: 50
        }
    },
    data() {
        return {
            currentIndex: null,
            isMaskVisible: false,
        }
    },
    mounted() {

    },
    methods: {
        kevin_equipment_chart_height() {
            return window.innerHeight * (this.height / 100)
        },
        load() {
            this.$emit('lazyLoad')
        },
        e_chagneStatus(item, index) {
            this.$emit('chagneStatus', { item, index })
        },
        handelStatusLabel(status) {
            if (this.handleStatusLabel) {
                return new Function('ctx', '_this', 'status', this.handleStatusLabel)(this.context, this.$parent, status)
            } else {
                throw new Error('请维护设备状态组件 状态名称确定脚本')
            }
        },
        handleStatus(status) {
            if (this.handleStatusColor) {
                return new Function('ctx', '_this', 'status', this.handleStatusColor)(this.context, this.$parent, status)
            } else {
                throw new Error('请维护设备状态组件 颜色值确定脚本')
            }
        },
        showMask(index) {
            this.currentIndex = index
            this.isMaskVisible = true;
        },
        hideMask(index) {
            this.currentIndex = index
            this.isMaskVisible = false;
        },
    }
}
</script>

<style lang="scss" scoped>
.kevin_equipment_chart {
    width: 100%;
    overflow: auto;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
}

.equipment_container {
    width: 100%;
    display: grid; // 声明一个容器
    grid-template-columns: repeat(12, 1fr); //分成2栏，每栏均等分
    grid-column-gap: 50rpx; //列间隔 这个很重要
    place-items: center;

    .e_c_list {
        width: 7.5rem;
        height: 7.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1.5rem;
        position: relative;

        .e_c_equipmentName {
            font-size: 0.8rem;
            color: #333;
            font-weight: bold;
            display: block;
            margin-top: 0.2rem;
        }

        .e_c_equipmentNumber {
            font-size: 0.7rem;
            color: #B6B9BD;
            font-weight: bold;
            display: block;
            margin-top: 0.2rem;
        }

        .device_status_box {
            width: 7.5rem;
            height: 7.5rem;
            position: absolute;
            top: -3px;
            left: 0;
            // background: rgba(0, 0, 0, 0.1);
            background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%);

            border-radius: 10px;
            backdrop-filter: blur(3px);
            transition: background 0.5s ease-in-out;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .d_s_b_label {
                font-size: 1.2rem;
                color: #000;
                font-weight: bold;
                display: block;
                margin-bottom: 0.8rem;
            }

            .d_s_b_change {
                font-size: 1.1rem;
                color: #3967C4;
                font-weight: bold;
                transform: rotate(90deg);
                cursor: pointer;
            }
        }
    }
}

.device_status_icon {
    width: 4rem;
    height: 4rem;
    cursor: pointer;
}

.emptyarea {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
</style>