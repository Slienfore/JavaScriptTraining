// 滚动文字
export default () => {
    const wrap = $('.notice-wrap'), item = $('.scroll-tip-wrap .notice-item')
    // 无缝滚动(拼接第一个结点)
    wrap.append($('.scroll-tip-wrap .notice-item').eq(0).clone())

    // 定时器
    let timer = null

    // 初始化
    scroll()

    item.on({
        // 进入停止定时器(快速定位到当前条目位置)
        mouseenter() {
            clearInterval(timer)

            // 条目位置相对于 wrap, wrap 相对于父容器滑动
            const pos = $(this).position().left// 条目位置

            // 向左滑动 => -
            wrap.stop().animate({left: -pos}, 'swing')
        },
        // 离开时候继续滚动
        mouseleave() {
            scroll()
        }
    })

    // 滚动
    function scroll() {
        timer = setInterval(() => {
            // 相对于父元素位置
            const pos = wrap.position().left
            // 终点
            const end = wrap.width() - item.width()

            // 最后一个条目(无缝拼接)
            if (Math.abs(pos) >= end) return wrap.css({left: 0})

            wrap.css({left: pos - .15})
        })
    }

    // 根据父容器大小设置宽度
    item.width(wrap.parent().width())

    // 监听页面变化, 改变条目大小
    $(window).resize(() => item.width(wrap.parent().width()))
}
