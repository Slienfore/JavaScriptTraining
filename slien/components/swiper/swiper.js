/**
 * @description 轮播图使用
 * $.swiper({target: '#sli-swiper' swipers, delay: 1500, speed: 300 })
 * @param{string} target 挂载的目标对象
 * @param{Array} swipers = [{href: '', src: ''}]
 * @param href 默认为('javascript:;')
 * @param{number} delay 自动播放速度 默认为(1500)
 * @param{number} speed 滑动速率 默认为(3000 / 2.8)
 *
 * @description 标签 自定义属性设置 宽高
 * @param sli-width 宽度px
 * @param sli-height 高度px
 * @param sli-radius 圆角大小px
 * <div id="sli-swiper" sli-width="800px" sli-height="380px" sli-radius="18px"></div>
 */

import {getCssProperty, setCssProperty} from "../../utils/util.js"

export default function swiper() {
    $.swiper = props => {
        // 处理跳转链接
        props.swipers = props.swipers.filter(obj =>
            obj.href = obj.href ? obj.href : 'javascript:;')

        return fun(props)
    }
}

function fun(props) {
    return new InitSwiper(props)
}

/**
 * 初始化轮播图
 * @param{string} target 挂载目标
 * @param{Array} swipers 轮播图数组
 * @param{number} delay 自动播放速度
 * @param{number} speed 速率
 * @constructor
 */
