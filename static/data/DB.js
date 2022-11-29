import notice from "./notice/notice.js"
import swiper from "./swiper/swiper.js"
import {findUserByAccount} from "./user/users.js"
import secKill from "./secKill/secKill.js"
import mainNav from "./mainNav/mainNav.js"
import category from "./category/category.js"
import {findPhoneById, phone} from "./phone/phone.js"
import {findEarphoneById, earphone} from "./earphone/earphone.js"
import {findLaptopById, laptop} from "./laptop/laptop.js"
import {findApplianceById, appliance} from "./appliance/appliance.js"
import {findLifeById, life} from "./life/life.js"
import {findTelevisionById, television} from "./television/television.js"
import {findIntelligenceById, intelligence} from "./intelligence/intelligence.js"

// 根据 分类 && id 进行查找商品内容
const findGoods = (category, id) => {
    id = parseInt(id)

    switch (category) {
        case 'phone' :
            return findPhoneById(id)
        case 'earphone' :
            return findEarphoneById(id)
        case 'laptop' :
            return findLaptopById(id)
        case 'appliance' :
            return findApplianceById(id)
        case 'life' :
            return findLifeById(id)
        case 'intelligence' :
            return findIntelligenceById(id)
        case 'television' :
            return findTelevisionById(id)
    }
}

export default {
    // 所有数据
    allData: [...phone, ...earphone, ...laptop, ...appliance, ...life, ...intelligence, ...television],
    // 根据分类 以及 id 查找商品
    findGoods,
    // 轮播图
    swiper,
    // 滚动文字通知
    notice,
    // 根据用户账号搜索用户信息
    findUserByAccount,
    // 显示秒杀商品
    secKill,
    // 主区域导航栏
    mainNav,
    // 商品分类
    category,
    // 手机
    phone,
    findPhoneById,
    // 耳机
    earphone,
    findEarphoneById,
    // 电脑
    laptop,
    findLaptopById,
    // 生活
    life,
    findLifeById,
    // 家电
    appliance,
    findApplianceById,
    // 智能
    intelligence,
    findIntelligenceById,
    // 电视
    television,
    findTelevisionById
}
