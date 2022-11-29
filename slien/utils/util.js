import {styleTypes} from "../config/config.js";

// 检查是否包含样式类型(不包含则使用默认值)
export const checkOrDefaultStyleType = type => styleTypes.includes(type) ? type : 'info'

// 设置 CSS 变量的值
export const setCssProperty = (el, options) => {
    // 转换为 DOM
    const dom = el[0]

    Object.keys(options).forEach(key => {
        dom.style.setProperty(key, options[key])
    })
}

// 获取 CSS 变量的值
export const getCssProperty = (el, key) => {
    // 转换成 DOM
    const dom = el[0]
    return getComputedStyle(dom).getPropertyValue(key)
}

// 获取随机数
export const random = (min, max) => Math.random() * (max - min + 1) + min
