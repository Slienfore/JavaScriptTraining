import {random} from "../../slien/utils/util.js"

export default async () => {
    // 一共生成随机个广告[1 ~ 3]区间
    const min = 1, max = 2

    for (let freq = random(min, max), num = 1; num <= freq; ++num) {
        // 无限播放 Gif 动画
        const timer = setInterval(() => {
            $('.float-ad img').attr('src',// 替换 src
                $('.float-ad img').attr('src'))
        }, 7000)

        createDom()// 创建 floatAd 结点

        await new Promise(resolve => {
            setTimeout(adFloat, random(25 * 1000, 60 * 1000))// 25s 到 60s 出现一个广告

            $('.float-ad .close-tag').on('click', () => {
                resolve()// 关闭之后, 再次生成下一个广告

                $('.float-ad').remove()
                clearInterval(timer)
                // 由于已经悬浮在 ad 上了, ad 的timer 就已经清除了
            })
        })
    }
}

// 浮动广告
function adFloat(ad = $('.float-ad'), setting = {}) {
    // 运动速度 || 运动间隔
    const {speed = 1, duration = 10} = setting

    let timer = float()

    // ad.animate({opacity: .8}, 'slow')// 默认隐藏
    ad.css({opacity: .9})

    ad.on({
        mouseenter() {
            clearInterval(timer)
        },
        mouseleave() {
            timer = float()
        }
    })

    const win = $(window)

    // 边界
    const boundary = getBoundary()

    // 广告位置出现随机
    let left = random(boundary.left, boundary.right),
        top = random(boundary.top, boundary.bot)

    // 移动方向(默认是正向, 反之逆向) => 撞墙后反弹
    const direct = {horizontal: 1, vertical: 1}

    function float() {
        return setInterval(() => {
            const xx = left + speed * direct.horizontal,
                yy = top + speed * direct.vertical

            // 水平方向
            if (xx < boundary.left) {// 左边撞墙
                direct.horizontal = 1// 向右
                left = boundary.left
            } else if (xx > boundary.right) {// 右边撞墙
                direct.horizontal = -1// 向左
                left = boundary.right
            } else {
                left = xx
            }

            // 垂直方向
            if (yy < boundary.top) {// 上方撞墙
                direct.vertical = 1// 向下
                top = boundary.top
            } else if (yy > boundary.bot) {// 下方撞墙
                direct.vertical = -1// 向上
                top = boundary.bot
            } else {
                top = yy
            }

            ad.css({left, top})
        }, duration)
    }

    // 获取边界
    function getBoundary() {
        return {
            left: win.scrollLeft(),// 相对于文档高度
            top: win.scrollTop(),// 相对于文档高度

            right: win.scrollLeft()// 相对于文档宽度
                + (win.width() - ad.outerWidth()),// 相对于可视窗口的宽度

            bot: win.scrollTop()// 相对于文档高度
                + (win.height() - ad.outerHeight()) // 相对于可视窗口的高度
        }
    }

    // 监听窗口变化(边界改变) => 底边界 + 右边界
    win.resize(() => {
        Object.assign(boundary, getBoundary())
    })

    // 监听滚动事件(边界改变) => 左边界 + 上边界
    win.scroll(() => {
        Object.assign(boundary, getBoundary())
    })
}

function createDom() {
    $('.container').append($(`
        <div class="float-ad">
            <a href="javascript:;" class="float-ad-item">
                <img src="./static/img/float-ad.gif" alt="">
                <div class="ad-desc">
                    <span>最佳游戏体验</span><span class="iconfont">去看看</span>
                </div>
            </a>
            <i class="close-tag iconfont icon-warn"></i>
        </div>
`))
}
