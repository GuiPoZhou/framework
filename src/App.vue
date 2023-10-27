<template>
    <div id="app">
        <router-view />

    </div>
</template>

<script>
import BoContainerMixin from '@/mixins/boContainer'

export default {
    mixins: [BoContainerMixin],
    name: 'App',
    metaInfo() {
        return {
            title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title,
            titleTemplate: title => {
                return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
            }
        }
    },
    methods: {
        IcoCreate() {
            var link =
                document.querySelector("link[rel*='icon']") ||
                document.createElement("link");
            link.type = "image/x-icon";
            link.rel = "shortcut icon";
            let icoName = ''
            if (!this.$store.state.system.systemInfo.extData.icoName) {
                icoName = `defaultfavicon.ico`
            } else {
                icoName = `${this.$store.state.system.systemInfo.extData.icoName}favicon.ico`
            }

            link.href = `/icos/${icoName}`;
            document.getElementsByTagName("head")[0].appendChild(link);
        },

        CreateOnlyOfficeSource() {
            if (this.$store.state.system.systemInfo.extData.onlineOfficeServer) {
                var scriptNode = document.createElement("script");
                scriptNode.type = "text/javascript"
                scriptNode.src = `${this.$store.state.system.systemInfo.extData.onlineOfficeServer}/web-apps/apps/api/documents/api.js`
                document.getElementsByTagName("head")[0].appendChild(scriptNode);
                var styleLinkNode = document.createElement("link");
                styleLinkNode.rel = "stylesheet"
                styleLinkNode.href = `${this.$store.state.system.systemInfo.extData.onlineOfficeServer}/sdkjs-plugins/plugins.css`
                document.getElementsByTagName("head")[0].appendChild(styleLinkNode);
            }
        },
        // handleBeforeUnload(event) {
        //     // 在页面关闭前触发的逻辑
        //     event.returnValue = '您确定要关闭页面吗？'; // 这一行将触发浏览器弹出确认框
        // },
    },
    mounted() {
        // window.addEventListener('beforeunload', this.handleBeforeUnload);
        // 监听浏览器后退和前进事件
        window.addEventListener('popstate', function (event) {
            if (event.isTrusted) {
                window.location.reload()
            }
        });
    },
    async created() {
        document.title = this.$store.state.system.systemInfo.title
        this.$store.dispatch('getSystemInfo')
        await this.$store.dispatch('getSystemThem')
        this.IcoCreate()
        this.CreateOnlyOfficeSource()
        this.CreatePageOffice()
    },
}
</script>

