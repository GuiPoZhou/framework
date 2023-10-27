<template>
    <div class="dataScreen">
        <div id="appContainerScreen" v-show="false"></div>
        <DataScreen v-if="show" @close="$emit('close')" />
    </div>
</template>

<script>
import Vue from "vue";

import { loadMicroApp } from 'qiankun';
export default {
    data() {
        return {
            show: false
        }
    },
    async created() {
        this.microProjectEntry = process.env.NODE_ENV === "production" ? '/subProject/' : `//${window.location.hostname}:7004`

        await this.doLoadMicroAppaa('microProject', this.microProjectEntry)
        console.log('window.commonComponents.DataScreen', window.commonComponents.DataScreen)
        Vue.component('DataScreen', window.commonComponents.DataScreen)
        this.show = true
    },
    methods: {
        async doLoadMicroAppaa(microName, entry) {
            const app = loadMicroApp({
                name: `${microName}${new Date().getTime()}`,
                entry: entry,
                container: '#appContainerScreen',
                props: { commonComponents: window.commonComponents, isLoad: true }
            })
            await app.mountPromise;
        }
    }
}
</script>

<style>
.dataScreen {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10001;
}

#appContainerScreen {
    width: 100%;
    height: 100%;
}
</style>