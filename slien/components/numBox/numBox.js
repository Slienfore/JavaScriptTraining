export default () => {
    $('.sli-num-box').each(function () {
        const input = $(this).find('.sli-num-box-input')
        const subBtn = $(this).find('.sli-num-box-sub')
        const addBtn = $(this).find('.sli-num-box-add')

        const prop = {
            min: parseInt(input.attr('sli-min-num')) || 1,
            max: parseInt(input.attr('sli-max-num')) || 99
        }

        input.on({
            input() {
                // 清除所有值 ''
                if (!$(this).val().trim()) return

                // 截取了数字开头
                let val = parseInt($(this).val()) || prop.min

                val = Math.max(val, prop.min)
                val = Math.min(val, prop.max)

                $(this).val(val)
            },
            blur() {
                // 截取了数字开头
                let val = parseInt($(this).val()) || prop.min

                val = Math.max(val, prop.min)
                val = Math.min(val, prop.max)

                $(this).val(val)
            }
        })

        subBtn.on({
            click() {
                let val = parseInt(input.val())
                val = Math.max(val - 1, prop.min)
                input.val(val)
            }
        })

        addBtn.on({
            click() {
                let val = parseInt(input.val())
                val = Math.min(val + 1, prop.max)
                input.val(val)
            }
        })
    })
}
