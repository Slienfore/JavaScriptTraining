import DB from "../../static/data/DB.js"

export default () => {
    // 输入
    $('.search-input').on({
        focus() {
            searchItem()
        },
        input() {
            searchItem()
        }
    })

    // 清除
    $('.sli-input-clear').on({
        click() {
            optDisplay('none')
        }
    })

    // 搜索按钮
    $('.search-btn').on({
        click() {
            const hasRes = searchItem()

            $.message({
                type: hasRes ? 'success' : 'warn',
                content: hasRes ? '搜索成功, 商品如下...' : '没有对应的商品哦...',
                duration: 2500
            })
        }
    })
}

// 控制搜索内容 显示还是隐藏
const optDisplay = opt => {
    switch (opt) {
        case 'none':// 隐藏
            $('.search-wrap').stop().slideUp(() => {// 防止突然间清空
                // 清空
                $('.search-suggest').empty()
            })
            break
        case 'show':// 显示
            $('.search-wrap').stop().slideDown(() => {
                // slideDown => 控制 height => 那么就会把高度写死
                $('.search-wrap').css({height: 'auto'})
            })
            break
    }
}

function searchItem() {
    const key = $('.search-input').val().trim();

    // 没有输入内容
    if (!key) {
        optDisplay('none')
        return false
    }

    // 根据指定输入内容, 查询数据
    const res = searchGoodsItem(key, 10)

    // 没有数据 => 隐藏
    if (!res.length) {
        optDisplay('none')
        return false
    }

    createDom(res)
    optDisplay('show')

    return true
}

// 搜索相关信息
function searchGoodsItem(key, limit) {
    const res = []

    DB.allData.forEach(item => {
        const {id, title, desc, category} = item

        // 只对 商品名称、 商品详情进行搜索
        const common = {
            title: longestContinuousCommonSubstring(key, title),
            desc: longestContinuousCommonSubstring(key, desc),
        }

        // 没有公共部分 (title || desc 只要有一个匹配)
        if (!common.title && !common.desc) return

        /**
         * 将 '公共部分'(高亮显示) 与 '非公共部分' 进行切割
         * => 若没有 公共切割位置(subPos === null)
         *          -> 没有 公共部分
         * => 若 公共切割位置起点(subPos.orin) 为 母串(str)起点(0)
         *          -> 高亮部分蔓延到起点, 没有前缀(pre)
         * => 高亮部分切割位置(main)
         *          -> [orin, end + 1]
         * => 若 公共切割位置终点(subPos.end) 为 母串(str)终点(length - 1)
         *          -> 高亮部分蔓延到终点, 没有后缀(suf)
         * @param str 母串
         * @param subPos '公共部分'切割位置
         * @returns {{pre: (null|string), main: string, suf: (null|string)}|null}
         */
        const acs = (str, subPos) => {
            if (!subPos) return null // 没有匹配公共子串

            return {
                pre: subPos.orin === 0 ? null// 没有前缀
                    : str.substring(0, subPos.orin),

                // 高亮部分
                main: str.substring(subPos.orin, subPos.end + 1),

                suf: subPos.end === str.length - 1 ? null// 没有后缀
                    : str.substring(subPos.end + 1, str.length + 1)
            }
        }

        res.push({
            id, category,
            access: {// 切割过后的字符串
                title: acs(title, common.title),
                desc: acs(desc, common.desc)
            },
            origin: {
                title, desc
            }
        })
    })

    // 对于强调部分进行排序, 强调部分 最长的 靠前(降序)
    res.sort((suf, cur) => {
        const {title: sufTitle, desc: sufDesc} = suf.access
        const {title: curTitle, desc: curDesc} = cur.access

        // title && desc 两者之间 必定会 有一个不为空 => (只有匹配到公共子串, 才会显示到搜索内容上)

        /**
         * 比较 商品名(title) && 商品描述(desc) '强调部分' 的 长度 => 为排序规则做准备
         * => 若 商品名(title) 为 空
         *          -> 最大值(max) 归属 商品描述(desc), 权值(weight) 归属 商品描述(desc), 没有最小值(min)(为 0)
         * => 若 描述名(desc) 为 空
         *          -> 最大值(max) 归属 商品名(title),  权值(weight) 归属 商品名(title), 没有最小值(min)(为 0)
         * => 若 商品名(title) && 商品描述(desc) 不为 空
         *          -> 权值(weight)、最大值(max)归属 两个中 '最长' 的部分, 最小值(min)归属两个中 '最短' 的部分
         * @param title 商品名
         * @param desc 商品描述
         * @returns {{min: number, max: number, weight: string}}
         */
        const findMax = (title, desc) => {
            return $.isEmptyObject(title) ?
                // title 为空, 返回 desc
                ({
                    weight: 'desc',
                    max: desc.main.length,
                    min: 0
                })
                // title 不为空
                :
                (
                    $.isEmptyObject(desc) ?
                        // desc 为空, 返回 title
                        ({
                            weight: 'title',
                            max: title.main.length,
                            min: 0
                        })
                        :
                        // 此时 desc && title 都不为空 => 两者之间的最大值进行比较
                        ({
                            weight: title.main.length >= desc.main.length ? 'title' : 'desc',// === 商品名称的权值最大
                            max: Math.max(title.main.length, desc.main.length),
                            min: Math.min(title.main.length, desc.main.length)
                        })
                )
        }

        // 降序(拥有 '最长'强调部分 靠前) 当前值 >= 后者 => 占领该位置 排序规则 为 ' 1 '
        const {weight: curWeight, max: curMax, min: curMin} = findMax(curTitle, curDesc),
            {weight: sufWeight, max: sufMax, min: sufMin} = findMax(sufTitle, sufDesc)

        return curWeight === sufWeight ?// => 比较权值
            // 权值相同
            (
                // 长度相同
                curMax !== sufMax ?
                    // 最长 靠前
                    (
                        curMax >= sufMax ? 1 : -1
                    )
                    :
                    // 比较 '两者最小值' 中 的 最大值靠前
                    (
                        curMin >= sufMin ? 1 : -1
                    )
            )
            :
            // 权值不相同
            (
                // 比较长度
                curMax === sufMax ?
                    // 长度相同 => 比较权值
                    (
                        // 当前值 权值为 'title' => 靠前(排序规则为 ' 1 ')
                        curWeight === 'title' ? 1
                            :
                            (
                                // 后者值 权值为 'title' => 靠前(后者靠前, 排序规则为 ' -1 ')
                                sufWeight === 'title' ? -1 : 1
                            )
                    )
                    :
                    // 长度不相同
                    (
                        // 最长 靠前
                        curMax >= sufMax ? 1 : -1
                    )
            )
    })

    // 截取结果
    return res.length >= limit ? res.slice(0, limit) : res
}

