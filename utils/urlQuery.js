// 获取单个 url 参数
export const getQueryString = (name) => {
    // 截取 ?
    const query = location.search.substring(1)

    // 匹配情况 name=val(只有一个参数) | &name=val&(中间参数) | &name=val(多个参数的最后一个)
    // [^&]* 匹配不是 & 的所有字符
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    const match = query.match(reg)

    return !match ? null : match[2]
}

// 获取所有路径参数
export const getAllQuery = () => {
    // 截取 ?
    const query = location.search.substring(1)

    const querySearch = new URLSearchParams(query)

    return Object.fromEntries(querySearch.entries())
}

// 获取指定 url 参数
export const getQuery = tar => {
    const all = getAllQuery()
    return all.hasOwnProperty(tar) ? all[tar] : null
}
