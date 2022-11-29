// 上拉 渐出
export const topWithFadeOut = (el, fun) => {
    el.animate({
        top: el.offset().top - 150,
        opacity: 0
    }, fun)
}

// 下拉 渐入
export const downWithFadeIn = el => {
    el.animate({
        top: el.offset().top + 150,
        opacity: 1,
    }, 'linear')
}
