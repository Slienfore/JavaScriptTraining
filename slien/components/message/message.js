/**
 * 消息(Promise风格)
 * $.modal({ type: 'success', content: '', duration: 1500 }).then(res => {
 *            res.done && console.log('提示完毕') })
 *        .catch(err => { })
 * @description 参数
 * @param{string} type 类型 ['success', 'info', 'warn'] 默认值('info')
 * @param{string} content 显示内容 默认值
 * @param{number} duration 时长 默认值(1500)
 *
 * @callback
    * @param{boolean} done true 回调成功
 */
import {topWithFadeOut, downWithFadeIn} from '../../animation/animation.js'
import {checkOrDefaultStyleType} from "../../utils/util.js";

// 挂载 $message 信息
export default function message() {
    $.message = props => {
        try {
            checkValid(props)
        } catch (e) {
            console.error(e)
            return Promise.reject(e)
        }

        return fun(props)
    }
}

let msgDom = null,// 消息结点
    throttle = false,// 节流器
    timer = null// 定时器

async function fun(props) {
    if (throttle) return await clearDomOut()

    throttle = true// 开启节流器

    msgDom = createMsgDom({...props})

    msgDom.css({top: $(window).scrollTop() + 20})

    // 监听滚动
    $(window).scroll(() => {
        msgDom.css({top: $(window).scrollTop() + 50 + msgDom.outerHeight() * 2})
    })

    // 生成提示信息
    $('body').append(msgDom)
    // 下拉动画
    downWithFadeIn(msgDom)

    return new Promise((resolve, reject) => {
        timer = setTimeout(() => {
            clearDomOut().then(res => {
                resolve(res)
            })

        }, (props.duration || 1500))
    })
}

function createMsgDom({type, content}) {
    return $(`<div class="msg-${type} sli-msg-wrap sli-position-center">
                        <i class="msg-icon iconfont icon-${type}"></i>
                        <p class="msg-text">${content}</p>
                    </div>`)
}

// 清除 结点 移出
function clearDomOut() {
    return new Promise((resolve, reject) => {
        topWithFadeOut(msgDom, () => {
            msgDom.remove()// 移除
            clearTimeout(timer)// 清除定时器
            throttle = false

            resolve({done: true})
        })
    })
}

// 验证合法性
function checkValid(props) {
    if (!props) throw '调用数据不合法, 请检查该函数调用格式'

    // 是否包含该 提示类型
    props.type = checkOrDefaultStyleType(props.type)
}
