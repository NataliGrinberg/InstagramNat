import { storageService } from "./async-storage.service"
import { uploadService } from "./upload.service"
import { utilService } from "../services/util.service"

//const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser"
const STORAGE_KEY_USER_DB = "user"
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
  //getUserLogin,
  getByUserName,
}

window.userService = userService

_createUsers()
//_creatUserConnected()

function getUsers() {
  return storageService.query(STORAGE_KEY)
}

// function getUserLogin() {
//   return storageService.query(STORAGE_KEY_USER_DB)
// }

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
  
  const user = users.find(
    (user) =>
      user.emailOrNumber === userCred.emailOrNumber ||
      user.username === userCred.emailOrNumber
  )

  if (user) {
    if (user.password === userCred.password) return saveLocalUser(user)
    else
      throw new Error(
        "Sorry, your password was incorrect. Please double-check your password."
      )
  } else {
    console.log("Cannot login service")
    throw new Error("User email or mobile phone is wrong")
  }
}

async function signup(userCred) {
  const users = await storageService.query(STORAGE_KEY)
  const userEmail = users.find(
    (user) => user.emailOrNumber === userCred.emailOrNumber
  )
  if (userEmail) throw new Error("Email or Mobile phone already exists")

  const userUserName = users.find((user) => user.username === userCred.username)
  if (userUserName) throw new Error("Username already exists")

  const returnImgDataUrl = await uploadService.uploadImg(userCred.imgUrl)
  userCred.imgUrl = returnImgDataUrl.secure_url
  userCred.createdAt = Date.now()

  const user = await storageService.post("users", userCred)
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
    emailOrNumber: "",
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
    savedStoryIds: [],
  }
}

function saveLocalUser(user) {
  const userSave = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    username: user.username,
    emailOrNumber: user.emailOrNumber,
  }

  //utilService.saveToStorage(STORAGE_KEY_USER_DB, userSave)
  sessionStorage.setItem(STORAGE_KEY_USER_DB, JSON.stringify(userSave))
  return userSave
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_USER_DB))
}

// function _creatUserConnected() {
//   try {
//     let user = utilService.loadFromStorage(STORAGE_KEY_USER_DB)
//     if (!user || !user.length) {
//       user = {
//         _id: "u104",
//         username: "Moro_loki",
//         password: "123456",
//         fullname: "Mori Loki",
//         emailOrNumber: "Moro_loki@gmail.com",
//         imgUrl:
//           "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660825/I_Am_Far_From_Perfect_But_I_Will_Try_My_Best_To_Be_A_Good_Girlfriend_xqo29a.jpg",
//         following: [
//           {
//             _id: "u106",
//             fullname: "Dob",
//             imgUrl: "http://some-img",
//           },
//         ],
//         followers: [
//           {
//             _id: "u105",
//             fullname: "Bob",
//             imgUrl: "http://some-img",
//           },
//         ],

//         savedStoryIds: ["s104", "s111", "s123"], // even better - use mini-story
//       }
//     }

//     utilService.saveToStorage(STORAGE_KEY_USER_DB, user)
//   } catch (err) {
//     console.log("UserActions: err in loadUser connected", err)
//   }
// }

function _createUsers() {
  try {
     let users = utilService.loadFromStorage(STORAGE_KEY)

     
    if (!users || !users.length) {
      users = createDemoUsers()
    console.log(users)
    }

    // if (!users || !users.length) {
    //   users = [
    //     {
    //       _id: "u101",
    //       username: "Betty_Mardov5",
    //       password: "123456",
    //       fullname: "Betty Mardov",
    //       emailOrNumber: "Betty_Mardov5@gmail.com",
    //       imgUrl:
    //         "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660011/These_are_the_10_sexiest_countries_in_the_world_d4c7sg.jpg",
    //       following: [
    //         {
    //           _id: "u106",
    //           fullname: "Dob",
    //           imgUrl: "http://some-img",
    //         },
    //       ],
    //       followers: [
    //         {
    //           _id: "u105",
    //           fullname: "Bob",
    //           imgUrl: "http://some-img",
    //         },
    //       ],
    //       savedStoryIds: ["s104", "s111", "s123"], // even better - use mini-story
    //     },
    //     {
    //       _id: "u102",
    //       username: "karinNess",
    //       password: "123456",
    //       fullname: "Karin Ness",
    //       emailOrNumber: "karinNess@gmail.com",
    //       imgUrl:
    //         "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660150/How_to_Swap_Your_Beauty_Staples_for_Clean_Alternatives_That_Really_Work_i8p7au.jpg",
    //       following: [
    //         {
    //           _id: "u106",
    //           fullname: "Dob",
    //           imgUrl: "http://some-img",
    //         },
    //       ],
    //       followers: [
    //         {
    //           _id: "u105",
    //           fullname: "Bob",
    //           imgUrl: "http://some-img",
    //         },
    //       ],
    //       savedStoryIds: ["s104", "s111", "s123"], // even better - use mini-story
    //     },
    //     {
    //       _id: "u103",
    //       username: "guy_colin10",
    //       password: "123456",
    //       fullname: "Guy Colin",
    //       emailOrNumber: "guy_colin10@gmail.com",
    //       imgUrl:
    //         "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660259/Fall_Outfits_for_Men_17_Casual_Fashion_Ideas_This_Fall_ht0sqt.jpg",
    //       following: [
    //         {
    //           _id: "u106",
    //           fullname: "Dob",
    //           imgUrl: "http://some-img",
    //         },
    //       ],
    //       followers: [
    //         {
    //           _id: "u105",
    //           fullname: "Bob",
    //           imgUrl: "http://some-img",
    //         },
    //       ],
    //       savedStoryIds: ["s104", "s111", "s123"], // even better - use mini-story
    //     },
    //     {
    //       _id: "u104",
    //       username: "Moro_loki",
    //       password: "123456",
    //       fullname: "Mori Loki",
    //       emailOrNumber: "Moro_loki@gmail.com",
    //       imgUrl:
    //         "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660825/I_Am_Far_From_Perfect_But_I_Will_Try_My_Best_To_Be_A_Good_Girlfriend_xqo29a.jpg",
    //       following: [
    //         {
    //           _id: "u106",
    //           fullname: "Dob",
    //           imgUrl: "http://some-img",
    //         },
    //       ],
    //       followers: [
    //         {
    //           _id: "u105",
    //           fullname: "Bob",
    //           imgUrl: "http://some-img",
    //         },
    //       ],

    //       savedStoryIds: ["s104", "s111", "s123"], // even better - use mini-story
    //     },
    //     {
    //       _id: "u105",
    //       username: "gal1234",
    //       password: "123456",
    //       fullname: "Gal chen",
    //       emailOrNumber: "gal1234@gmail.com",
    //       imgUrl:
    //         "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660678/Moodboard_09_20__Warm_September_Neutrals_yvnuka.jpg",
    //       following: [
    //         {
    //           _id: "u106",
    //           fullname: "Dob",
    //           imgUrl: "http://some-img",
    //         },
    //       ],
    //       followers: [
    //         {
    //           _id: "u1055",
    //           fullname: "Bob",
    //           imgUrl: "http://some-img",
    //         },
    //       ],

    //       savedStoryIds: ["s104", "s111", "s123"], // even better - use mini-story
    //     },
    //   ]

    // }

    utilService.saveToStorage(STORAGE_KEY, users)
  } catch (err) {
    console.log("UserActions: err in loadUsers", err)
  }
}

