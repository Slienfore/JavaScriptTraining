import input from "./input/input.js"
// 引入输入框
input()

export default () => {
    $.form = () => {
        return {
            collect
        }
    }
}

/**
 * 收集表单数据
 * @param e 触发事件
 * @returns {{inputName: {el: '元素', val: '表单值'}}}
 */
function collect(e) {
    e.preventDefault()

    const res = {}

    // 表单
    const _this = $(e.currentTarget)

    const inputs = [':text', ':password', ':radio:checked']
    inputs.forEach(el => {
        _this.find(el).each(function () {
            res[$(this).attr('name')] = {
                val: $(this).val(),
                el: $(this)// 存储当前元素方便以后出错后进行 focus
            }
        })
    })

    // 复选框
    $(_this.find(':checkbox')).each(function () {
        const checkbox = $(this).attr('name')

        // 初始化
        if (!res[checkbox]) res[checkbox] = []

        res[checkbox].push({
            val: $(this).prop('checked'),
            el: $(this)
        })
    })

    return res
}
