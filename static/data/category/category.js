import {phone} from "../phone/phone.js"
import {earphone} from "../earphone/earphone.js"
import {television} from "../television/television.js"
import {appliance} from "../appliance/appliance.js"
import {laptop} from "../laptop/laptop.js"
import {life} from "../life/life.js"
import {intelligence} from "../intelligence/intelligence.js"

/*  {
        id: 1, title: '手机', icon: 'phone',
        href: 'javascript:;',// 一级菜单跳转页面
        subCategory: {// 二级菜单
            data: phone// 二级菜单数据
        }
    }*/
export default [
    {
        id: 1, title: '手机', icon: 'phone',
        href: 'javascript:;',
        subCategory: {
            data: phone
        }
    },
    {
        id: 2, title: '耳机', icon: 'earphone',
        href: 'javascript:;',
        subCategory: {
            data: earphone
        }
    },
    {
        id: 3, title: '电视', icon: 'television',
        href: 'javascript:;',
        subCategory: {
            data: television
        }
    },
    {
        id: 4, title: '家电', icon: 'appliance',
        href: 'javascript:;',
        subCategory: {
            data: appliance
        }
    },
    {
        id: 5, title: '笔记本', icon: 'laptop',
        href: 'javascript:;',
        subCategory: {
            data: laptop
        }
    },
    {
        id: 6, title: '生活', icon: 'life',
        href: 'javascript:;',
        subCategory: {
            data: life
        }
    },
    {
        id: 7, title: '智能', icon: 'intelligence',
        href: 'javascript:;',
        subCategory: {
            data: intelligence
        }
    }
]
