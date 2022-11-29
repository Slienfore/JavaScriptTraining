import sli from "../../slien/slien.js"
import {getQuery} from "../../utils/urlQuery.js"
import scrollText from "./scrollText.js"
import secKill from "./secKill.js";
import floatingAd from "./adFloat.js"
import search from "./search.js"
import DB from "../../static/data/DB.js"
import {getItem, getLoginUser, setItem} from "../../utils/storage.js"
import {slideLeftOut, slideRightIn} from "../../slien/animation/animation.js"

(() => {
    sli()

    // 初始化
    initial()

    // 限时秒杀
    secKill()
    // 浮动广告
    floatingAd()
    // 滚动文字
    scrollText()
    // 搜索
    search()
})()

function initial() {
    // 轮播图
    $.swiper({
        target: '#sli-swiper',
        swipers: DB.swiper
    })

    // 设置当前登录状态
    setLoginStatus()
    // 设置滚动文字
    setScrollNotice()
    // 设置秒杀商品
    setSecKillGoods()
    // 设置主区域导航栏
    setMainNav()
    // 设置商品分类内容
    setCategoryMenu()
    // 退出登录
    logout()
    // 登录 与 注册
    login()
}

function login() {
    $('.mid-wrap button').on('click', () => {
        location.href = 'pages/login&enroll/login&enroll.html'
    })
}

// 退出登录
function logout() {
    // 退出登录
    $('.avatar-wrap').on({
        mouseenter() {
            // 如果尚未登录
            if ($('.mid-wrap-hasLogin').is(':hidden')) return $('.logout').css({display: 'none'})

            slideRightIn($('.logout'))
        },
        mouseleave() {
            // 如果尚未登录
            if ($('.mid-wrap-hasLogin').is(':hidden')) return $('.logout').css({display: 'none'})
            slideLeftOut($('.logout'))
        }
    })

    $('.logout').on({
        click() {
            // 头像
            $('.avatar-wrap img').eq(0).attr('src', 'https://wwc.alicdn.com/avatar/getAvatar.do?userNick=&amp;width=72&amp;height=72&amp;')
            // 姓名
            $('.username-wrap span').eq(1).text('您好')

            setItem('loginUser', '')

            // 隐藏已登录框
            $('.mid-wrap-hasLogin').slideUp(() => {
                // 显示未登录框
                $('.mid-wrap-unLogin').slideDown()
            })
        }
    })
}

// 设置当前登录状态
function setLoginStatus() {
    let user = {}
    // 用户列表
    const users = getItem('users') || []

    // 获取路径参数(用户是否从 登录、注册 页面跳转 |携带路径参数跳转| 过来)
    let account = getQuery('account')

    // 携带参数
    if (account) {// 尚未登录
        if (getQuery('username')) {// 注册用户
            user = {account, username: getQuery('username'), avatar: 'down.jpg'}

            $.message({type: 'success', content: '注册用户需要在数据中追加才能够正常购物哦...', duration: 4000})
        } else if (!users.some(item => item.account === account)) {// 名单内用户, 但是尚未进行登录
            user = DB.findUserByAccount(account)

            // 存放当前用户信息
            users.push(user)

            // 保存到本地
            setItem('users', users)
        } else {// 登录过
            user = users.find(item => item.account === account)
        }
    } else if (getItem('loginUser')) {// 登录过了 => 自动登录 || 未携带参数
        user = users.find(item => item.account === getItem('loginUser'))
        account = user.account
    }

    // 未登录
    if ($.isEmptyObject(user)) return

    // 头像
    $('.avatar-wrap img').eq(0).attr('src', `./static/img/avatar/${user.avatar}`)
    // 姓名
    $('.username-wrap span').eq(1).text(user.username)

    // 隐藏未登录框
    $('.mid-wrap-unLogin').css({display: 'none'})
    // 显示已登录框
    $('.mid-wrap-hasLogin').css({display: 'block'})

    // 注册用户
    if (getQuery('username')) return

    // 当前登录的用户
    setItem('loginUser', account)

    const loginUser = getLoginUser()

    if (!loginUser) return

    // 购物车数量
    $('.cart-num span').eq(0).text(
        loginUser.hasOwnProperty('cartList') ?
            loginUser.cartList.reduce((pre, item) => pre + item.options.num, 0)// 统计购物车商品数量
            : 0)
}

// 设置分类内容
function setCategoryMenu() {
    DB.category.forEach(({
                             title,
                             icon,
                             href,
                             subCategory
                         }) => {
        const category = $(`
                <li class="category-item" data-title="${title}">
                    <i class="iconfont icon-${icon}"></i>
                    <a href="${href}" class="sli-flex-center iconfont">${title}</a>
                 </li>
        `)

        // 二级菜单为空就不拼接了
        if ($.isEmptyObject(subCategory)) return $('.main-category-wrap').append(category)

        // 遍历二级菜单
        const {url, data} = subCategory

        const content = $(`<ul class="child-wrap"></ul>`)

        data.forEach(item => {
            content.append($(`
                <li class="category-child-item">
                    <!--访问路径-->
                    <a href="pages/shopping/shopping.html?category=${item.category}&productId=${item.id}" title="${item.title}" target="_blank">
                        <img src="${item.imgs.preview.src}" alt="${item.title}">
                        <h3 class="title sli-ellipsis">${item.title}</h3>
                        <p class="desc sli-ellipsis">${item.desc}</p>
                    </a>
                </li>
            `))
        })

        const subItem = $(`<div class="category-children" data-title="${title}" style="display: none;"></div>`)
        // 二级菜单拼接内容
        subItem.append(content)
        // 一级菜单拼接二级菜单
        category.append(subItem)
        // 拼接一级菜单
        $('.main-category-wrap').append(category)

        category.on({// 此时一级就是对应二级菜单
            mouseenter() {
                subItem.stop().fadeIn()
            },
            mouseleave() {
                subItem.stop().fadeOut()
            }
        })

        // main-right 与 main-left 之间的 margin => 与 main-right 左右padding 累加 相同
        subItem.css({width: $('.main-right').outerWidth()})

        // 监听窗口变化
        $(window).resize(() => {
            subItem.css({width: $('.main-right').outerWidth()})
        })
    })
}

// 设置导航栏
function setMainNav() {
    DB.mainNav.forEach(({title, href}) => {
        $('.main-nav>ul').append($(`<li><a href="${href}">${title}</a></li>`))
    })
}

// 设置滚动文字内容
function setScrollNotice() {
    DB.notice.forEach(({
                           title,
                           content,
                           href
                       }) => {
        $('.notice-wrap').append($(`
            <div class="notice-item">
                <a href="${href}">
                    <span class="${title === '主要' ? 'notice-item-primary' : ''}">${title}</span>
                    <p class="sli-ellipsis">${content}</p></a>
            </div>
        `))
    })
}

// 限时秒杀内容
function setSecKillGoods() {
    DB.secKill.forEach(({
                            content,
                            price,
                            src,
                            href
                        }) => {
        $('.sec-kill-goods-list').append($(`
            <li><a href="${href}" class="sec-kill-goods-item">
                    <div class="sec-kill-item-img">
                        <img src="${src}" alt=""></div>
                    <div class="sec-kill-item-info">
                        <h6 class="sec-kill-item-name sli-ellipsis">${content}</h6>
                        <div class="sec-kill-item-price">
                            <i>¥</i><span>${price}</span></div>
                    </div>
            </a></li>
        `))
    })
}
