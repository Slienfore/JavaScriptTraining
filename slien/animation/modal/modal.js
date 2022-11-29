// 模态框 变大渐入
export const modalGrowingIn = () => {
    $('.sli-modal-overlay').animate({
        width: '105%',
        height: '105%',
    }, 'swing')

    $('.sli-modal-wrap').fadeIn('slow')
}

// 模态框 缩小渐出
export const modalShrinkingOut = (el, fun) => {
    el.addClass('modal-shrinking-out')

    setTimeout(() => {
        fun()
    }, 450)
}
