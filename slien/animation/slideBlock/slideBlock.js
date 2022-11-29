// 获取起点坐标
const getOrinX = orin => (orin.offset().left +
    parseInt(orin.css('padding-left')))// 可能会存在 padding 影响起点

// 获取相对于起点坐标
const getRelativePosX = el => el.offset().left - getOrinX(el.parent())

// 检查滑块是否在当前元素
const judge = (el, block) => {
    const blockX = block.offset().left,// 滑块位置
        elX = el.offset().left// 元素位置

    if (elX > blockX) { // 左边
        return (blockX + parseInt(block.css('width'))) < elX
    } else {// 右边
        return (elX + parseInt(el.css('width'))) < blockX
    }
}

// 滑动滑块
export const slideBlockSliding = ({
                                      el,
                                      block = el.siblings('.slide-block')// 默认当前元素的兄弟
                                  }, callback) => {
    // 滑块在当前元素
    if (!judge(el, block)) return

    // 滑块 比 el '宽度'差值(滑块可能要el宽度大)
    const blockDiffEl = (parseInt(block.css('width')) - parseInt(el.css('width'))) / 2

    // 滑块位置
    const slideX = getRelativePosX(block) + blockDiffEl

    console.log(slideX, '滑块位置',
        '终点位置', getRelativePosX(el) - blockDiffEl)

    block.animate({
        left: getRelativePosX(el) - blockDiffEl,// 忽略差值
    }, 'swing', () => {
        // 防止滑动过后 鼠标不动,依旧 hover
        block.removeClass(block.attr('class').split(' ')
            .find(val => val.indexOf('hover') > -1))// 查找 hover 属性, 将其移除

        // 元素样式激活
        const elActive = el.siblings().attr('class').split(' ')
            .find(val => val.indexOf('active') > -1)

        el.addClass(elActive)
            .siblings().removeClass(elActive)// 排它

        console.log(getRelativePosX(block), '滑动后坐标')

        callback(el)
    })
}

// 元素 hover
export const slideBlockHover = ({
                                    el,
                                    block = el.siblings('.slide-block'),// 默认当前元素的兄弟
                                    hoverClass
                                }) => {
    // 上面移动结束时候清过 hover => 故不用 toggle
    el.on({
        mousemove() {
            // 滑块不在当前元素
            judge($(this), block) && block.addClass(hoverClass)
        },
        mouseleave() {
            block.removeClass(hoverClass)
        }
    })
}