// function generateUsers() {

//  const users = createDemoUsers()

//   for (let i = 0; i < users.length; i++) {
//     users[i]._id = `u10${i}`;
//    //console.log( users[i])
//     }

//   return users;
// }

// function createDemoUsers()
// {

// return
//[
//     {

//       username: "john_doe",
//       password: "secure_password1",
//       fullname: "John Doe",
//       imgUrl: "https://randomuser.me/api/portraits/men/1.jpg",
//       createdAt: "2024-01-29T12:00:01Z",
//       emailOrNumber: "john_doe@gmail.com"
//     },
//     {
//       username: "jane_smith",
//       password: "secure_password2",
//       fullname: "Jane Smith",
//       imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1706514509/pexels-nele-holemans-19923206_wihp1b.jpg",
//       createdAt: "2024-01-29T12:00:10Z",
//       emailOrNumber: "jane_smith@gmail.com"
//     },
//     {
//       username: "sam_jackson",
//       password: "secure_password3",
//       fullname: "Sam Jackson",
//       imgUrl: "https://randomuser.me/api/portraits/men/3.jpg",
//       createdAt: "2024-01-29T12:00:20Z",
//       emailOrNumber: "sam_jackson@gmail.com"
//     },
//     {
//       username: "emily_white",
//       password: "secure_password4",
//       fullname: "Emily White",
//       imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1706514503/pexels-tati%C3%A9le-alves-18275619_v1hnr0.jpg",
//       createdAt: "2024-01-29T12:00:30Z",
//       emailOrNumber: "emily_white@gmail.com"
//     },
//     {
//       username: "michael_brown",
//       password: "secure_password5",
//       fullname: "Michael Brown",
//       imgUrl: "https://randomuser.me/api/portraits/men/5.jpg",
//       createdAt: "2024-01-29T12:00:40Z",
//       emailOrNumber: "michael_brown@gmail.com"
//     },
//     {
//       username: "olivia_davis",
//       password: "secure_password6",
//       fullname: "Olivia Davis",
//       imgUrl: "https://randomuser.me/api/portraits/women/6.jpg",
//       createdAt: "2024-01-29T12:00:50Z",
//       emailOrNumber: "olivia_davis@gmail.com"
//     },
//     {
//       username: "ethan_miller",
//       password: "secure_password7",
//       fullname: "Ethan Miller",
//       imgUrl: "https://randomuser.me/api/portraits/men/7.jpg",
//       createdAt: "2024-01-29T12:01:00Z",
//       emailOrNumber: "ethan_miller@gmail.com"
//     },
//     {
//       username: "ava_jones",
//       password: "secure_password8",
//       fullname: "Ava Jones",
//       imgUrl: "https://randomuser.me/api/portraits/women/8.jpg",
//       createdAt: "2024-01-29T12:01:10Z",
//       emailOrNumber: "ava_jones@gmail.com"
//     },
//     {
//       username: "william_taylor",
//       password: "secure_password9",
//       fullname: "William Taylor",
//       imgUrl: "https://randomuser.me/api/portraits/men/9.jpg",
//       createdAt: "2024-01-29T12:01:20Z",
//       emailOrNumber: "william_taylor@gmail.com"
//     },
//     {
//       username: "sophia_clark",
//       password: "secure_password10",
//       fullname: "Sophia Clark",
//       imgUrl: "https://randomuser.me/api/portraits/women/10.jpg",
//       createdAt: "2024-01-29T12:01:30Z",
//       emailOrNumber: "sophia_clark@gmail.com"
//     },
//     {
//       username: "adam_hall",
//       password: "secure_password11",
//       fullname: "Adam Hall",
//       imgUrl: "https://randomuser.me/api/portraits/men/11.jpg",
//       createdAt: "2024-01-29T12:01:40Z",
//       emailOrNumber: "adam_hall@gmail.com"
//     },
//     {
//       username: "lily_martin",
//       password: "secure_password12",
//       fullname: "Lily Martin",
//       imgUrl: "https://randomuser.me/api/portraits/women/12.jpg",
//       createdAt: "2024-01-29T12:01:50Z",
//       emailOrNumber: "lily_martin@gmail.com"
//     },
//     {
//       username: "brian_king",
//       password: "secure_password13",
//       fullname: "Brian King",
//       imgUrl: "https://randomuser.me/api/portraits/men/13.jpg",
//       createdAt: "2024-01-29T12:02:00Z",
//       emailOrNumber: "brian_king@gmail.com"
//     },
//     {
//       username: "grace_scott",
//       password: "secure_password14",
//       fullname: "Grace Scott",
//       imgUrl: "https://randomuser.me/api/portraits/women/14.jpg",
//       createdAt: "2024-01-29T12:02:10Z",
//       emailOrNumber: "grace_scott@gmail.com"
//     },
//     {
//       username: "jacob_adams",
//       password: "secure_password15",
//       fullname: "Jacob Adams",
//       imgUrl: "https://randomuser.me/api/portraits/men/15.jpg",
//       createdAt: "2024-01-29T12:02:20Z",
//       emailOrNumber: "jacob_adams@gmail.com"
//     },
//     {
//       username: "olivia_hill",
//       password: "secure_password16",
//       fullname: "Olivia Hill",
//       imgUrl: "https://randomuser.me/api/portraits/women/16.jpg",
//       createdAt: "2024-01-29T12:02:30Z",
//       emailOrNumber: "olivia_hill@gmail.com"
//     },
//     {
//       username: "charlie_ross",
//       password: "secure_password17",
//       fullname: "Charlie Ross",
//       imgUrl: "https://randomuser.me/api/portraits/men/17.jpg",
//       createdAt: "2024-01-29T12:02:40Z",
//       emailOrNumber: "charlie_ross@gmail.com"
//     },
//     {
//       username: "ava_long",
//       password: "secure_password18",
//       fullname: "Ava Long",
//       imgUrl: "https://randomuser.me/api/portraits/women/18.jpg",
//       createdAt: "2024-01-29T12:02:50Z",
//       emailOrNumber: "ava_long@gmail.com"
//     },
//     {
//       username: "ryan_campbell",
//       password: "secure_password19",
//       fullname: "Ryan Campbell",
//       imgUrl: "https://randomuser.me/api/portraits/men/19.jpg",
//       createdAt: "2024-01-29T12:03:00Z",
//       emailOrNumber: "ryan_campbell@gmail.com"
//     },
//     {
//       username: "zoe_kelly",
//       password: "secure_password20",
//       fullname: "Zoe Kelly",
//       imgUrl: "https://randomuser.me/api/portraits/women/20.jpg",
//       createdAt: "2024-01-29T12:03:10Z",
//       emailOrNumber: "zoe_kelly@gmail.com"
//     },
//     {
//       username: "daniel_hall",
//       password: "secure_password21",
//       fullname: "Daniel Hall",
//       imgUrl: "https://randomuser.me/api/portraits/men/21.jpg",
//       createdAt: "2024-01-29T12:03:20Z",
//       emailOrNumber: "daniel_hall@gmail.com"
//     },
//     {
//       username: "emma_morris",
//       password: "secure_password22",
//       fullname: "Emma Morris",
//       imgUrl: "https://randomuser.me/api/portraits/women/22.jpg",
//       createdAt: "2024-01-29T12:03:30Z",
//       emailOrNumber: "emma_morris@gmail.com"
//     },
//     {
//       username: "aiden_white",
//       password: "secure_password23",
//       fullname: "Aiden White",
//       imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
//       createdAt: "2024-01-29T12:03:40Z",
//       emailOrNumber: "aiden_white@gmail.com"
//     },
//     {
//       username: "mia_nelson",
//       password: "secure_password24",
//       fullname: "Mia Nelson",
//       imgUrl: "https://randomuser.me/api/portraits/women/24.jpg",
//       createdAt: "2024-01-29T12:03:50Z",
//       emailOrNumber: "mia_nelson@gmail.com"
//     },
//     {
//       username: "logan_clark",
//       password: "secure_password25",
//       fullname: "Logan Clark",
//       imgUrl: "https://randomuser.me/api/portraits/men/25.jpg",
//       createdAt: "2024-01-29T12:04:00Z",
//       emailOrNumber: "logan_clark@gmail.com"
//     },
//     {
//       username: "mia_hill",
//       password: "secure_password26",
//       fullname: "Mia Hill",
//       imgUrl: "https://randomuser.me/api/portraits/women/26.jpg",
//       createdAt: "2024-01-29T12:04:10Z",
//       emailOrNumber: "mia_hill@gmail.com"
//     },
//     {
//       username: "owen_wood",
//       password: "secure_password27",
//       fullname: "Owen Wood",
//       imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
//       createdAt: "2024-01-29T12:04:20Z",
//       emailOrNumber: "owen_wood@gmail.com"
//     },
//     {
//       username: "ella_jenkins",
//       password: "secure_password28",
//       fullname: "Ella Jenkins",
//       imgUrl: "https://randomuser.me/api/portraits/women/28.jpg",
//       createdAt: "2024-01-29T12:04:30Z",
//       emailOrNumber: "ella_jenkins@gmail.com"
//     },
//     {
//       username: "jack_thompson",
//       password: "secure_password29",
//       fullname: "Jack Thompson",
//       imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
//       createdAt: "2024-01-29T12:04:40Z",
//       emailOrNumber: "jack_thompson@gmail.com"
//     },
//     {
//       username: "amelia_ward",
//       password: "secure_password30",
//       fullname: "Amelia Ward",
//       imgUrl: "https://randomuser.me/api/portraits/women/30.jpg",
//       createdAt: "2024-01-29T12:04:50Z",
//       emailOrNumber: "amelia_ward@gmail.com"
//     },
//     {
//       username: "noah_turner",
//       password: "secure_password31",
//       fullname: "Noah Turner",
//       imgUrl: "https://randomuser.me/api/portraits/men/31.jpg",
//       createdAt: "2024-01-29T12:05:00Z",
//       emailOrNumber: "noah_turner@gmail.com"
//     },
//     {
//       username: "ella_harrison",
//       password: "secure_password32",
//       fullname: "Ella Harrison",
//       imgUrl: "https://randomuser.me/api/portraits/women/32.jpg",
//       createdAt: "2024-01-29T12:05:10Z",
//       emailOrNumber: "ella_harrison@gmail.com"
//     },
//     {
//       username: "liam_fisher",
//       password: "secure_password33",
//       fullname: "Liam Fisher",
//       imgUrl: "https://randomuser.me/api/portraits/men/33.jpg",
//       createdAt: "2024-01-29T12:05:20Z",
//       emailOrNumber: "liam_fisher@gmail.com"
//     },
//     {
//       username: "mia_stewart",
//       password: "secure_password34",
//       fullname: "Mia Stewart",
//       imgUrl: "https://randomuser.me/api/portraits/women/34.jpg",
//       createdAt: "2024-01-29T12:05:30Z",
//       emailOrNumber: "mia_stewart@gmail.com"
//     },
//     {
//       username: "jackson_bell",
//       password: "secure_password35",
//       fullname: "Jackson Bell",
//       imgUrl: "https://randomuser.me/api/portraits/men/35.jpg",
//       createdAt: "2024-01-29T12:05:40Z",
//       emailOrNumber: "jackson_bell@gmail.com"
//     },
//     {
//       username: "ava_henderson",
//       password: "secure_password36",
//       fullname: "Ava Henderson",
//       imgUrl: "https://randomuser.me/api/portraits/women/36.jpg",
//       createdAt: "2024-01-29T12:05:50Z",
//       emailOrNumber: "ava_henderson@gmail.com"
//     },
//     {
//       username: "carter_gardner",
//       password: "secure_password37",
//       fullname: "Carter Gardner",
//       imgUrl: "https://randomuser.me/api/portraits/men/37.jpg",
//       createdAt: "2024-01-29T12:06:00Z",
//       emailOrNumber: "carter_gardner@gmail.com"
//     },
//       {
//         username: "nathan_adams",
//         password: "secure_password11",
//         fullname: "Nathan Adams",
//         imgUrl: "https://randomuser.me/api/portraits/men/11.jpg",
//         createdAt: "2024-01-29T12:01:40Z",
//         emailOrNumber: "nathan_adams@gmail.com"
//       },
//       {
//         username: "lily_jenkins",
//         password: "secure_password12",
//         fullname: "Lily Jenkins",
//         imgUrl: "https://randomuser.me/api/portraits/women/12.jpg",
//         createdAt: "2024-01-29T12:01:50Z",
//         emailOrNumber: "lily_jenkins@gmail.com"
//       },
//       {
//         username: "ryan_fisher",
//         password: "secure_password13",
//         fullname: "Ryan Fisher",
//         imgUrl: "https://randomuser.me/api/portraits/men/13.jpg",
//         createdAt: "2024-01-29T12:02:00Z",
//         emailOrNumber: "ryan_fisher@gmail.com"
//       },
//       {
//         username: "ella_martin",
//         password: "secure_password14",
//         fullname: "Ella Martin",
//         imgUrl: "https://randomuser.me/api/portraits/women/14.jpg",
//         createdAt: "2024-01-29T12:02:10Z",
//         emailOrNumber: "ella_martin@gmail.com"
//       },
//       {
//         username: "daniel_cook",
//         password: "secure_password15",
//         fullname: "Daniel Cook",
//         imgUrl: "https://randomuser.me/api/portraits/men/15.jpg",
//         createdAt: "2024-01-29T12:02:20Z",
//         emailOrNumber: "daniel_cook@gmail.com"
//       },
//       {
//         username: "mia_roberts",
//         password: "secure_password16",
//         fullname: "Mia Roberts",
//         imgUrl: "https://randomuser.me/api/portraits/women/16.jpg",
//         createdAt: "2024-01-29T12:02:30Z",
//         emailOrNumber: "mia_roberts@gmail.com"
//       },
//       {
//         username: "jacob_hall",
//         password: "secure_password17",
//         fullname: "Jacob Hall",
//         imgUrl: "https://randomuser.me/api/portraits/men/17.jpg",
//         createdAt: "2024-01-29T12:02:40Z",
//         emailOrNumber: "jacob_hall@gmail.com"
//       },
//       {
//         username: "chloe_baker",
//         password: "secure_password18",
//         fullname: "Chloe Baker",
//         imgUrl: "https://randomuser.me/api/portraits/women/18.jpg",
//         createdAt: "2024-01-29T12:02:50Z",
//         emailOrNumber: "chloe_baker@gmail.com"
//       },
//       {
//         username: "noah_knight",
//         password: "secure_password19",
//         fullname: "Noah Knight",
//         imgUrl: "https://randomuser.me/api/portraits/men/19.jpg",
//         createdAt: "2024-01-29T12:03:00Z",
//         emailOrNumber: "noah_knight@gmail.com"
//       },
//       {
//         username: "grace_turner",
//         password: "secure_password20",
//         fullname: "Grace Turner",
//         imgUrl: "https://randomuser.me/api/portraits/women/20.jpg",
//         createdAt: "2024-01-29T12:03:10Z",
//         emailOrNumber: "grace_turner@gmail.com"
//       },
//       {
//         username: "ethan_morris",
//         password: "secure_password21",
//         fullname: "Ethan Morris",
//         imgUrl: "https://randomuser.me/api/portraits/men/21.jpg",
//         createdAt: "2024-01-29T12:03:20Z",
//         emailOrNumber: "ethan_morris@gmail.com"
//       },
//       {
//         username: "lucy_ward",
//         password: "secure_password22",
//         fullname: "Lucy Ward",
//         imgUrl: "https://randomuser.me/api/portraits/women/22.jpg",
//         createdAt: "2024-01-29T12:03:30Z",
//         emailOrNumber: "lucy_ward@gmail.com"
//       },
//       {
//         username: "aiden_hunt",
//         password: "secure_password23",
//         fullname: "Aiden Hunt",
//         imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
//         createdAt: "2024-01-29T12:03:40Z",
//         emailOrNumber: "aiden_hunt@gmail.com"
//       },
//       {
//         username: "ella_rogers",
//         password: "secure_password24",
//         fullname: "Ella Rogers",
//         imgUrl: "https://randomuser.me/api/portraits/women/24.jpg",
//         createdAt: "2024-01-29T12:03:50Z",
//         emailOrNumber: "ella_rogers@gmail.com"
//       },
//       {
//         username: "logan_jenkins",
//         password: "secure_password25",
//         fullname: "Logan Jenkins",
//         imgUrl: "https://randomuser.me/api/portraits/men/25.jpg",
//         createdAt: "2024-01-29T12:04:00Z",
//         emailOrNumber: "logan_jenkins@gmail.com"
//       },
//       {
//         username: "mia_simmons",
//         password: "secure_password26",
//         fullname: "Mia Simmons",
//         imgUrl: "https://randomuser.me/api/portraits/women/26.jpg",
//         createdAt: "2024-01-29T12:04:10Z",
//         emailOrNumber: "mia_simmons@gmail.com"
//       },
//       {
//         username: "jackson_harrison",
//         password: "secure_password27",
//         fullname: "Jackson Harrison",
//         imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
//         createdAt: "2024-01-29T12:04:20Z",
//         emailOrNumber: "jackson_harrison@gmail.com"
//       },
//       {
//         username: "eva_wells",
//         password: "secure_password28",
//         fullname: "Eva Wells",
//         imgUrl: "https://randomuser.me/api/portraits/women/28.jpg",
//         createdAt: "2024-01-29T12:04:30Z",
//         emailOrNumber: "eva_wells@gmail.com"
//       },
//       {
//         username: "aiden_cole",
//         password: "secure_password29",
//         fullname: "Aiden Cole",
//         imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
//         createdAt: "2024-01-29T12:04:40Z",
//         emailOrNumber: "aiden_cole@gmail.com"
//       },
//       {
//         username: "zoey_barnes",
//         password: "secure_password30",
//         fullname: "Zoey Barnes",
//         imgUrl: "https://randomuser.me/api/portraits/women/30.jpg",
//         createdAt: "2024-01-29T12:04:50Z",
//         emailOrNumber: "zoey_barnes@gmail.com"
//       },
//       {
//         username: "liam_martin",
//         password: "secure_password31",
//         fullname: "Liam Martin",
//         imgUrl: "https://randomuser.me/api/portraits/men/31.jpg",
//         createdAt: "2024-01-29T12:05:00Z",
//         emailOrNumber: "liam_martin@gmail.com"
//       },
//       {
//         username: "amelia_henderson",
//         password: "secure_password32",
//         fullname: "Amelia Henderson",
//         imgUrl: "https://randomuser.me/api/portraits/women/32.jpg",
//         createdAt: "2024-01-29T12:05:10Z",
//         emailOrNumber: "amelia_henderson@gmail.com"
//       },
//       {
//         username: "jack_lloyd",
//         password: "secure_password33",
//         fullname: "Jack Lloyd",
//         imgUrl: "https://randomuser.me/api/portraits/men/33.jpg",
//         createdAt: "2024-01-29T12:05:20Z",
//         emailOrNumber: "jack_lloyd@gmail.com"
//       },
//       {
//         username: "scarlett_reyes",
//         password: "secure_password34",
//         fullname: "Scarlett Reyes",
//         imgUrl: "https://randomuser.me/api/portraits/women/34.jpg",
//         createdAt: "2024-01-29T12:05:30Z",
//         emailOrNumber: "scarlett_reyes@gmail.com"
//       },
//       {
//         username: "owen_richards",
//         password: "secure_password35",
//         fullname: "Owen Richards",
//         imgUrl: "https://randomuser.me/api/portraits/men/35.jpg",
//         createdAt: "2024-01-29T12:05:40Z",
//         emailOrNumber: "owen_richards@gmail.com"
//       },
//       {
//         username: "ava_floyd",
//         password: "secure_password36",
//         fullname: "Ava Floyd",
//         imgUrl: "https://randomuser.me/api/portraits/women/36.jpg",
//         createdAt: "2024-01-29T12:05:50Z",
//         emailOrNumber: "ava_floyd@gmail.com"
//       },
//       {
//         username: "grayson_morris",
//         password: "secure_password37",
//         fullname: "Grayson Morris",
//         imgUrl: "https://randomuser.me/api/portraits/men/37.jpg",
//         createdAt: "2024-01-29T12:06:00Z",
//         emailOrNumber: "grayson_morris@gmail.com"

