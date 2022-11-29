export default (swiper) => {
    // 棱镜 && 棱镜预览
    const len = $('.lens-overlay'), view = $('.lens-view')

    // 控制棱镜以及预览图片显示或隐藏
    const optDisplay = opt => {
        len.css({display: opt})
        view.css({display: opt})

        switch (opt) {
            case 'none':
                $('.lens-view img').attr('src', '')
                break
            default:
                $('.lens-view img').attr('src', swiper.active.find('img').attr('src'))
                break
        }
    }

    $('.sli-swiper').on({
        mousemove(e) {
            // 鼠标相对于盒子位置
            const xCursor = e.pageX - $(this).offset().left,
                yCursor = e.pageY - $(this).offset().top

            // 限定鼠标移动的区域
            if (xCursor > $(this).width()// 预览图片在右边(mousemove 事件)
                || yCursor > $(this).height() - 40) {// 且不能超过轮播图小圆点位置
                optDisplay('none')
                return
            } else if (len.is(':hidden')) {// 隐藏就显示 ↑ (自定义边界, 手动开启)
                optDisplay('block')
            }

            // 棱镜的位置
            let xLen = xCursor - len.width() / 2, yLen = yCursor - len.height() / 2

            // 将棱镜位置合理化 (防止移动棱镜超出边界 => 棱镜固定(鼠标在合法区间内))
            xLen = Math.max(xLen, 0)// 左
            xLen = Math.min(xLen, $(this).width() - len.width())// 右
            yLen = Math.max(yLen, 0)// 上
            yLen = Math.min(yLen, $(this).height() - len.height() - 40)// 下(40px => 不超过轮播图小圆点位置)

            len.css({left: xLen, top: yLen})

            // 预览图片位置('棱镜' 与 '大图片' 的移动比例一致)
            // => ('棱镜'移动距离 ÷ '棱镜'最大移动距离) === ('大图片'移动距离 ÷ '大图片'最大移动距离)
            //
            // ==> '大图片'移动距离 = ('棱镜'移动距离 × '大图片'最大移动距离) ÷ '棱镜'最大移动距离

            // 棱镜最大移动距离
            const xLenMax = $(this).width() - len.width(),
                yLenMax = $(this).height() - len.height()

            // 大图片最大移动距离
            const xBigMax = $('.lens-view img').width() - $('.lens-view').width(),
                yBigMax = $('.lens-view img').height() - $('.lens-view').height()

            // ( - ) 移动方向相反
            $('.lens-view img').css({
                left: -(xLen * xBigMax) / xLenMax,
                top: -(yLen * yBigMax) / yLenMax
            })
        },
        mouseenter() {
            optDisplay('block')
        },
        mouseleave() {
            optDisplay('none')
        }
    })

    // 左、右点击时候, 替换照片
    $('.sli-arrow-l,  .sli-arrow-r').on({
        click() {
            $('.lens-view img').attr('src', swiper.active.find('img').attr('src'))
        }
    })
}
