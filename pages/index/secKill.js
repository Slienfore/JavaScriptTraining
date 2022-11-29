export default (end = new Date(new Date().setHours(// 默认时间是当前时间两小时后
    new Date().getHours() + 2
))) => {
    const fmt = val => (val = parseInt(val)) >= 10 ? val : '0' + val
    // 标明是几点场秒杀
    $('.sec-kill-desc-wrap>strong').text(
        `${fmt(end.getHours())}:${fmt(end.getMinutes())}`
    )

    let hh = '', mm = '', ss = ''

    countDown()// 初始化一次
    const timer = setInterval(countDown, 1000)

    function countDown() {
        // 当前时间戳
        const now = new Date().getTime()
        // 时间差值(毫秒 => 秒)
        const diff = parseInt((end - now) / 1000)

        if (diff <= 0) {// 秒杀结束
            $('.sec-kill-desc-wrap>strong').text('')
            $('.sec-kill-desc-wrap>span').text('秒杀已经结束了哦')
            hh = mm = ss = '00'
            clearInterval(timer)
        } else {
            hh = fmt((diff / (60 * 60)) % 24)// 一小时 3600s
            mm = fmt((diff / 60) % 60)// 一分钟 60s
            ss = fmt(diff % 60)
        }

        $('.sec-kill-hh').text(hh)
        $('.sec-kill-mm').text(mm)
        $('.sec-kill-ss').text(ss)
    }
}
