const boshland = {
    state: {
        boContainerHeight: 0,//布局外层容器 动态高度
        boMainHeight: 0,//内容区域高度
        boMainNavHeight: 0,//内容区域 顶部操作区域高度
        boDialogHeight: 0,//弹窗内容区域高度
        lang: localStorage.getItem('lang') || 'SimplifiedChinese',
        loginThemeIndex: localStorage.getItem('loginThemeIndex') || 0,//登录主题背景图片地址
        speed: localStorage.getItem('speed'),//主题更换速度
        autoChangeTheme: localStorage.getItem('autoChangeTheme'),//主题是否开启自动更换
    },
    mutations: {
        set_autoChangeTheme(state, autoChangeTheme) {
            state.autoChangeTheme = autoChangeTheme
        },
        set_speed(state, speed) {
            state.speed = speed
        },
        set_loginThemeIndex(state, url) {
            state.loginThemeIndex = url
        },
        set_lang: (state, lang) => {
            localStorage.setItem('lang', lang)
            state.lang = lang
        },
        set_boContainerHeight(state, height) {
            state.boContainerHeight = height
        },
        set_boMainHeight(state, height) {
            state.boMainHeight = height
        },
        set_boMainNavHeight(state, height) {
            state.boMainNavHeight = height
        },
        set_boDialogHeight(state, height) {
            state.boDialogHeight = height
        }

    }
}

export default boshland
