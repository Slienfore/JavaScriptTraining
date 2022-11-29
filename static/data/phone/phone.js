/*  {
        id: 1,
        title: '',// 商品名称
        desc: '',// 商品描述
        category: 'phone',// 所属分类
        price: 0,// 商品价格
        sale: {// 折扣消息
            desc: '',// 折扣描述
            // 折扣特色
        },
        configure: {// 配置选项
            version: {// 版本
                extra: [],// 附加版本
                sell: []// 预售参数版本
            },
            color: []// 可选颜色
        },
        // 发售价格
        imgs: {// 照片
            preview: {src: ''},// 预览图
            swiper: [// 轮播图片
                {src: ''}
            ]
        }
    }
*/
export const phone = [
    {
        id: 1,
        title: 'Redmi Note 12 5G',
        desc: '三星 OLED 护眼屏｜骁龙 5G 芯｜5000mAh 电量',
        category: 'phone',
        price: 1199,
        sale: {
            desc: '「8GB版本优惠100元」'
        },
        configure: {
            version: {
                extra: ['Note 11 5G'],
                sell: ['4GB+128GB', '6GB+128GB', '8GB+128GB', '8GB+256GB']
            },
            color: ['子夜黑', '浅梦星河', '镜瓷白', '时光蓝']
        },
        imgs: {
            preview: {src: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202210262033_ef39fca0e37395d07682124770fd3ad9.png'},
            swiper: [
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1666797624.80788381.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1666797624.81272158.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1666797624.89518156.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1666797624.82996801.png'}
            ]
        }
    },
    {
        id: 2,
        title: 'Redmi Note 12 Pro',
        desc: 'IMX766 防抖相机｜OLED 柔性直屏｜67W 闪充',
        category: 'phone',
        price: 1899,
        sale: {
            desc: '「256GB版本优惠100元；+150元得小米手环7；+49元得Air2 SE蓝牙耳机」'
        },
        configure: {
            version: {
                extra: ['Redmi Note 12 Pro+'],
                sell: ['6GB+128GB', '8GB+128GB', '8GB+256GB', '12GB+256GB']
            },
            color: ['子夜黑', '时光蓝', '镜瓷白', '浅梦星河']
        },
        imgs: {
            preview: {src: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202210262012_94dd4ca657adcebec0d11ea09dac8a03.png'},
            swiper: [
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1666798007.23549518.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1666798004.77398076.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1666798007.21926066.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1666798007.29529021.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1666798007.38879135.png'}
            ]
        }
    },
    {
        id: 3,
        title: 'Redmi Note 12 Pro+',
        desc: '2亿超清防抖相机｜OLED 柔性直屏',
        category: 'phone',
        price: 2299,
        sale: {
            desc: '「至高优惠100元，到手价仅2099元起（探索版、潮流版除外）」'
        },
        configure: {
            version: {
                extra: ['Redmi Note 12 Pro'],
                sell: ['12GB+256GB', '8GB+256GB']
            },
            color: ['子夜黑', '时光蓝', '镜瓷白', 'Redmi Note 12 潮流版', 'Redmi Note 12 探索版']
        },
        imgs: {
            preview: {src: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202210262024_83bfd34bb3f733d69d342acaf34aea58.png'},
            swiper: [
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1666797733.13495724.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1666797733.26868783.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1666797733.09869987.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1666797733.14855722.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1666797733.14965764.png'}
            ]
        }
    },
    {
        id: 4,
        title: 'Redmi Note 11 5G',
        desc: '双卡双5G | X轴线性马达 | 5000mAh 大电量 | 33W快充 | 立体声双扬声器 | 天玑810处理器 | 90Hz变速高刷屏',
        category: 'phone',
        price: 1199,
        sale: {
            desc: '「领北京绿色节能消费券，再优惠100元（仅限北京地区）」'
        },
        configure: {
            version: {
                extra: ['Note 10 5G'],
                sell: ['4GB+128GB', '6GB+128GB', '8GB+128GB', '8GB+256GB']
            },
            color: ['神秘黑境', '微醺薄荷', '浅梦星河', '微光晴蓝']
        },
        imgs: {
            preview: {src: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/50da95e9e4496dcac8704da2deb94f6e.jpg'},
            swiper: [
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1663832685.29741988.jpg'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1666797733.14965764.png'}
            ]
        }
    },
    {
        id: 5,
        title: 'Redmi K50',
        desc: '天玑8100｜67W快充｜5500mAh大电池｜2K超清直屏｜像素加倍｜清晰加倍｜VC液冷散热｜OIS光学防抖｜杜比视界｜索尼4800万像素相机',
        category: 'phone',
        price: 2099,
        sale: {
            desc: '「领券至高优惠330元，券后到手价2069元起；抢北京绿色节能消费券至高再优惠200元（限北京地区使用）」'
        },
        configure: {
            version: {
                extra: ['Redmi K50 电竞版'],
                sell: ['8GB+128GB', '8GB+256GB', '12GB+256GB', '12GB+512GB']
            },
            color: ['墨羽', '幻镜', '幽芒', '银迹', '晴雪']
        },
        imgs: {
            preview: {src: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/28c14106b688ac7ae88e761564789b37.jpg'},
            swiper: [
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1647430875.2472840.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1647430875.2747436.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1647430875.297686.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1647430875.28152009.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1647430875.30958231.png'}
            ]
        }
    },
    {
        id: 6,
        title: 'Redmi Note 11T Pro系列',
        desc: 'Redmi Note 11 Pro 系列',
        category: 'phone',
        price: 1799,
        sale: {
            desc: '「领北京绿色节能消费券，再优惠100元（仅限北京地区）」'
        },
        configure: {
            version: {
                extra: ['Redmi Note 11 Pro 系列'],
                sell: ['6GB+128GB', '8GB+512GB', '8GB+256GB', '8GB+128GB']
            },
            color: ['原子银', '子夜黑', '时光蓝', '奶盐白']
        },
        imgs: {
            preview: {src: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5713971c4bb6512743dfd06023080268.png'},
            swiper: [
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1660632372.6792787.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1660632411.57468398.png'}
            ]
        }
    },
    {
        id: 7,
        title: 'Xiaomi 12S Pro',
        desc: '骁龙8+ 旗舰处理器 | 徕卡光学镜头 | 徕卡原生双画质 | 徕卡水印、大师镜头包 | 全场景疾速抓拍 | 5000万三主摄 | 小米自研澎湃P1芯片 | 120W小米澎湃秒充 | 4600mAh大电量 | 2K AMOLED屏',
        category: 'phone',
        price: 5099,
        sale: {
            desc: '「11月21日-11月30日，全版本优惠300元，购机享24期免息」'
        },
        configure: {
            version: {
                extra: ['Xiaomi 12S Ultra', 'Xiaomi 12S', 'Xiaomi 12 Pro 天玑版'],
                sell: ['8GB+128GB', '8GB+256GB', '12GB+256GB', '12GB+512GB']
            },
            color: ['白色', '黑色', '原野绿', '紫色']
        },
        imgs: {
            preview: {src: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202207012000_0b9df066c110f201154013ac373df1d9.png'},
            swiper: [
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1656916272.35595122.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1656916272.28414680.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1656916271.25361393.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1656916272.32054398.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1656916272.366988.png'}
            ]
        }
    },
    {
        id: 8,
        title: 'Redmi K50 至尊版',
        desc: '骁龙8+「狂暴调校」｜ 定制 1.5K 旗舰直屏 ｜ 120W神仙秒充丨1 亿像素光学防抖相机｜ 电竞级 VC 散热 | 屏下指纹',
        category: 'phone',
        price: 2799,
        sale: {
            desc: '「享6期分期免息；12+512GB券后到手价3469元；12+256GB券后到手价3169元」'
        },
        configure: {
            version: {
                extra: ['Redmi K50 Pro'],
                sell: ['8GB+128GB', '8GB+256GB', '12GB+256GB', '12GB+512GB']
            },
            color: ['雅黑', '银迹', '冰蓝']
        },
        imgs: {
            preview: {src: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202208101511_488638d8f8d5dbcf3b66cd82703ecfb9.png'},
            swiper: [
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1660117297.65076315.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1660117297.65685839.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1660117297.64533728.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1660117297.72185183.png'},
                {src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1660117297.62428910.png'}
            ]
        }
    }
]

// 根据 ID 查找手机信息
export const findPhoneById = id => phone.find(item => item.id === id)
