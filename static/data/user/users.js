const users = [
    {
        id: 1, account: '18316127736', password: '3306',
        username: 'Slienfore', avatar: 'balloon.jpg'
    },
    {
        id: 2, account: '17832998671', password: '3306',
        username: 'alias', avatar: 'slienfore.jpg'
    },
    {
        id: 3, account: '13666666666', password: '3306',
        username: 'porn', avatar: 'down.jpg'
    }
]

// 根据账户寻找用户
export const findUserByAccount = account => users.find(item => item.account === account)
