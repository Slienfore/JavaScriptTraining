import {checkForm} from "../../utils/validate.js"
import {findUserByAccount} from "../../static/data/user/users.js"

$('.login-wrap form').on({
    submit(e) {
        // 收集表单数据
        const collect = $.form().collect(e)

        // 检查表单数据
        if (!checkValidate(collect)) return

        login(collect).then(({content, account}) => {
            $.message({type: 'success', content})
                .then(() => {
                    // 携带参数跳转
                    location.href = `../../index.html?account=${account}`
                })

        }).catch(content => {
            $.message({type: 'warn', content})
        })
    }
})

// 登录
function login(collect) {
    const {
        account: {val: account}, password: {val: password}
    } = collect

    return new Promise((resolve, reject) => {
        // 可换成 axios
        const res = findUserByAccount(account)

        if (!res) {
            reject('用户不存在, 请输入正确的账号...')
            return
        } else if (res.password !== password) {
            reject('密码不正确, 请输入正确的密码重新登录...')
            return
        }

        resolve({
            content: '登录成功',
            account: res.account
        })
    })
}

// 检查表单合法性
function checkValidate(collect) {
    // 检查表单
    const {status, content = ''} = checkForm(collect)

    if (status) return true

    // 验证失败
    $.message({
        type: 'warn',
        duration: 1800,
        content
    })

    return false
}

export default {}