/**
 * 最长连续公共子串
 * @param str1 子串
 * @param str2 母串
 * @returns {{end: number, orin: number}|null}
 */
function longestContinuousCommonSubstring(str1, str2) {
    if (!str1 || !str2) return null

    const len1 = str1.length, len2 = str2.length

    // dp: 以当前字符结尾 的 连续公共子串子串的长度 dp[j] = dp[j - 1] + 1
    // 使用 max 记录 dp 答案
    const dp = new Array(len2 + 1).fill(0)// 滚动数组(不连续需要清除状态, 否则继承)

    let max = 0, end = 0;
    for (let i = 0; i < len1; ++i) {
        for (let j = len2; j > 0; --j) {// 从右往左, 防止状态覆盖 '母串' 上一个 字符的公共子串长度
            if (str1[i] === str2[j - 1]) {
                dp[j] = dp[j - 1] + 1// 母串当前字符 上一个字符 的 连续公共子串长度
            } else {
                dp[j] = 0// 若不相同, 则清除状态(此时 母串 与 子串 已经 不再连续了)
            }

            if (dp[j] > max) {
                max = dp[j]
                end = j
            }
        }
    }

    return max ? {
        orin: (end - 1) - max + 1,
        end: end - 1
    } : null
}

// 创建结点
function createDom(items) {
    // 清空之前的搜索
    $('.search-suggest').empty()

    items.forEach(item => {
        const {id, category, access, origin} = item

        const li = $(`
            <li class="suggest-item">
                <a href="pages/shopping/shopping.html?category=${category}&productId=${id}" 
                   target="_blank"></a>
            </li>
`)
        $('.search-suggest').append(li)

        const a = li.find('a')
        li.append(a)

        const {title, desc} = access

        // 渲染 商品名称、商品信息
        const render = (acsObj, Class = '') => {
            if (!acsObj) {// 如果尚未经过加工, 就使用原来的(title, desc => 之中必有一个匹配项)
                a.append($(`<text class="${Class}">${Class === '' ? origin.title : origin.desc}</text>`))
                return
            }

            // 前缀
            if (acsObj.pre) a.append($(`<text class="${Class}">${acsObj.pre}</text>`))
            // 高亮
            if (acsObj.main) a.append($(`<text class="high-light ${Class}">${acsObj.main}</text>`))
            // 后缀
            if (acsObj.suf) a.append($(`<text class="${Class}">${acsObj.suf}</text>`))
        }

        render(title)// 渲染商品名称
        render(desc, 'sale-desc')// 渲染商品介绍
    })
}
