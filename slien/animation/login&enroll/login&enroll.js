// 登录与注册页面旋转动画
export const loginAndEnrollRotate = target => {
    // 切换关系
    const mapping = {
        // 用户登录 到 注册(正 => 右)
        loginToEnroll: {
            '.enroll-wrap': 'rotateEnter-FromRight',
            '.login-wrap': 'rotateOut-to-right'
        },
        // 注册 到 用户登录 (右 => 正)
        enrollToLogin: {
            '.enroll-wrap': 'rotateOut-to-right',
            '.login-wrap': 'rotateEnter-FromRight'
        },
        // 用户登录 到 其它(正 => 左)
        loginToOther: {
            '.other-wrap': 'rotateEnter-FromLeft',
            '.login-wrap': 'rotateOut-to-left'
        },
        // 其它 到 用户登录(左 => 正)
        otherToLogin: {
            '.other-wrap': 'rotateOut-to-left',
            '.login-wrap': 'rotateEnter-FromLeft'
        }
    }

    return new Promise(resolve => {
        const opt = mapping[target]
        Object.keys(opt).forEach(el => {// 遍历 remove, add 操作
            // 清除动画相关 class
            $(el).attr('class').split(' ')
                .filter(str => str.startsWith('rotate'))// 过滤相关 class
                .forEach(val => $(el).removeClass(val))// 移除

            $(el).addClass(opt[el])// 触发动画
        })

        setTimeout(() => {
            resolve()
        }, 800)// 动画时长
    })
}