function InitSwiper({
                        target = '#sli-swiper',
                        swipers = [],
                        delay = 3000,
                        speed = 3000 / 2.8,
                    }) {

    const _this = $(target)

    // 图片宽度 || 图片高度
    // const {$width: width, $height: height} = setSwiperStyle()// 自定义轮播图 大小
    const {width, height, radius} = querySwiperStyle()// 自定义轮播图 大小
    // 图片数量(无缝拼接) || 全部图片长度
    const num = swipers.length + 1, allWidth = num * width

    // 当前图片下标
    let idx = 0,
        timer = null,// 定时器
        throttle = false// 节流器

    // 创建结点
    createSwiperDom()

    // 切换下一张
    const sufToggle = () => {
        if (throttle) return

        throttle = true

        // 移动到了最后一张(无缝拼接 => 最后一张就是第一张)
        if (++idx === num) {
            idx = 1
            // 视差效果 => begin && end 相同
            _this.find('.sli-swiper-focus').css({left: 0})
        }

        // 向左滑动 => 负数
        _this.find('.sli-swiper-focus').stop()
            .animate({left: -idx * width}, speed, () => {
                throttle = false
            })

        // 切换小圆点
        dotChange()
    }

    // 切换上一张
    const preToggle = () => {
        if (throttle) return

        throttle = true

        if (--idx === -1) {
            idx = num - 2// 无缝拼接
            _this.find('.sli-swiper-focus').css({left: -(idx + 1) * width})
        }

        _this.find('.sli-swiper-focus').stop()
            .animate({left: -idx * width}, speed, () => {
                console.log('dee')
                throttle = false
            })

        // 切换小圆点
        dotChange()
    }

    // 切换小圆点
    const dotChange = () => {
        // 最后一张就是第一张
        _this.find('.sli-swiper-dot-wrap li').eq(idx === num - 1 ? 0 : idx)
            .addClass('dot-on')
            .siblings().removeClass('dot-on')

        // 圆点变化一定引起轮播图变化
        this.active = _this.find('.sli-swiper-focus li').eq(idx)
    }

    // 自动播放
    const autoPlay = () => {
        timer = setInterval(sufToggle,// 切换图片
            delay)
    }

    // 暂停播放
    const stopPlay = () => {
        clearInterval(timer)
    }

    // 悬浮停止
    const hoverStop = () => {
        // 鼠标进入 => 停止播放
        _this.hover(() => {
            stopPlay()
        }, () => {
            autoPlay()
        })
    }

    // 点击切换
    const clickToggle = () => {
        _this.find('.sli-arrow-r, .sli-arrow-l').on({
            click() {
                if ($(this).hasClass('sli-arrow-l')) {
                    preToggle()
                } else if ($(this).hasClass('sli-arrow-r')) {
                    sufToggle()
                }
            },
            //...mouseClickArrows()
        })

        // 鼠标点击放大箭头
        function mouseClickArrows() {
            if (throttle) return
            return {
                mousedown(e) {
                    $(this).css({transform: 'scale(1.35)'})
                },
                mouseup(e) {
                    $(this).css({transform: 'scale(1.2)'})
                }
            }
        }
    }

    // 小圆点 hover 切换
    const dotsHoverToggle = () => {
        _this.find('.sli-swiper-dot-wrap li').on('mouseover', function () {
            idx = $(this).index()
            dotChange()
            _this.find('.sli-swiper-focus').stop().animate({left: -idx * width}, speed)
        })
    }

    // 滑动切换
    const dragToggle = () => {
        // 禁止图片拖动
        _this.find('.sli-swiper-focus img').on('dragstart', function () {
            return false
        })

        let drag = false// 拖动过程中禁止跳转
        _this.find('.sli-swiper-focus a').on('click', function (e) {
            drag && e.preventDefault()
        })

        let press = false// 记录鼠标按下 => 按下才会记录移动距离
        let orinX = 0, endX = 0
        // 最低滑动距离
        const minDragOffset = width / 5

        _this.on({
            mousedown(e) {
                press = true// 记录点击状态
                orinX = e.clientX// 记录
            },
            mousemove(e) {
                // 没有点击
                if (!press) return

                press = true
                endX = e.clientX - orinX
            },
            mouseup(e) {
                press = false// 清除按压状态
                drag = false// 清除拖动状态

                if (Math.abs(endX) < minDragOffset) return// 小于拖动距离

                if (endX < 0) {// 左拖动
                    _this.find('.sli-arrow-l').click()
                } else {// 右拖动
                    _this.find('.sli-arrow-r').click()
                }
            },
            mouseleave() {
                drag = false// 离开了拖拽不算
            }
        })
    }

    // 生成节点(直接引入 class = sli-swiper)
    function createSwiperDom() {
        // 自定义 轮播图样式
        setCssProperty(_this, {
            '--swiper-width': width + 'px',
            '--swiper-height': height + 'px',
            '--swiper-border-radius': radius
        })

        // 箭头
        const arrows = $(`
    <span class="sli-arrow-l iconfont icon-arrow_left"></span>
    <span class="sli-arrow-r iconfont icon-arrow_right"></span>`)

        // 轮播图片盒子
        const swiperFocus = $(`<ul class="sli-swiper-focus" data-active="${idx}"></ul>`)

        // 小圆点盒子
        const dotWrap = $(`<ol class="sli-swiper-dot-wrap"></ol>`)

        swipers.forEach(val => {
            // 拼接图片
            swiperFocus.append(
                `<li>
                <a href="${val.href}"><img src="${val.src}" alt=""></a>
            </li>`)

            // 拼接小圆点
            dotWrap.append(`<li></li>`)
        })

        // 无缝轮播
        swiperFocus.append(swiperFocus.find('li').eq(0).clone())

        // 默认激活第一个圆点
        dotWrap.find('li').eq(0).addClass('dot-on')

        _this.append(arrows)// 箭头
            .append(swiperFocus)// 轮播图图片
            .append(dotWrap)// 圆点
    }

    // 查询轮播图样式
    function querySwiperStyle() {
        _this.addClass('sli-swiper')

        // 获取自定义属性
        let width = _this.attr('sli-width'),
            height = _this.attr('sli-height'),
            radius = _this.attr('sli-radius')

        // 若没有则使用 最近一级 的父元素 宽高
        const parent = _this.parent()
        width = width ? width : parseInt(parent.css('width'))
        height = height ? height : parseInt(parent.css('height'))
        // 圆角大小, 默认为 CSS 变量的值
        radius = radius ? radius :
            getCssProperty(_this, '--swiper-border-radius')

        return {
            width: parseInt(width),
            height: parseInt(height),
            radius
        }
    }

    this.active = _this.find('.sli-swiper-focus li').eq(idx)

    if (delay) {// 延时 0 不开启
        autoPlay()// 自动切换
        hoverStop()// 悬停停止
    }

    // 点击切换
    clickToggle()

    // 底部圆点 hover 切换
    dotsHoverToggle()

    // 滑动切换
    dragToggle()
}
