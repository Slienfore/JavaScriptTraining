import login from "./login.js"
import enroll from "./enroll.js"
import sli from "../../slien/slien.js"
import {getCssProperty} from "../../slien/utils/util.js"
import {loginAndEnrollRotate, slideBlockHover, slideBlockSliding} from "../../slien/animation/animation.js"

// 注册使用插件
sli()
// 隐藏非激活状态表单
hideOtherForm()

// 滑块 hover
slideBlockHover({
    el: $('.wrapping-header span'),
    hoverClass: 'slide-block-hover'
})

// 控制 登录 || 注册 切换
$('.wrapping-header span').on('click', function () {
    // 滑块移动
    slideBlockSliding({el: $(this)},
        (to) => {
            switch (to.text()) {
                case '注册':
                    loginAndEnrollRotate('loginToEnroll', $(this))
                        .then(hideOtherForm)// 隐藏非激活表单
                    break
                case '登录':
                    loginAndEnrollRotate('enrollToLogin', $(this))
                        .then(hideOtherForm)// 隐藏非激活表单
                    break
            }
        })
})

// 隐藏非激活表单 && 清空表单数据
function hideOtherForm() {
    // 当前激活的 div
    const active = $('.wrapping > div').filter(function () {
        return $(this).css('z-index') ===// 优先级最大的在前面
            getCssProperty($('.container'), '--z-index-primary').trim()
    })

    active.find('form')
        .css({opacity: 1})// 显示权重大的

    // 排他
    active.siblings('div').find('form')
        .css({opacity: 0})// 隐藏其它表单

    // 清空表单数据
    clearAllInputs(active.find('input'))
}

// 清空表单数据
function clearAllInputs(el) {
    // 清空输入框数据
    el.val('')
        .prop({checked: false})
}
