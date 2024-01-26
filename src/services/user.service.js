import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

//const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser"
 const STORAGE_KEY_USER_DB = 'user'
const STORAGE_KEY = "users"

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  // update,
  getEmptyUser,
  getUserLogin,
  getByUserName,
}

window.userService = userService

_createUsers()
//_creatUserConnected()

function getUsers() {
  return storageService.query(STORAGE_KEY)
}

function getUserLogin() {
  return storageService.query(STORAGE_KEY_USER_DB)
}

async function getById(userId) {
  const user = await storageService.get(STORAGE_KEY, userId)
  return user
}

async function getByUserName(username) {
  const user = await storageService.getName(STORAGE_KEY, username)
  return user
}

function remove(userId) {
  return storageService.remove(STORAGE_KEY, userId)
}

// async function update(userToUpdate) {
//     const user = await getById(userToUpdate.id)

//     const updatedUser = await storageService.put(STORAGE_KEY_USER_DB, { ...user, ...userToUpdate })
//     if (getLoggedinUser().id === updatedUser.id) saveLocalUser(updatedUser)
//     return updatedUser
// }

async function login(userCred) {
  const users = await storageService.query(STORAGE_KEY)
  const user = users.find((user) => user.username === userCred.username)
debugger
  if (user) {
    if (user.password === userCred.password) return saveLocalUser(user)
    else throw new Error("Sorry, your password was incorrect. Please double-check your password.")
  }
   else {
    console.log('Cannot login service')
    throw new Error("user name is wrong")
   }
}

async function signup(userCred) {
  // userCred.balance = 10000
  if (!userCred.imgUrl)
    userCred.imgUrl =
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
  const user = await storageService.post("user", userCred)
  return saveLocalUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_USER_DB)
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
    username: "",
    password: "",
    fullname: "",
    imgUrl: "",
    createdAt: "",
    following: [
      {
        _id: "",
        fullname: "",
        imgUrl: "",
      },
    ],
    followers: [
      {
        _id: "",
        fullname: "",
        imgUrl: "",
      },
    ],
    savedStoryIds: [], // even better - use mini-story
  }
}

function saveLocalUser(user) {
  const userSave = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    username: user.username
  }
  utilService.saveToStorage(STORAGE_KEY_USER_DB, userSave)
 // sessionStorage.setItem(STORAGE_KEY_USER_DB, JSON.stringify(user))
  return userSave
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_USER_DB))
}

function _creatUserConnected() {
  try {
    let user = utilService.loadFromStorage(STORAGE_KEY_USER_DB)
    if (!user || !user.length) {
      user = {
        _id: "u104",
        username: "Moro_loki",
        password: "123456",
        fullname: "Mori Loki",
        imgUrl:
          "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660825/I_Am_Far_From_Perfect_But_I_Will_Try_My_Best_To_Be_A_Good_Girlfriend_xqo29a.jpg",
        following: [
          {
            _id: "u106",
            fullname: "Dob",
            imgUrl: "http://some-img",
          },
        ],
        followers: [
          {
            _id: "u105",
            fullname: "Bob",
            imgUrl: "http://some-img",
          },
        ],

        savedStoryIds: ["s104", "s111", "s123"], // even better - use mini-story
      }
    }

    utilService.saveToStorage(STORAGE_KEY_USER_DB, user)
  } catch (err) {
    console.log("UserActions: err in loadUser connected", err)
  }
}

function _createUsers() {
  try {
    let users = utilService.loadFromStorage(STORAGE_KEY)
    if (!users || !users.length) {
      users = [
        {
          _id: "u101",
          username: "Betty_Mardov5",
          password: "123456",
          fullname: "Betty Mardov",
          imgUrl:
            "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660011/These_are_the_10_sexiest_countries_in_the_world_d4c7sg.jpg",
          following: [
            {
              _id: "u106",
              fullname: "Dob",
              imgUrl: "http://some-img",
            },
          ],
          followers: [
            {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img",
            },
          ],
          savedStoryIds: ["s104", "s111", "s123"], // even better - use mini-story
        },
        {
          _id: "u102",
          username: "karinNess",
          password: "123456",
          fullname: "Karin Ness",
          imgUrl:
            "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660150/How_to_Swap_Your_Beauty_Staples_for_Clean_Alternatives_That_Really_Work_i8p7au.jpg",
          following: [
            {
              _id: "u106",
              fullname: "Dob",
              imgUrl: "http://some-img",
            },
          ],
          followers: [
            {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img",
            },
          ],
          savedStoryIds: ["s104", "s111", "s123"], // even better - use mini-story
        },
        {
          _id: "u103",
          username: "guy_colin10",
          password: "123456",
          fullname: "Guy Colin",
          imgUrl:
            "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660259/Fall_Outfits_for_Men_17_Casual_Fashion_Ideas_This_Fall_ht0sqt.jpg",
          following: [
            {
              _id: "u106",
              fullname: "Dob",
              imgUrl: "http://some-img",
            },
          ],
          followers: [
            {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img",
            },
          ],
          savedStoryIds: ["s104", "s111", "s123"], // even better - use mini-story
        },
        {
          _id: "u104",
          username: "Moro_loki",
          password: "123456",
          fullname: "Mori Loki",
          imgUrl:
            "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660825/I_Am_Far_From_Perfect_But_I_Will_Try_My_Best_To_Be_A_Good_Girlfriend_xqo29a.jpg",
          following: [
            {
              _id: "u106",
              fullname: "Dob",
              imgUrl: "http://some-img",
            },
          ],
          followers: [
            {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img",
            },
          ],

          savedStoryIds: ["s104", "s111", "s123"], // even better - use mini-story
        },
        {
          _id: "u105",
          username: "gal1234",
          password: "123456",
          fullname: "Gal chen",
          imgUrl:
            "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660678/Moodboard_09_20__Warm_September_Neutrals_yvnuka.jpg",
          following: [
            {
              _id: "u106",
              fullname: "Dob",
              imgUrl: "http://some-img",
            },
          ],
          followers: [
            {
              _id: "u1055",
              fullname: "Bob",
              imgUrl: "http://some-img",
            },
          ],

          savedStoryIds: ["s104", "s111", "s123"], // even better - use mini-story
        },
      ]
    }

    utilService.saveToStorage(STORAGE_KEY, users)
  } catch (err) {
    console.log("UserActions: err in loadUsers", err)
  }
}
