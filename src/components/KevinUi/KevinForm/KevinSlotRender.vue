<script>
export default {
    props: {
        slotParams: Object,
        row: Object,
        context: Object
    },
    methods: {
        renderSpan(createElement) {
            let value = '';
          console.log(111);
          if (this.slotParams.renderOptions.events.handle) {
                value = new Function('ctx', 'row', this.slotParams.renderOptions.events.handle)(this.context, this.row)
            } else {
                value = `动态列表未返回【${this.slotParams.slotName}】的数据`
                throw new Error('请配置动态列表的返回值处理脚本')
            }
            return createElement('span', value)
        },
        renderElLink(createElement) {
            let value = '';
            if (this.slotParams.renderOptions.events.propCode) {
                value = new Function('ctx', 'row', this.slotParams.renderOptions.events.propCode)(this.context, this.row)
            } else {
                value = `动态列表未返回【${this.slotParams.slotName}】的数据`
                throw new Error('请配置动态列表的返回值处理脚本')
            }
            return createElement(
                'el-link',
                {
                    props: {
                        type: this.slotParams.renderOptions.type,
                        underline: this.slotParams.renderOptions.underline
                    },
                    on: {
                        click: () => {
                            new Function('ctx', 'row', this.slotParams.renderOptions.events.click)(this.context, this.row)
                        }
                    }

                },
                value
            )
        },
    },
    render(createElement, context) {
        let vnode;
        if (this.slotParams.renderType === 'span') {
            vnode = this.renderSpan(createElement);
        } else if (this.slotParams.renderType === 'elLink') {
            vnode = this.renderElLink(createElement);
        }
        return createElement('div', { class: 'tableSlotRender' }, [vnode]);
    }
}
</script>
