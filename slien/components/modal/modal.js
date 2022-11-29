/**
 * @description 模态框(Promise风格)
 * $.modal({ type: '', content: '', title: '', confirmText: '', cancelText: '' }).then(res => {
 *            res.confirm && console.log('确定') })
 *        .catch(err => { })
 * @description 参数
 * @param{string}  type 类型 ['success', 'info', 'warn'] 默认值('info')
 * @param{string}  content 显示内容
 * @param{string}  title 显示标题
 * @param{string}  confirmText 确认按钮文字 默认值('确认')
 * @param{string}  cancelText 取消按钮文字 默认值('取消')
 *
 * @callback
    * @param{boolean} confirm true 确认
 */

import {checkOrDefaultStyleType} from "../../utils/util.js";
import {modalGrowingIn, modalShrinkingOut} from "../../animation/animation.js";

// 挂载 $modal 信息
export default function modal() {
    $.modal = props => {
        try {
            checkValid(props)
        } catch (e) {
            console.error(e)
            return Promise.reject(e)
        }

        return fun(props)
    }
}

function fun(props) {
    $('body').append(createMsgDom({...props}))

    // 模态框 渐入动画
    modalGrowingIn()

    return new Promise((resolve, reject) => {
        // 监听确认
        onToggleConfirm(resolve)

        // 监听关闭
        onToggleClose(resolve)
    })
}

// 监听确认
function onToggleConfirm(resolve) {
    // 确认
    $(':button[sli-confirm]').on('click', function () {
        closeModal($(this).parents('.sli-modal'), () => {
            resolve({confirm: true})
        })
    })
}

// 监听关闭
function onToggleClose(resolve) {
    // 关闭窗口
    $('.sli-modal-wrap>.close-tag, :button[sli-cancel]')
        .on('click', function () {
            closeModal($(this).parents('.sli-modal'), () => {
                resolve({confirm: false})
            })
        })
}

// 关闭模态框
function closeModal(el, callback) {
    modalShrinkingOut(el, () => {
        // 移除结点
        el.remove()
        callback()
    })
}

function createMsgDom({
                          type,
                          title = '温馨提示',
                          content,
                          confirmText = '确认',
                          cancelText = '取消'
                      }) {
    return $(`
    <div class="sli-modal">
    <!--自己居中, 内容居中-->
    <div class="sli-modal-overlay sli-position-center sli-flex-center">
        <div class="sli-modal-wrap">
            <i title="关闭" class="close-tag iconfont icon-warn"></i>
            <!--顶部-->
            <div class="sli-modal-top">
                <h2>${title}</h2>
            </div>
            <div class="sli-modal-mid">
                <i class="iconfont icon-${type}"></i>
                <p>${content}</p>
            </div>
            <div class="sli-modal-bot">
                <button sli-cancel class="sli-button sli-button-warn">${cancelText}</button>
                <button sli-confirm class="sli-button sli-button-primary">${confirmText}</button>
            </div>
        </div>
    </div>
</div>`)
}

// 验证合法性
function checkValid(props) {
    if (!props) throw '调用数据不合法, 请检查该函数调用格式'

    // 是否包含该 提示类型
    props.type = checkOrDefaultStyleType(props.type)
}
