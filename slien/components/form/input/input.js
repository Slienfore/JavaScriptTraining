const tar = '.sli-input-inner'
export default () => {
    $(tar).each(function () {
        // 用户配置
        const options = {
            icon: $(this).attr('sli-icon'),
            iconPos: getIconPos.bind($(this))(),
            clearable: $(this).attr('sli-clearable') !== undefined
        }

        // 绑定 this
        fun.bind($(this), options)()
    })
}

function fun(options) {
    // 创建结点
    createInputDom.bind(this, options)()

    // 清空按钮
    clearInputButton.bind(this)()

    // hover事件(non-transition 清除不掉 初次 input框的transition过渡😔)
    inputHover.bind(this)()
}

// 清除按钮
function clearInputButton() {
    this.on({
        // 监听聚焦
        focus() {
            $(this).siblings('.sli-input-clear')
                .css({display: $(this).val() ? 'block' : 'none'})
        },
        // 监听输入
        input() {
            $(this).siblings('.sli-input-clear')
                .css({display: $(this).val() ? 'block' : 'none'})
        },
        // 离开隐藏
        blur() {
            /*            // 清除前、后导空格
                        $(this).val($(this).val().trim())*/
            $(this).siblings('.sli-input-clear')
                .css({display: 'none'})
        }
    })

    // 点击清除
    this.siblings('.sli-input-clear')
        .on('click', function () {
            $(this).css({display: 'none'})
                .siblings('input').val('')
        })
}

// 自动获取焦点
function inputHover() {
    this.hover(() => {
        $(this).focus()// 自动获取焦点
            .addClass('sli-input-transition')
            .addClass('sli-input-hover')
    }, () => {
        $(this).addClass('sli-input-transition')
            .removeClass('sli-input-hover')
    })
}

function createInputDom({icon, iconPos, clearable}) {
    // 寻找临近父节点
    this.parent().addClass('sli-input')

    // 清除按钮
    clearable && this.parent()
        .addClass('sli-input-suffix')
        .append($(`
            <i class="sli-input-clear sli-input-icon-suffix sli-input-icon iconfont icon-warn"></i>`))

    // 没有就不拼接
    if (!icon) return

    this.parent().addClass(`sli-input-${iconPos}`)
        .append($(`
            <i class="sli-input-icon-${iconPos} sli-input-icon iconfont icon-${icon}"></i>`))
}

// 获取定义图标位置
function getIconPos() {
    const res = [
        {attr: this.attr('sli-prefix'), pos: 'prefix'},
        {attr: this.attr('sli-suffix'), pos: 'suffix'}]
        // attr =>  声明:  '', 未声明: undefined
        .find(obj => obj.attr !== undefined)

    // 未找到: undefined, 默认值 'sli-prefix'
    return res ? res.pos : 'prefix'
}
