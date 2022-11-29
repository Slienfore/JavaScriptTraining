import sli from "../../slien/slien.js"
import {getLoginUser, saveUserInfo} from "../../utils/storage.js"
import DB from "../../static/data/DB.js"
import numBox from "../../slien/components/numBox/numBox.js"

// 初始化
initial()

// 全选或者反选
$('.all-in').on({
    change() {
        const status = $(this).prop('checked')

        // 没有商品, 就不允许勾选
        if (!$('.goods-item').length) return $(this).prop('checked', false)

        if (status) {// 全选
            $(':checkbox').prop('checked', true)
            // 更新数据
            updateData()
        } else {// 反选
            $(':checkbox').prop('checked', false)
            // 更新数据
            updateData()
        }
    }
})

// 单选
$('.goods-item :checkbox').on({
    change() {
        // 更新数据
        updateData()

        const status = $(this).prop('checked')
        // 一个不选, 全选取消
        if (!status) return $('.all-in').prop('checked', false)
    }
})

// 单选框按钮
$('.sli-num-box-add, .sli-num-box-sub').on({
    click() {
        updateData()
    }
})

// 输入
$('.sli-num-box-input').on({
    input() {
        $(this).val() && updateData()
    }
})

// 删除按钮
$('.delete-tag').on({
    click() {
        $.modal({
            content: '您确定要删除该商品吗 ?'
        }).then(({confirm}) => {
            if (!confirm) return

            // 删除单个结点
            deleteSingle($(this).parents('.goods-item'))

            $.message({type: "success", content: '删除成功!'})
        })
    }
})

// 结算
$('.pay-btn').on({
    click() {
        if (!$('.goods-item').length) return $.message({content: '您都没有购买商品....'})

        if (!$('.goods-item :checked').length) return $.message({content: '您没有选中任何商品....'})

        if (!$('.all-in').prop('checked')) {// 不是全选
            // 结算勾选的商品
            $('.goods-item :checked').each(function () {
                const el = $(this).parents('.goods-item')
                const name = el.find('.goods-title').text(), version = el.find('.goods-version').text(),
                    color = el.find('.goods-color').text(),
                    price = el.find('.col-total-price span').text()

                $.modal({
                    type: 'success', title: '待结算商品信息如下👇',
                    content: `您购买的 ${name} ${version}  ${color} 总价格: ${price}`
                }).then(({confirm}) => {
                    if (!confirm) return $.message({content: '取消结算成功'})

                    deleteSingle(el)
                    $.message({type: 'success', content: '结算成功, 预计明天 25:61 送达 ☺'})
                })
            })

            return
        }

        // 全部清空
        $.modal({
            type: 'success', content: '您确定要清空购物车吗 ?',
            confirmText: '是的', cancelText: '不了'
        }).then(({confirm}) => {
            if (!confirm) return

            $('.goods-list').slideUp('swing', function () {
                $(this).empty()
                updateData()
            })
            $.message({type: 'success', content: '预计明天到货哦, 请耐心等待'})
        })
    }
})

// 删除单个商品
function deleteSingle(el) {
    const unique = el.data('unique')

    const user = getLoginUser()

    // 删除
    user.cartList.splice(
        user.cartList.findIndex(item => item.unique === unique), 1)

    saveUserInfo(user)

    // 删除结点
    el.remove()

    // 更新数据
    updateData()
}

// 更新数据
function updateData() {
    checkAllOrNo()

    // 更新 每件商品的小计金额 👇
    $('.goods-item').each(function () {
        $(this).find('.col-total-price span').text(
            parseInt($(this).find('.col-price span').text())
            * parseInt($(this).find('.sli-num-box-input').val())
        )
    })

    // 保存到本地
    saveStorage()

    // 更新总选中商品价格 或者 数量 👇

    // 寻找 勾选 的 商品
    const goods = $(':checked').parents('.goods-item')

    // 没有选中的商品
    if (!goods.length) {
        $('.choose-num .high-light').text(0)
        $('.total-price .high-light').text('0.00')
        return
    }

    let num = 0// 商品选择的数量
    let totalPrice = 0// 总价
    goods.each(function () {
        num += parseInt($(this).find('.sli-num-box-input')
            .val())

        totalPrice += parseInt($(this).find('.col-total-price span')
            .text())
    })

    $('.choose-num .high-light').text(num)
    $('.total-price .high-light').text(totalPrice.toFixed(2))
}

