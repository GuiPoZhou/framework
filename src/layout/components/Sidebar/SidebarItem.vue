<template>
    <div v-if="!item.hidden">
        <template
            v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
            <!--  菜单-->
            <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
                <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}" @click="e_clickMenu($event,item.menuId)">
                    <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
                </el-menu-item>
            </app-link>
        </template>
        <!--    目录+菜单部分-->
<!--   :index="resolvePath(item.path)+item.meta.title"    item.meta.title的作用：再微前端的路由规划中，目录一级不在承担路由拼接的作用，微前端的页面路由完全由真实的菜单页面来规范  -->
        <el-submenu class="leftMenu" v-else ref="subMenu" :index="resolvePath(item.path)+item.meta.title" popper-append-to-body>
            <template slot="title">
                <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title"/>
            </template>
            <sidebar-item
                v-for="child in item.children"
                :key="child.path+Math.random()"
                :is-nest="true"
                :item="child"
                :base-path="resolvePath(child.path)"
                class="nest-menu"
            />
        </el-submenu>
    </div>
</template>

<script>
import path from 'path'
import {isExternal} from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
    name: 'SidebarItem',
    components: {Item, AppLink},
    mixins: [FixiOSBug],
    props: {
        // route object
        item: {
            type: Object,
            required: true
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    data() {
        this.onlyOneChild = null
        return {}
    },
    methods: {
        /**
        * @author Coder
        * @date 2022/12/9
        * @des 选中菜单 存储menuId
        */
        e_clickMenu(e,menuId){
            localStorage.setItem('menuId',menuId)
        },
        hasOneShowingChild(children = [], parent) {
            if (!children) {
                children = [];
            }
            const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false
                } else {
                    // Temp set(will be used if only has one showing child)
                    this.onlyOneChild = item
                    return true
                }
            })

            // When there is only one child router, the child router is displayed by default
            if (showingChildren.length === 1) {
                return true
            }

            // Show parent if there are no child router to display
            if (showingChildren.length === 0) {
                this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
                return true
            }

            return false
        },
        resolvePath(routePath, routeQuery) {
            //校验菜单的跳转路由是否为外链地址
            if (isExternal(routePath)) {
                return routePath
            }
            //校验菜单的跳转路由是否为外链地址
            if (isExternal(this.basePath)) {
                return this.basePath
            }

            if (routeQuery) {
                let query = JSON.parse(routeQuery);
                return {path: path.resolve(this.basePath, routePath), query: query}
            }

            return path.resolve(this.basePath, routePath)
        }
    }
}
</script>