//       }
//     ]

// }

function createDemoUsers() {
  return [
    {
      username: "john_doe",
      password: "secure_password1",
      fullname: "John Doe",
      imgUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      createdAt: "2024-01-29T12:00:01Z",
      emailOrNumber: "john_doe@gmail.com",
      _id: "u100",
    },
    {
      username: "jane_smith",
      password: "secure_password2",
      fullname: "Jane Smith",
      imgUrl:
        "https://res.cloudinary.com/dvtyeanju/image/upload/v1706514509/pexels-nele-holemans-19923206_wihp1b.jpg",
      createdAt: "2024-01-29T12:00:10Z",
      emailOrNumber: "jane_smith@gmail.com",
      _id: "u101",
    },
    {
      username: "sam_jackson",
      password: "secure_password3",
      fullname: "Sam Jackson",
      imgUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      createdAt: "2024-01-29T12:00:20Z",
      emailOrNumber: "sam_jackson@gmail.com",
      _id: "u102",
    },
    {
      username: "emily_white",
      password: "secure_password4",
      fullname: "Emily White",
      imgUrl:
        "https://res.cloudinary.com/dvtyeanju/image/upload/v1706514503/pexels-tati%C3%A9le-alves-18275619_v1hnr0.jpg",
      createdAt: "2024-01-29T12:00:30Z",
      emailOrNumber: "emily_white@gmail.com",
      _id: "u103",
    },
    {
      username: "michael_brown",
      password: "secure_password5",
      fullname: "Michael Brown",
      imgUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      createdAt: "2024-01-29T12:00:40Z",
      emailOrNumber: "michael_brown@gmail.com",
      _id: "u104",
    },
    {
      username: "olivia_davis",
      password: "secure_password6",
      fullname: "Olivia Davis",
      imgUrl: "https://randomuser.me/api/portraits/women/6.jpg",
      createdAt: "2024-01-29T12:00:50Z",
      emailOrNumber: "olivia_davis@gmail.com",
      _id: "u105",
    },
    {
      username: "ethan_miller",
      password: "secure_password7",
      fullname: "Ethan Miller",
      imgUrl: "https://randomuser.me/api/portraits/men/7.jpg",
      createdAt: "2024-01-29T12:01:00Z",
      emailOrNumber: "ethan_miller@gmail.com",
      _id: "u106",
    },
    {
      username: "ava_jones",
      password: "secure_password8",
      fullname: "Ava Jones",
      imgUrl: "https://randomuser.me/api/portraits/women/8.jpg",
      createdAt: "2024-01-29T12:01:10Z",
      emailOrNumber: "ava_jones@gmail.com",
      _id: "u107",
    },
    {
      username: "william_taylor",
      password: "secure_password9",
      fullname: "William Taylor",
      imgUrl: "https://randomuser.me/api/portraits/men/9.jpg",
      createdAt: "2024-01-29T12:01:20Z",
      emailOrNumber: "william_taylor@gmail.com",
      _id: "u108",
    },
    {
      username: "sophia_clark",
      password: "secure_password10",
      fullname: "Sophia Clark",
      imgUrl: "https://randomuser.me/api/portraits/women/10.jpg",
      createdAt: "2024-01-29T12:01:30Z",
      emailOrNumber: "sophia_clark@gmail.com",
      _id: "u109",
    },
    {
      username: "adam_hall",
      password: "secure_password11",
      fullname: "Adam Hall",
      imgUrl: "https://randomuser.me/api/portraits/men/11.jpg",
      createdAt: "2024-01-29T12:01:40Z",
      emailOrNumber: "adam_hall@gmail.com",
      _id: "u1010",
    },
    {
      username: "lily_martin",
      password: "secure_password12",
      fullname: "Lily Martin",
      imgUrl: "https://randomuser.me/api/portraits/women/12.jpg",
      createdAt: "2024-01-29T12:01:50Z",
      emailOrNumber: "lily_martin@gmail.com",
      _id: "u1011",
    },
    {
      username: "brian_king",
      password: "secure_password13",
      fullname: "Brian King",
      imgUrl: "https://randomuser.me/api/portraits/men/13.jpg",
      createdAt: "2024-01-29T12:02:00Z",
      emailOrNumber: "brian_king@gmail.com",
      _id: "u1012",
    },
    {
      username: "grace_scott",
      password: "secure_password14",
      fullname: "Grace Scott",
      imgUrl: "https://randomuser.me/api/portraits/women/14.jpg",
      createdAt: "2024-01-29T12:02:10Z",
      emailOrNumber: "grace_scott@gmail.com",
      _id: "u1013",
    },
    {
      username: "jacob_adams",
      password: "secure_password15",
      fullname: "Jacob Adams",
      imgUrl: "https://randomuser.me/api/portraits/men/15.jpg",
      createdAt: "2024-01-29T12:02:20Z",
      emailOrNumber: "jacob_adams@gmail.com",
      _id: "u1014",
    },
    {
      username: "olivia_hill",
      password: "secure_password16",
      fullname: "Olivia Hill",
      imgUrl: "https://randomuser.me/api/portraits/women/16.jpg",
      createdAt: "2024-01-29T12:02:30Z",
      emailOrNumber: "olivia_hill@gmail.com",
      _id: "u1015",
    },
    {
      username: "charlie_ross",
      password: "secure_password17",
      fullname: "Charlie Ross",
      imgUrl: "https://randomuser.me/api/portraits/men/17.jpg",
      createdAt: "2024-01-29T12:02:40Z",
      emailOrNumber: "charlie_ross@gmail.com",
      _id: "u1016",
    },
    {
      username: "ava_long",
      password: "secure_password18",
      fullname: "Ava Long",
      imgUrl: "https://randomuser.me/api/portraits/women/18.jpg",
      createdAt: "2024-01-29T12:02:50Z",
      emailOrNumber: "ava_long@gmail.com",
      _id: "u1017",
    },
    {
      username: "ryan_campbell",
      password: "secure_password19",
      fullname: "Ryan Campbell",
      imgUrl: "https://randomuser.me/api/portraits/men/19.jpg",
      createdAt: "2024-01-29T12:03:00Z",
      emailOrNumber: "ryan_campbell@gmail.com",
      _id: "u1018",
    },
    {
      username: "zoe_kelly",
      password: "secure_password20",
      fullname: "Zoe Kelly",
      imgUrl: "https://randomuser.me/api/portraits/women/20.jpg",
      createdAt: "2024-01-29T12:03:10Z",
      emailOrNumber: "zoe_kelly@gmail.com",
      _id: "u1019",
    },
    {
      username: "daniel_hall",
      password: "secure_password21",
      fullname: "Daniel Hall",
      imgUrl: "https://randomuser.me/api/portraits/men/21.jpg",
      createdAt: "2024-01-29T12:03:20Z",
      emailOrNumber: "daniel_hall@gmail.com",
      _id: "u1020",
    },
    {
      username: "emma_morris",
      password: "secure_password22",
      fullname: "Emma Morris",
      imgUrl: "https://randomuser.me/api/portraits/women/22.jpg",
      createdAt: "2024-01-29T12:03:30Z",
      emailOrNumber: "emma_morris@gmail.com",
      _id: "u1021",
    },
    {
      username: "aiden_white",
      password: "secure_password23",
      fullname: "Aiden White",
      imgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
      createdAt: "2024-01-29T12:03:40Z",
      emailOrNumber: "aiden_white@gmail.com",
      _id: "u1022",
    },
    {
      username: "mia_nelson",
      password: "secure_password24",
      fullname: "Mia Nelson",
      imgUrl: "https://randomuser.me/api/portraits/women/24.jpg",
      createdAt: "2024-01-29T12:03:50Z",
      emailOrNumber: "mia_nelson@gmail.com",
      _id: "u1023",
    },
    {
      username: "logan_clark",
      password: "secure_password25",
      fullname: "Logan Clark",
      imgUrl: "https://randomuser.me/api/portraits/men/25.jpg",
      createdAt: "2024-01-29T12:04:00Z",
      emailOrNumber: "logan_clark@gmail.com",
      _id: "u1024",
    },
    {
      username: "mia_hill",
      password: "secure_password26",
      fullname: "Mia Hill",
      imgUrl: "https://randomuser.me/api/portraits/women/26.jpg",
      createdAt: "2024-01-29T12:04:10Z",
      emailOrNumber: "mia_hill@gmail.com",
      _id: "u1025",
    },
    {
      username: "owen_wood",
      password: "secure_password27",
      fullname: "Owen Wood",
      imgUrl: "https://randomuser.me/api/portraits/men/27.jpg",
      createdAt: "2024-01-29T12:04:20Z",
      emailOrNumber: "owen_wood@gmail.com",
      _id: "u1026",
    },
    {
      username: "ella_jenkins",
      password: "secure_password28",
      fullname: "Ella Jenkins",
      imgUrl: "https://randomuser.me/api/portraits/women/28.jpg",
      createdAt: "2024-01-29T12:04:30Z",
      emailOrNumber: "ella_jenkins@gmail.com",
      _id: "u1027",
    },
    {
      username: "jack_thompson",
      password: "secure_password29",
      fullname: "Jack Thompson",
      imgUrl: "https://randomuser.me/api/portraits/men/29.jpg",
      createdAt: "2024-01-29T12:04:40Z",
      emailOrNumber: "jack_thompson@gmail.com",
      _id: "u1028",
    },
    {
      username: "amelia_ward",
      password: "secure_password30",
      fullname: "Amelia Ward",
      imgUrl: "https://randomuser.me/api/portraits/women/30.jpg",
      createdAt: "2024-01-29T12:04:50Z",
      emailOrNumber: "amelia_ward@gmail.com",
      _id: "u1029",
    },
    {
      username: "noah_turner",
      password: "secure_password31",
      fullname: "Noah Turner",
      imgUrl: "https://randomuser.me/api/portraits/men/31.jpg",
      createdAt: "2024-01-29T12:05:00Z",
      emailOrNumber: "noah_turner@gmail.com",
      _id: "u1030",
    },
    {
      username: "ella_harrison",
      password: "secure_password32",
      fullname: "Ella Harrison",
      imgUrl: "https://randomuser.me/api/portraits/women/32.jpg",
      createdAt: "2024-01-29T12:05:10Z",
      emailOrNumber: "ella_harrison@gmail.com",
      _id: "u1031",
    },
    {
      username: "liam_fisher",
      password: "secure_password33",
      fullname: "Liam Fisher",
      imgUrl: "https://randomuser.me/api/portraits/men/33.jpg",
      createdAt: "2024-01-29T12:05:20Z",
      emailOrNumber: "liam_fisher@gmail.com",
      _id: "u1032",
    },
    {
      username: "mia_stewart",
      password: "secure_password34",
      fullname: "Mia Stewart",
      imgUrl: "https://randomuser.me/api/portraits/women/34.jpg",
      createdAt: "2024-01-29T12:05:30Z",
      emailOrNumber: "mia_stewart@gmail.com",
      _id: "u1033",
    },
    {
      username: "jackson_bell",
      password: "secure_password35",
      fullname: "Jackson Bell",
      imgUrl: "https://randomuser.me/api/portraits/men/35.jpg",
      createdAt: "2024-01-29T12:05:40Z",
      emailOrNumber: "jackson_bell@gmail.com",
      _id: "u1034",
    },
    {
      username: "ava_henderson",
      password: "secure_password36",
      fullname: "Ava Henderson",
      imgUrl: "https://randomuser.me/api/portraits/women/36.jpg",
      createdAt: "2024-01-29T12:05:50Z",
      emailOrNumber: "ava_henderson@gmail.com",
      _id: "u1035",
    },
    {
      username: "carter_gardner",
      password: "secure_password37",
      fullname: "Carter Gardner",
      imgUrl: "https://randomuser.me/api/portraits/men/37.jpg",
      createdAt: "2024-01-29T12:06:00Z",
      emailOrNumber: "carter_gardner@gmail.com",
      _id: "u1036",
    },
    {
      username: "nathan_adams",
      password: "secure_password11",
      fullname: "Nathan Adams",
      imgUrl: "https://randomuser.me/api/portraits/men/64.jpg",
      createdAt: "2024-01-29T12:01:40Z",
      emailOrNumber: "nathan_adams@gmail.com",
      _id: "u1037",
    },
    {
      username: "lily_jenkins",
      password: "secure_password12",
      fullname: "Lily Jenkins",
      imgUrl: "https://randomuser.me/api/portraits/women/63.jpg",
      createdAt: "2024-01-29T12:01:50Z",
      emailOrNumber: "lily_jenkins@gmail.com",
      _id: "u1038",
    },
    {
      username: "ryan_fisher",
      password: "secure_password13",
      fullname: "Ryan Fisher",
      imgUrl: "https://randomuser.me/api/portraits/men/62.jpg",
      createdAt: "2024-01-29T12:02:00Z",
      emailOrNumber: "ryan_fisher@gmail.com",
      _id: "u1039",
    },
    {
      username: "ella_martin",
      password: "secure_password14",
      fullname: "Ella Martin",
      imgUrl: "https://randomuser.me/api/portraits/women/61.jpg",
      createdAt: "2024-01-29T12:02:10Z",
      emailOrNumber: "ella_martin@gmail.com",
      _id: "u1040",
    },
    {
      username: "daniel_cook",
      password: "secure_password15",
      fullname: "Daniel Cook",
      imgUrl: "https://randomuser.me/api/portraits/men/60.jpg",
      createdAt: "2024-01-29T12:02:20Z",
      emailOrNumber: "daniel_cook@gmail.com",
      _id: "u1041",
    },
    {
      username: "mia_roberts",
      password: "secure_password16",
      fullname: "Mia Roberts",
      imgUrl: "https://randomuser.me/api/portraits/women/59.jpg",
      createdAt: "2024-01-29T12:02:30Z",
      emailOrNumber: "mia_roberts@gmail.com",
      _id: "u1042",
    },
    {
      username: "jacob_hall",
      password: "secure_password17",
      fullname: "Jacob Hall",
      imgUrl: "https://randomuser.me/api/portraits/men/58.jpg",
      createdAt: "2024-01-29T12:02:40Z",
      emailOrNumber: "jacob_hall@gmail.com",
      _id: "u1043",
    },
    {
      username: "chloe_baker",
      password: "secure_password18",
      fullname: "Chloe Baker",
      imgUrl: "https://randomuser.me/api/portraits/women/57.jpg",
      createdAt: "2024-01-29T12:02:50Z",
      emailOrNumber: "chloe_baker@gmail.com",
      _id: "u1044",
    },
    {
      username: "noah_knight",
      password: "secure_password19",
      fullname: "Noah Knight",
      imgUrl: "https://randomuser.me/api/portraits/men/56.jpg",
      createdAt: "2024-01-29T12:03:00Z",
      emailOrNumber: "noah_knight@gmail.com",
      _id: "u1045",
    },
    {
      username: "grace_turner",
      password: "secure_password20",
      fullname: "Grace Turner",
      imgUrl: "https://randomuser.me/api/portraits/women/55.jpg",
      createdAt: "2024-01-29T12:03:10Z",
      emailOrNumber: "grace_turner@gmail.com",
      _id: "u1046",
    },
    {
      username: "ethan_morris",
      password: "secure_password21",
      fullname: "Ethan Morris",
      imgUrl: "https://randomuser.me/api/portraits/men/54.jpg",
      createdAt: "2024-01-29T12:03:20Z",
      emailOrNumber: "ethan_morris@gmail.com",
      _id: "u1047",
    },
    {
      username: "lucy_ward",
      password: "secure_password22",
      fullname: "Lucy Ward",
      imgUrl: "https://randomuser.me/api/portraits/women/53.jpg",
      createdAt: "2024-01-29T12:03:30Z",
      emailOrNumber: "lucy_ward@gmail.com",
      _id: "u1048",
    },
    {
      username: "aiden_hunt",
      password: "secure_password23",
      fullname: "Aiden Hunt",
      imgUrl: "https://randomuser.me/api/portraits/men/52.jpg",
      createdAt: "2024-01-29T12:03:40Z",
      emailOrNumber: "aiden_hunt@gmail.com",
      _id: "u1049",
    },
    {
      username: "ella_rogers",
      password: "secure_password24",
      fullname: "Ella Rogers",
      imgUrl: "https://randomuser.me/api/portraits/women/51.jpg",
      createdAt: "2024-01-29T12:03:50Z",
      emailOrNumber: "ella_rogers@gmail.com",
      _id: "u1050",
    },
    {
      username: "logan_jenkins",
      password: "secure_password25",
      fullname: "Logan Jenkins",
      imgUrl: "https://randomuser.me/api/portraits/men/50.jpg",
      createdAt: "2024-01-29T12:04:00Z",
      emailOrNumber: "logan_jenkins@gmail.com",
      _id: "u1051",
    },
    {
      username: "mia_simmons",
      password: "secure_password26",
      fullname: "Mia Simmons",
      imgUrl: "https://randomuser.me/api/portraits/women/49.jpg",
      createdAt: "2024-01-29T12:04:10Z",
      emailOrNumber: "mia_simmons@gmail.com",
      _id: "u1052",
    },
    {
      username: "jackson_harrison",
      password: "secure_password27",
      fullname: "Jackson Harrison",
      imgUrl: "https://randomuser.me/api/portraits/men/48.jpg",
      createdAt: "2024-01-29T12:04:20Z",
      emailOrNumber: "jackson_harrison@gmail.com",
      _id: "u1053",
    },
    {
      username: "eva_wells",
      password: "secure_password28",
      fullname: "Eva Wells",
      imgUrl: "https://randomuser.me/api/portraits/women/47.jpg",
      createdAt: "2024-01-29T12:04:30Z",
      emailOrNumber: "eva_wells@gmail.com",
      _id: "u1054",
    },
    {
      username: "aiden_cole",
      password: "secure_password29",
      fullname: "Aiden Cole",
      imgUrl: "https://randomuser.me/api/portraits/men/46.jpg",
      createdAt: "2024-01-29T12:04:40Z",
      emailOrNumber: "aiden_cole@gmail.com",
      _id: "u1055",
    },
    {
      username: "zoey_barnes",
      password: "secure_password30",
      fullname: "Zoey Barnes",
      imgUrl: "https://randomuser.me/api/portraits/women/45.jpg",
      createdAt: "2024-01-29T12:04:50Z",
      emailOrNumber: "zoey_barnes@gmail.com",
      _id: "u1056",
    },
    {
      username: "liam_martin",
      password: "secure_password31",
      fullname: "Liam Martin",
      imgUrl: "https://randomuser.me/api/portraits/men/44.jpg",
      createdAt: "2024-01-29T12:05:00Z",
      emailOrNumber: "liam_martin@gmail.com",
      _id: "u1057",
    },
    {
      username: "amelia_henderson",
      password: "secure_password32",
      fullname: "Amelia Henderson",
      imgUrl: "https://randomuser.me/api/portraits/women/43.jpg",
      createdAt: "2024-01-29T12:05:10Z",
      emailOrNumber: "amelia_henderson@gmail.com",
      _id: "u1058",
    },
    {
      username: "jack_lloyd",
      password: "secure_password33",
      fullname: "Jack Lloyd",
      imgUrl: "https://randomuser.me/api/portraits/men/42.jpg",
      createdAt: "2024-01-29T12:05:20Z",
      emailOrNumber: "jack_lloyd@gmail.com",
      _id: "u1059",
    },
    {
      username: "scarlett_reyes",
      password: "secure_password34",
      fullname: "Scarlett Reyes",
      imgUrl: "https://randomuser.me/api/portraits/women/41.jpg",
      createdAt: "2024-01-29T12:05:30Z",
      emailOrNumber: "scarlett_reyes@gmail.com",
      _id: "u1060",
    },
    {
      username: "owen_richards",
      password: "secure_password35",
      fullname: "Owen Richards",
      imgUrl: "https://randomuser.me/api/portraits/men/40.jpg",
      createdAt: "2024-01-29T12:05:40Z",
      emailOrNumber: "owen_richards@gmail.com",
      _id: "u1061",
    },
    {
      username: "ava_floyd",
      password: "secure_password36",
      fullname: "Ava Floyd",
      imgUrl: "https://randomuser.me/api/portraits/women/39.jpg",
      createdAt: "2024-01-29T12:05:50Z",
      emailOrNumber: "ava_floyd@gmail.com",
      _id: "u1062",
    },
    {
      username: "grayson_morris",
      password: "secure_password37",
      fullname: "Grayson Morris",
      imgUrl: "https://randomuser.me/api/portraits/men/38.jpg",
      createdAt: "2024-01-29T12:06:00Z",
      emailOrNumber: "grayson_morris@gmail.com",
      _id: "u1063",
    }
  ]
}
function generateTimeList() {
  const startDate = new Date('2023-01-06');
  const endDate = new Date('2024-01-29');
  const timeList = [];

  for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      const timestampInSeconds = Math.floor(currentDate.getTime() / 1000);
      timeList.push({ date: currentDate.toISOString().split('T')[0], timestamp: timestampInSeconds });
  }

  return timeList;
}

// Example usage:
const times = generateTimeList();
console.log(times);