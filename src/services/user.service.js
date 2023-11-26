import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USER_DB = 'user'


export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    getEmptyUser
}

window.userService = userService

_createUsers()

function getUsers() {
    return storageService.query(STORAGE_KEY_USER_DB)
}

async function getById(userId) {
    const user = await storageService.get(STORAGE_KEY_USER_DB, userId)
    return user
}

function remove(userId) {
    return storageService.remove(STORAGE_KEY_USER_DB, userId)
}

async function update(userToUpdate) {
    const user = await getById(userToUpdate.id)
    console.log('user', user)

    const updatedUser = await storageService.put(STORAGE_KEY_USER_DB, { ...user, ...userToUpdate })
    if (getLoggedinUser().id === updatedUser.id) saveLocalUser(updatedUser)
    return updatedUser
}

async function login(userCred) {
    const users = await storageService.query(STORAGE_KEY_USER_DB)
    const user = users.find(user => user.username === userCred.username)
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    userCred.balance = 10000
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

// function getEmptyUser() {
//     return {
//         username: '',
//         fullname: '',
//         password: '',
//         imgUrl: '',
//     }
// }

function getEmptyUser() {
    return {
        username: '',
        password: '',
        fullname: '',
        imgUrl: '',
        following: [
            {
                _id: '',
                fullname: '',
                imgUrl: ''
            }
        ],
        followers: [
            {
                _id: '',
                fullname: '',
                imgUrl: ''
            }
        ],
        savedStoryIds: [] // even better - use mini-story
    }
}



function saveLocalUser(user) {
    user = { id: user.id, fullname: user.fullname, imgUrl: user.imgUrl, balance: user.balance }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


async function _createUsers() {
    try {
        const users = await getUsers()
        if (!users || !users.length) {
            users = [{
                _id: "u101",
                username: "Muko",
                password: "mukmuk",
                fullname: "Muki Muka",
                imgUrl: "http://some-img",
                following: [
                    {
                        _id: "u106",
                        fullname: "Dob",
                        imgUrl: "http://some-img"
                    }
                ],
                followers: [
                    {
                        _id: "u105",
                        fullname: "Bob",
                        imgUrl: "http://some-img"
                    }
                ],
                savedStoryIds: ["s104", "s111", "s123"] // even better - use mini-story
            },
            {
                _id: "u102",
                username: "Nata",
                password: "Nata",
                fullname: "Nat Gr",
                imgUrl: "http://some-img",
                following: [
                    {
                        _id: "u106",
                        fullname: "Dob",
                        imgUrl: "http://some-img"
                    }
                ],
                followers: [
                    {
                        _id: "u105",
                        fullname: "Bob",
                        imgUrl: "http://some-img"
                    }
                ],
                savedStoryIds: ["s104", "s111", "s123"] // even better - use mini-story
            }
            ]
        }

        await storageService.put(STORAGE_KEY_USER_DB, users)

    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    }


}