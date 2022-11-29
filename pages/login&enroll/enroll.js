import {checkForm} from "../../utils/validate.js"

$('.enroll-wrap form').on({
    submit(e) {
        // 收集表单数据
        const collect = $.form().collect(e)

        // 检查表单数据
        if (!checkValidate(collect)) return

        $.message({type: 'success', content: '注册成功...'})
            .then(() => {
                const {account: {val: account}, username: {val: username}} = collect

                // 携带参数跳转
                location.href = `../../index.html?account=${account}&username=${username}`
            })
    }
})

// 检查表单合法性
function checkValidate(collect) {
    // 检查表单
    const {status, content = ''} = checkForm(collect)

    if (status) return true

    // 验证失败
    $.message({type: 'warn', duration: 1800, content})

    return false
}

export default {}
