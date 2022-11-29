// 表单相关映射
const inputNameMap = {
    account: '账号', password: '密码',
    username: '用户名',
    prePassword: '第一次输入密码', sufPassword: '第二次输入密码'
}

// 检查是否为空值
const checkValNull = val =>
    val === undefined || val === ''
    || !val.length || !val.toString().trim().length

// 检查账户(手机号)
// 1 开头, 第2个为指定数字, 后面 9 个是数字
const checkAccount = val => /^1[3|4|5|7|8]\d{9}$/.test(val)

// 检查表单的值
export function checkForm(collect) {
    try {
        Object.keys(collect).forEach(key => {
            // 只检查 映射有的
            if (!inputNameMap.hasOwnProperty(key)) return

            const $this = collect[key]

            // 值为空
            if (checkValNull($this.val)) {
                $this.el.focus()// 获取焦点 要求用户重新输入
                throw new Error(`${inputNameMap[key]} 的值为空, 请您输入...`)
            }

            // 此时已经验证完是否为空了, 可以 trim
            const val = $this.val.trim()
            switch (key) {
                case 'account':
                    // 位数不对
                    if (val.length !== 11) throw new Error(`${inputNameMap[key]} 的位数不正确, 是您的手机号哦(11位)`)
                    // 账号不对
                    if (!checkAccount(val)) throw new Error(`${inputNameMap[key]} 的格式不正确, 请您检查格式是否正确哦`)
                    break
                case 'password':
                    // todo 密码以后再检查
                    break
                case 'prePassword':
                    // todo 密码以后再检查
                    break
                case 'sufPassword':
                    if (val !== collect['prePassword'].val.trim()) throw new Error(`${inputNameMap['prePassword']} 与 ${inputNameMap[key]} 的不一样, 请您检查密码一致性...`)
                    break
            }
        })
    } catch (e) {
        return {status: false, content: e.message}
    }

    return {status: true, content: '验证成功'}
}
