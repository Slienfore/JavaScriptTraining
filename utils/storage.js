// 从 本地存储中 获取数据
export const getItem = key => JSON.parse(localStorage.getItem(key))

// 将数据存放到 本地储存 中
export const setItem = (key, val) => localStorage.setItem(key, JSON.stringify(val))

// 获取 当前登录 的用户
export const getLoginUser = (href = '../login&enroll/login&enroll.html') => {
    const account = getItem('loginUser')

    if (!account) {
        $.modal({
            type: 'warn', content: '您尚未进行登录哦, 是否前往登录页面?'
        }).then(res => {
            if (res.confirm) location.href = href
        })
        return null
    }

    const users = getItem('users') || []

    return users.find(user => user.account === account)
}

// 保存 用户信息
export const saveUserInfo = user => {
    // 所有用户列表
    const users = getItem('users')

    // 将其进行替换
    users.splice(
        users.findIndex(obj => obj.account === user.account), 1,
        user
    )

    setItem('users', users)
}
