/**
 * 由于自己使用(不影响正常运行情况下), 有些异常未进行处理(事件回调是否成功, Promise.catch, 特殊错误)
 * jQuery(<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.min.js"></script>)
 * 允许使用 module <script type="module"><script>
 * 页面的 $(() => { }) 执行时机比这里早
 * 初始化 sli()
 */
// 组件
// 引入 message
import message from "./components/message/message.js"
// 引入 modal
import modal from "./components/modal/modal.js"
// 引入轮播图
import swiper from "./components/swiper/swiper.js"
// 引入表单
import form from "./components/form/form.js"
// 引入 num-box
import numBox from "./components/numBox/numBox.js"

export default function sli() {
    // 初始化
    new InitSli()
}

function InitSli() {
    // 恢复过渡效果
    recoverTransition()

    // 绑定 message 提示
    message()

    // 绑定 modal 提示
    modal()

    // 绑定 swiper
    swiper()

    // 表单
    form()

    // num-box
    numBox()
}

// 恢复过渡效果
function recoverTransition() {
    $('.none-transition').removeClass('none-transition')
}
