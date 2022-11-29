import sli from "../../slien/slien.js"
import lens from "./lens.js"
import DB from "../../static/data/DB.js"
import {getAllQuery} from "../../utils/urlQuery.js"
import {getLoginUser, saveUserInfo} from "../../utils/storage.js"

initial()

function initial() {
    sli()
    // 获取请求路径参数
    const query = getAllQuery()

    if ($.isEmptyObject(query) || !query['category'] || !query['productId']) {
        $.modal({
            type: 'warn', title: '非法访问',
            content: '请在URL路径中设置 ?category=?&productId=? , 方便进行查询数据哦...',
            confirmText: '主页面', cancelText: '待在这里...'
        }).then(({confirm}) => {
            if (confirm) location.href = '../../index.html'
            $.message({type: 'warn', content: '·'.repeat(150), duration: 3000})
        })
        return
    }

    const goods = DB.findGoods(query['category'], query['productId'])

    // 找不到
    if (!goods) location.href = '../../index.html'

    // 设置商品名称为文档标题
    document.title = `${goods.title}  ${goods.desc}`

    // 轮播图
    const swiper = $.swiper({
        target: '#sli-swiper',
        swipers: goods.imgs.swiper, delay: 4000
    })

    // 放大镜 => 需要获取当前激活的轮播图图片 => 方便放大镜使用
    lens(swiper)

    // 商品名称
    $('.header-left-wrap>h3').text(goods.title)

    // 额外版本信息
    goods.configure.version.extra.forEach(val => {
        $('.version-wrap').append($(`
            <li class="version-item"><a href="javascript:;">${val}</a></li>
        `))
    })

    // 商品名称(右侧)
    $('.goods-name').text(goods.title)

    // 优惠信息
    $('.goods-sale span').eq(0).text(goods.sale.desc)

    // 商品描述
    $('.goods-sale span').eq(1).text(goods.desc)

    // 商品价格
    $('.price').text(goods.price)

    // 选择商品配置信息
    goods.configure.version.sell.forEach(val => {
        $('.choose-version>ul').append($(`<li>${val}</li>`))
    })

    // 选择颜色
    goods.configure.color.forEach(val => {
        $('.choose-color>ul').append($(`<li>${val}</li>`))
    })

    $('.choose-version li').on({
        click() {
            $(this).addClass('choose-active')
                .siblings('li').removeClass('choose-active')// 排它
            // 更新 版本信息
            $('.buy-goods-version').text($(this).text())
        }
    }).eq(0).click()// 默认选中第一个

    $('.choose-color li').on({
        click() {
            $(this).addClass('choose-active')
                .siblings('li').removeClass('choose-active')// 排它
            // 更新 颜色信息
            $('.buy-goods-color').text($(this).text())
        }
    }).eq(0).click()// 默认选中第一个

    // 商品名称
    $('.buy-goods-name').text(goods.title)

    // 计算总价格
    const calc = () => {
        // numBox Component 中, 已经封装了合法化
        const num = $('.sli-num-box-input').val()
        // 购买数量
        $('.buy-num').text(num || 0)
        // 总价格
        $('.buy-goods-price').text(num * goods.price || 0)
    }

    // 累加 || 累减
    $('.sli-num-box-sub, .sli-num-box-add').on({
        click() {
            calc()
        }
    })

    $('.sli-num-box-input').on({
        input() {// 输入
            calc()
        }
    })

    // 加入购物车
    addCart({id: parseInt(query['productId']), category: query['category']})

    // 没有优惠信息
    if (!goods.sale.desc) $('.goods-sale span').eq(0).remove()

    // 没有版本选择
    if ($.isEmptyObject(goods.configure.version.sell)) {
        $('.choose-version').remove()
        $('.buy-goods-version').remove()
    }
}

// 加入购物车
function addCart({id, category}) {
    $('.add-cart-btn').on({
        click() {
            const user = getLoginUser()
            // 尚未登录
            if (!user) return

            const options = {// 用户选择
                // 有些商品没有
                version: $('.buy-goods-version').length ? $('.buy-goods-version').text() : null,
                color: $('.buy-goods-color').text(),
                num: parseInt($('.buy-num').text())
            }

            if (!options.num) return $.message({type: 'warn', content: '请选择商品数量...'})

            // 初始化
            if (!user.hasOwnProperty('cartList')) user['cartList'] = []

            // 判断是否有相同的商品
            const same = user.cartList.find(item =>
                item.category === category && item.id === id
                && item.options.version === options.version
                && item.options.color === options.color
            )

            // 存在相同商品, 进行追加
            if (same) {
                same.options.num += options.num
            } else {
                // 添加商品(前缀)
                user.cartList.unshift({
                    id, category,
                    price: parseInt($('.goods-price').text()),// 单价
                    options,// 用户选择
                    checked: true, // 是否激该商品
                    unique: new Date().getTime()// 时间戳进行确定唯一值
                })
            }

            // 保存当前用户信息
            saveUserInfo(user)

            $.message({type: 'success', duration: 2500, content: '加入购物车成功...欢迎下次购买🤭'})
        }
    })
}
