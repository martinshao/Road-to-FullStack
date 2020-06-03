function createUser(user) {
    return {
        ...user,
        id: Date.now(),
        createAt: new Date(),
        updateAt: new Date()
    }
}

function updateUser(user) {
    return {
        ...user,
        updateAt: new Date()
    }
}

module.exports = {
    createUser,
    updateUser,
}