// 商品单个勾选会造成全选
function checkAllOrNo() {
    // 商品数量
    const len = $('.goods-list .goods-item').length
    // 勾选状态的复选框
    const checkedLen = $('.goods-list :checked').length

    // 都为零
    if (!len || !checkedLen) $('.all-in').prop('checked', false)
    else if (len === checkedLen) $('.all-in').prop('checked', true)
}

// 保存用户修改信息
function saveStorage() {
    // 当前用户信息
    const user = getLoginUser()

    if (!$('.goods-item').length) {// 清空
        user.cartList = []
    } else {
        $('.goods-item').each(function () {
            const unique = $(this).data('unique')

            // 是否勾选
            const checked = $(this).find(':checkbox').prop('checked')

            // 数量
            const num = $(this).find('.sli-num-box-input').val()

            // 查找指定商品
            const good = user.cartList.find(item => item.unique === unique)

            good.checked = checked
            good.options.num = parseInt(num)
        })
    }

    // 保存用户信息
    saveUserInfo(user)
}

function initial() {
    sli()
    const user = getLoginUser()

    // 尚未登录
    if (!user) return

    // 设置登录状态
    setLoginStatus(user)
    // 渲染购买记录列表
    user.hasOwnProperty('cartList') && renderGoodsList(user)
    // append 拼接的数据 numBox 无法进行追踪
    numBox()
    // 更新下数据
    updateData()
}

// 设置登录状态
function setLoginStatus({username, avatar}) {
    $('.user-name').text(username)
    $('.user-avatar').attr('src', `../../static/img/avatar/${avatar}`)
}

// 渲染购买记录列表
function renderGoodsList({cartList}) {

    cartList.forEach(item => {
        const {
            id, category, price, checked, unique,
            options: {version, color, num}
        } = item

        const {title, imgs: {preview}} = DB.findGoods(category, id)

        const div = $(`
            <div class="col-wrap goods-item" data-unique="${unique}"">
                <!--复选框-->
                <div class="col-check">
                    <label class="check-label"><input type="checkbox"></label>
                </div>
                <!--预览图-->
                <div class="col-img">
                    <a href="../shopping/shopping.html?category=${category}&productId=${id}">
                        <img src="${preview.src}" alt="${title}">
                    </a>
                </div>
                <!--商品名-->
                <div class="col-name">
                    <a href="../shopping/shopping.html?category=${category}&productId=${id}">
                        <span class="goods-title">${title}</span>
                        <span class="goods-version" style="${!version ? 'display: none;' : ''}">${version}</span>
                        <span class="goods-color">${color}</span>
                    </a>
                </div>
                <!--单价-->
                <div class="col-price">
                    <text>￥</text>
                    <span>${price.toFixed(2)}</span></div>
                <!--numBox-->
                <div class="col-num">
                    <div class="sli-num-box" sli-max-num="99">
                        <button class="sli-num-box-sub">-</button>
                        <input class="sli-num-box-input" type="text" value="${num}">
                        <button class="sli-num-box-add">+</button>
                    </div>
                </div>
                <!--总价-->
                <div class="col-total-price">
                    <text>￥</text>
                    <span>${num * price}</span></div>
                <div class="col-opt"><i class="delete-tag iconfont icon-warn" title="删除商品"></i></div>
            </div>`)

        // 复选框的选中状态
        checked && div.find('.col-check input').prop('checked', true)

        $('.goods-list').append(div)
    })
}
