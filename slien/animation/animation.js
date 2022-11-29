import {slideBlockSliding, slideBlockHover} from "./slideBlock/slideBlock.js"
import {topWithFadeOut, downWithFadeIn} from "./message/message.js"
import {modalGrowingIn, modalShrinkingOut} from "./modal/modal.js"
import {loginAndEnrollRotate} from "./login&enroll/login&enroll.js"

// 右滑出出现
export const slideRightIn = (el, distance = -45, callback = () => {
}) => {
    el.css({display: 'block', opacity: 0})
        .stop()
        .animate({right: distance, opacity: 1}, 'swing', callback)
}

// 左滑入消失
export const slideLeftOut = (el, distance = 0, callback = () => {
}) => {
    el.stop()
        .animate({right: 0, opacity: 0}, function () {
            $(this).css({display: 'block'})
        }, 'swing', callback)
}

export {
    // 消息弹出
    topWithFadeOut,
    downWithFadeIn,
    // 模态框
    modalGrowingIn,
    modalShrinkingOut,
    // 登录与注册旋转
    loginAndEnrollRotate,
    // 滑块
    slideBlockHover,
    slideBlockSliding
}
