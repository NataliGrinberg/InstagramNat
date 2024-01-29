import { useSelector } from "react-redux"
import { storageService } from "./async-storage.service.js"
import { userService } from "./user.service.js"
import { utilService } from "../services/util.service"
import { getUserLogin } from "../store/actions/user.actions.js"
import { getPosts } from "../store/actions/post.actions.js"

export const postService = {
  query,
  save,
  remove,
  getById,
  createPost,
  getDefaultFilter,
  getFilterFromParams,
  createComment,
  isLikePost,
  updateLike,
  getPostsOfUser,
}

const STORAGE_KEY = "posts"

_createPosts()

function getFilterFromParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field)
      ? searchParams.get(field) === "null"
        ? null
        : searchParams.get(field)
      : defaultFilter[field]
  }

  return filterBy
}

// function getSortFromParams(searchParams) {
//   const defaultSort = getDefaultSort()
//   const sortBy = {}
//   for (const field in defaultSort) {
//     sortBy[field] = searchParams.get(field) ? (searchParams.get(field) === 'null' ? null : searchParams.get(field)) : ''
//   }

//   return sortBy
// }

async function query(filterBy) {
  let posts = await storageService.query(STORAGE_KEY)
  //posts = await queryFilter(filterBy,posts)

  return posts
}

async function queryFilter(filterBy, posts) {
  console.log("queryFilter", filterBy)
  if (filterBy) {
  }
  return posts
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id)
}

function save(postToSave) {
  console.log("postToSave: ", postToSave)
  if (postToSave._id) {
    return storageService.put(STORAGE_KEY, postToSave)
  } else {
    postToSave.createdAt = Date.now()
    return storageService.post(STORAGE_KEY, postToSave)
  }
}

function isLikePost(post) {
  const loggedinUser = getUserLogin()
  //if(!post || !loggedinUser) return
  const find = post?.likedBy
    ? post?.likedBy.filter((li) => li._id === loggedinUser._id)
    : null
  return find !== undefined && find !== null && find.length !== 0 ? true : false
}

async function getPostsOfUser(userId) {
  const posts = getPosts()
  //let posts = await storageService.query(STORAGE_KEY)
  return posts?.filter((post) => post.by._id === userId)
}

function createPost() {
  const loggedinUser = getUserLogin()
  return {
    txt: "",
    imgUrl: "",
    createdAt: "",
    by: {
      _id: loggedinUser._id,
      fullname: loggedinUser.fullname,
      username: loggedinUser.username,
      imgUrl: loggedinUser.imgUrl,
    },
    loc: {
      // Optional
      lat: null,
      lng: null,
      name: "",
    },

    tags: ["fun", "romantic"],
  }
}

function createComment() {
  const loggedinUser = getUserLogin()
  return {
    by: loggedinUser,
    txt: "",
    likedBy: [],
    createdAt: Date.now()
  }
}

function updateLike(post, likePost) {
  const loggedinUser = getUserLogin()
  if (!likePost) {
    const addLike = {
      _id: loggedinUser._id,
      fullname: loggedinUser.fullname,
      imgUrl: loggedinUser.imgUrl,
    }
    //   post.likedBy ? post.likedBy.push(addLike) : post.likedBy = [addLike]
    post.likedBy = post.likedBy ? [...post.likedBy, addLike] : [addLike]
  } else {
    if (post.likedBy)
      post.likedBy = post.likedBy.filter(
        (like) => like._id !== loggedinUser._id
      )
  }

  save(post)
}

// comments: [
//   {
//     id: "c1001",
//     by: {
//       _id: "u105",
//       fullname: "Bob",
//       imgUrl: "http://some-img"
//     },
//     txt: "good one!",
//     likedBy: [ // Optional
//       {
//         _id: "u105",
//         fullname: "Bob",
//         imgUrl: "http://some-img"
//       }
//     ]
//   },

function createPostDefualte() {
  return {
    txt: "",
    imgUrl: "", //an array for a few pictures
    createdAt: "",
    by: {
      _id: "",
      fullname: "",
      username: "",
      imgUrl: "",
    },
    loc: {
      // Optional
      lat: null,
      lng: null,
      name: "",
    },
    comments: [
      {
        id: "",
        createdAt: "",
        by: {
          _id: "",
          fullname: "",
          imgUrl: "",
        },
        txt: "",
        likedBy: [
          // Optional
          {
            _id: "",
            fullname: "",
            imgUrl: "",
          },
        ],
      },
      {
        id: "",
        by: {
          _id: "",
          fullname: "",
          imgUrl: "",
        },
        txt: "",
      },
    ],
    likedBy: [
      {
        _id: "",
        fullname: "",
        imgUrl: "",
      },
      {
        _id: "",
        fullname: "",
        imgUrl: "",
      },
    ],
    tags: ["fun", "romantic"],
  }
}

function getDefaultFilter() {
  return {}
}

// function _createPosts() {
//   let posts = utilService.loadFromStorage(STORAGE_KEY)

//   if (!posts || !posts.length) {
//   posts =  [
//       {
//           _id: "s101",
//           txt: "Mt. Fuji, Japan Best View Travel Guide, Use this Mt. Fuji, Japan Best View Travel Guide for your next trip! Easily one of the most stunning places in Japan, Mt. Fuji has captivated many artists for centuries. It is located on Honshu Island and the mountain can be seen as far away as Tokyo on a clear, sunny day. There are over 25 recognized UNESCO World Heritage Sites that are littered within the vicinity of the mountain",
//           createdAt: 1706179905071,
//           imgUrl: [
//               "https://res.cloudinary.com/dvtyeanju/image/upload/v1705653255/Mt__Fuji_Japan_Best_View_Travel_Guide_gn2ayb.jpg"
//           ],
//           by: {
//               _id: "u101",
//               fullname: "Betty Mardov",
//               username: "Betty_Mardov5",
//               imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660011/These_are_the_10_sexiest_countries_in_the_world_d4c7sg.jpg",
//             },
//           loc: {
//               lat: 36.204823,
//               lng: 138.25293,
//               name: "Japan"
//           },
//           comments: [
//               {
//                   id: "c1001",
//                   by: {
//                       _id: "u105",
//                       fullname: "Bob",
//                       imgUrl: "http://some-img"
//                   },
//                   createdAt: new Date("2023-12-02"),
//                   txt: "good one!",
//                   likedBy: [
//                       {
//                           _id: "u105",
//                           fullname: "Bob",
//                           imgUrl: "http://some-img"
//                       }
//                   ]
//               },
//               {
//                   id: "c1002",
//                   by: {
//                       "_id": "u106",
//                       "fullname": "Dob",
//                       "imgUrl": "http://some-img"
//                   },
//                   createdAt: new Date("2023-12-01"),
//                   txt: "good!"
//               },
//               {
//                 createdAt: 1702133105071,
//                   by: {
//                       _id: "u101",
//                       username: "Muko",
//                       fullname: "Muki Muka",
//                       imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
//                       following: [
//                           {
//                               _id: "u106",
//                               fullname: "Dob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       followers: [
//                           {
//                               _id: "u105",
//                               fullname: "Bob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       savedStoryIds: [
//                           "s104",
//                           "s111",
//                           "s123"
//                       ]
//                   },
//                   txt: "What a stunning spot! Can't wait to visit Japan...",
//                   likedBy: [],
//                   id: "bm9Y9"
//               },
//               {
//                 createdAt: new Date("2023-12-10"),
//                   by: {
//                       _id: "u101",
//                       username: "Muko",
//                       fullname: "Muki Muka",
//                       imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
//                       following: [
//                           {
//                               _id: "u106",
//                               fullname: "Dob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       followers: [
//                           {
//                               _id: "u105",
//                               fullname: "Bob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       "savedStoryIds": [
//                           "s104",
//                           "s111",
//                           "s123"
//                       ]
//                   },
//                   txt: "This is why I love Japan so much! One of the facinating views of all!",
//                   likedBy: [],
//                   id: "hmC2e"
//               },
//               {
//                 createdAt: new Date("2024-01-21"),
//                   by: {
//                       _id: "u101",
//                       username: "Muko",
//                       fullname: "Muki Muka",
//                       imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
//                       following: [
//                           {
//                               _id: "u106",
//                               fullname: "Dob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       followers: [
//                           {
//                               _id: "u105",
//                               fullname: "Bob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       savedStoryIds: [
//                           "s104",
//                           "s111",
//                           "s123"
//                       ]
//                   },
//                   txt: "Omg japan is so beautiful 😻",
//                   likedBy: [],
//                   id: "TE5Iz"
//               },
//               {
//                 createdAt: new Date("2024-01-21"),
//                   by: {
//                       _id: "u101",
//                       username: "Muko",
//                       fullname: "Muki Muka",
//                       imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
//                       following: [
//                           {
//                               "_id": "u106",
//                               "fullname": "Dob",
//                               "imgUrl": "http://some-img"
//                           }
//                       ],
//                       followers: [
//                           {
//                               "_id": "u105",
//                               "fullname": "Bob",
//                               "imgUrl": "http://some-img"
//                           }
//                       ],
//                       savedStoryIds: [
//                           "s104",
//                           "s111",
//                           "s123"
//                       ]
//                   },
//                   txt: "Have a great love for Japan!",
//                   likedBy: [],
//                   id: "WDUmz"
//               },
//               {
//                 createdAt: new Date("2024-01-21"),
//                   by: {
//                       _id: "u101",
//                       username: "Muko",
//                       fullname: "Muki Muka",
//                       imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
//                       following: [
//                           {
//                               _id: "u106",
//                               fullname: "Dob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       followers: [
//                           {
//                               _id: "u105",
//                               fullname: "Bob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       savedStoryIds: [
//                           "s104",
//                           "s111",
//                           "s123"
//                       ]
//                   },
//                   txt: "i wanna live hereee",
//                   likedBy: [],
//                   id: "4zNWS"
//               },
//               {
//                 createdAt: new Date("2024-01-21"),
//                   by: {
//                       _id: "u101",
//                       username: "Muko",
//                       fullname: "Muki Muka",
//                       imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
//                       following: [
//                           {
//                               _id: "u106",
//                               fullname: "Dob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       followers: [
//                           {
//                               _id: "u105",
//                               fullname: "Bob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       savedStoryIds: [
//                           "s104",
//                           "s111",
//                           "s123"
//                       ]
//                   },
//                   txt: "love it ",
//                   likedBy: [],
//                   id: "l1xcX"
//               },
//               {
//                 createdAt: 4322730,
//                   by: {
//                       _id: "u101",
//                       username: "Muko",
//                       fullname: "Muki Muka",
//                       imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
//                       following: [
//                           {
//                               _id: "u106",
//                               fullname: "Dob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       followers: [
//                           {
//                               _id: "u105",
//                               fullname: "Bob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       savedStoryIds: [
//                           "s104",
//                           "s111",
//                           "s123"
//                       ]
//                   },
//                   txt: "Painting of Mount Fuji This image is a reflection of the peace and harmony found in the cultural art of Japan. The art of origami similarly creates this sense of wonder and reflection. My character is in a state of bliss and relaxation when performing this art form. This is also a painting my character has hanging on her wall.",
//                   likedBy: [],
//                   id: "cm5rS"
//               },
//               {
//                 createdAt: 696030,
//                   by: {
//                       _id: "u101",
//                       username: "Muko",
//                       fullname: "Muki Muka",
//                       imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
//                       following: [
//                           {
//                               _id: "u106",
//                               fullname: "Dob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       followers: [
//                           {
//                               _id: "u105",
//                               fullname: "Bob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       "savedStoryIds": [
//                           "s104",
//                           "s111",
//                           "s123"
//                       ]
//                   },
//                   txt: "❤️❤️❤️",
//                   likedBy: [],
//                   id: "urcHw"
//               }
//           ],
//           likedBy: [
//               {
//                   _id: "u105",
//                   fullname: "Bob",
//                   imgUrl: "http://some-img"
//               },
//               {
//                   _id: "u106",
//                   fullname: "Dob",
//                   imgUrl: "http://some-img"
//               },
//               {
//                   _id: "u302",
//                   fullname: "Natali Insta",
//                   imgUrl: "http://some-img"
//               }
//           ],
//           tags: [
//               "fun",
//               "romantic"
//           ]
//       },
//       {
//           _id: "s102",
//           txt: "Beach Wanderlust, Top Beaches | Top Beach Vacations | Destinations | Travel Photography | Wanderlust | Vacation | Ocean Front View | Beach Aesthetic | Beach Pictures#BeachPictures",
//           createdAt: new Date("2024-01-08"),
//           imgUrl: [
//               "https://res.cloudinary.com/dvtyeanju/image/upload/v1705655392/Beach_Wanderlust_tl7hh0.jpg"
//           ],
//           by: {
//               _id: "u105",
//               fullname: "Gal chen",
//               username: "gal1234",
//               imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660678/Moodboard_09_20__Warm_September_Neutrals_yvnuka.jpg",
//           },
//           loc: {
//               lat: 36.84513,
//               lng: -75.97544,
//               name: "Beach Wanderlust"
//           },
//           comments: [
//               {
//                   id: "c1001",
//                   by: {
//                       _id: "u105",
//                       fullname: "Bob",
//                       imgUrl: "http://some-img"
//                   },
//                   createdAt: new Date("2024-01-08"),
//                   txt: "good one!",
//                   likedBy: [
//                       {
//                           _id: "u105",
//                           fullname: "Bob",
//                           imgUrl: "http://some-img"
//                       }
//                   ]
//               },
//               {
//                   id: "c1002",
//                   by: {
//                       _id: "u106",
//                       fullname: "Dob",
//                       imgUrl: "http://some-img"
//                   },
//                   createdAt: new Date("2024-01-09"),
//                   txt: "not good!"
//               }
//           ],
//           likedBy: [
//               {
//                   _id: "u105",
//                   fullname: "Bob",
//                   imgUrl: "http://some-img"
//               },
//               {
//                   _id: "u106",
//                   fullname: "Dob",
//                   imgUrl: "http://some-img"
//               }
//           ],
//           tags: [
//               "fun",
//               "romantic"
//           ]
//       },
//       {
//         createdAt: new Date("2023-12-20"),
//         txt: "Breathtaking ocean view\n\n“If you want to hear the distant voice of the ocean put your ear to the lips of a seashell.” Curtis Tyrone Jones",
//           imgUrl: [
//               "https://res.cloudinary.com/dvtyeanju/image/upload/v1705655960/yxciicz1kghomrutdkxc.png"
//           ],
//           by: {
//               _id: "u102",
//               fullname: "Karin Ness",
//               username: "karinNess",
//                 imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660150/How_to_Swap_Your_Beauty_Staples_for_Clean_Alternatives_That_Really_Work_i8p7au.jpg",
//               },
//           loc: {
//               "lat": null,
//               "lng": null,
//               "name": ""
//           },
//           tags: [
//               "fun",
//               "romantic"
//           ],
//           _id: "RLe3B",
//           comments: [
//               {
//                 createdAt: new Date("2023-12-28"),
//                   by: {
//                       _id: "u101",
//                       username: "Muko",
//                       fullname: "Muki Muka",
//                       imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
//                       following: [
//                           {
//                               _id: "u106",
//                               fullname: "Dob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       followers: [
//                           {
//                               _id: "u105",
//                               fullname: "Bob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       savedStoryIds: [
//                           "s104",
//                           "s111",
//                           "s123"
//                       ]
//                   },
//                   txt: "So Beautiful! Thank you for sharing! 😍",
//                   likedBy: [],
//                   id: "UKG4J"
//               }
//           ]
//       },
//       {
//         createdAt: new Date("2023-11-20"),
//           txt: "The prettiest places in London every traveller needs to visit\n\nThe 32 best photo locations in London for capturing the city's most famous views, from Tower Bridge to Big Ben – plus the prettiest neighbourhoods to know about",
//           imgUrl: [
//               "https://res.cloudinary.com/dvtyeanju/image/upload/v1705656201/damijosko8ox4vr6ahts.png"
//           ],
//           by: {
//               _id: "u102",
//               fullname: "Karin Ness",
//               username: "karinNess",
//               imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660150/How_to_Swap_Your_Beauty_Staples_for_Clean_Alternatives_That_Really_Work_i8p7au.jpg",
//              },
//           loc: {
//               lat: null,
//               lng: null,
//               name: "London"
//           },
//           tags: [
//               "fun",
//               "romantic"
//           ],
//           _id: "dJKDP",
//           comments: [
//               {
//                 createdAt: new Date("2023-11-28"),
//                   by: {
//                       _id: "u101",
//                       username: "Muko",
//                       fullname: "Muki Muka",
//                       imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
//                       following: [
//                           {
//                               _id: "u106",
//                               fullname: "Dob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       followers: [
//                           {
//                               _id: "u105",
//                               fullname: "Bob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       savedStoryIds: [
//                           "s104",
//                           "s111",
//                           "s123"
//                       ]
//                   },
//                   txt: "They all look so stunning and beautiful! 🍃",
//                   likedBy: [],
//                   id: "GiAvZ"
//               },
//               {
//                 createdAt: new Date("2023-11-23"),
//                   by: {
//                       _id: "u101",
//                       username: "Muko",
//                       fullname: "Muki Muka",
//                       imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
//                       following: [
//                           {
//                               _id: "u106",
//                               fullname: "Dob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       followers: [
//                           {
//                               _id: "u105",
//                               fullname: "Bob",
//                               imgUrl: "http://some-img"
//                           }
//                       ],
//                       savedStoryIds: [
//                           "s104",
//                           "s111",
//                           "s123"
//                       ]
//                   },
//                   txt: "permission to save and share it",
//                   likedBy: [],
//                   id: "yDkyo"
//               }
//           ]
//       },
//       {
//         createdAt: new Date("2024-01-21"),
//         txt: "What to do in Lesotho. Best Things to do in the Kingdom in the Sky.\n\nVisit Lesotho and you will know why this tiny country is called \"Kingdom in the Sky\". Here are the best things to do in Lesotho, Africa's mountain Kingdom.",
//         imgUrl: [
//               "https://res.cloudinary.com/dvtyeanju/image/upload/v1705656576/jzzteidrquboypirfute.png"
//           ],
//           by: {
//               _id: "u105",
//               fullname: "Gal chen",
//               username: "gal1234",
//                 imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660678/Moodboard_09_20__Warm_September_Neutrals_yvnuka.jpg",
//                 },
//           loc: {
//               lat: null,
//               lng: null,
//               name: "Lesotho"
//           },
//           tags: [
//               "fun",
//               "romantic"
//           ],
//           _id: "AjB9a"
//       },
//       {
//         txt: "Amazing Paris 😍",
//         imgUrl: [
//           "https://res.cloudinary.com/dvtyeanju/image/upload/v1705659596/yyx18j1uqxphwzwra6rt.jpg",
//           "https://res.cloudinary.com/dvtyeanju/image/upload/v1705659597/edrz9kl81uac6549lucz.jpg",
//           "https://res.cloudinary.com/dvtyeanju/image/upload/v1705659598/nc3ygyq0oymt4vrkwr2u.jpg",
//           "https://res.cloudinary.com/dvtyeanju/image/upload/v1705659599/rn7obdk9ropifhjaxj0h.png"
//         ],
//         by: {
//           _id: "u104",
//           fullname: "Gal chen",
//           username: "gal1234",
//           imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660678/Moodboard_09_20__Warm_September_Neutrals_yvnuka.jpg",
//            },
//         loc: {
//           lat: null,
//           lng: null,
//           name: "Paris"
//         },
//         tags: [
//           "romantic"
//         ],
//         _id: "cLpCg"
//       }
//   ]
// utilService.saveToStorage(STORAGE_KEY, posts)
// }
// }

//end post
//   posts = [
//     {
//       _id: "s101",
//       txt: "Mt. Fuji, Japan Best View Travel Guide, Use this Mt. Fuji, Japan Best View Travel Guide for your next trip! Easily one of the most stunning places in Japan, Mt. Fuji has captivated many artists for centuries. It is located on Honshu Island and the mountain can be seen as far away as Tokyo on a clear, sunny day. There are over 25 recognized UNESCO World Heritage Sites that are littered within the vicinity of the mountain",
//       imgUrl: ["https://res.cloudinary.com/dvtyeanju/image/upload/v1705653255/Mt__Fuji_Japan_Best_View_Travel_Guide_gn2ayb.jpg"], //an array for a few pictures
//       by: {
//         _id: "u101",
//         fullname: "Ulash Ulashi",
//         imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1701021596/sdjujydo9sjk0smgn7lv.png", //an array for a few pictures
//       },
//       loc: { // Optional
//         lat: 36.204823,
//         lng: 138.252930,
//         name: "Japan"
//       },
//       comments: [
//         {
//           id: "c1001",
//           by: {
//             _id: "u105",
//             fullname: "Bob",
//             imgUrl: "http://some-img"
//           },
//           txt: "good one!",
//           likedBy: [ // Optional
//             {
//               _id: "u105",
//               fullname: "Bob",
//               imgUrl: "http://some-img"
//             }
//           ]
//         },
//         {
//           id: "c1002",
//           by: {
//             _id: "u106",
//             fullname: "Dob",
//             imgUrl: "http://some-img"
//           },
//           txt: "not good!",
//         }
//       ],
//       likedBy: [
//         {
//           _id: "u105",
//           fullname: "Bob",
//           imgUrl: "http://some-img"
//         },
//         {
//           _id: "u106",
//           fullname: "Dob",
//           imgUrl: "http://some-img"
//         },
//         {
//           _id: 'u302',
//           fullname: "Natali Insta",
//           imgUrl: "http://some-img"
//         }
//       ],
//       tags: ["fun", "romantic"]
//     },
//     {
//       _id: "s102",
//       txt: "Beach Wanderlust, Top Beaches | Top Beach Vacations | Destinations | Travel Photography | Wanderlust | Vacation | Ocean Front View | Beach Aesthetic | Beach Pictures#BeachPictures",
//       imgUrl: ["https://res.cloudinary.com/dvtyeanju/image/upload/v1705655392/Beach_Wanderlust_tl7hh0.jpg"], //an array for a few pictures
//       by: {
//         _id: "u102",
//         fullname: "rbn lol",
//         imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1701022046/e88sua3ge6ajcldn2hcs.png", //an array for a few pictures
//       },
//       loc: { // Optional
//         lat: 36.845130,
//         lng: -75.975440,
//         name: "Beach Wanderlust"
//       },
//       comments: [
//         {
//           id: "c1001",
//           by: {
//             _id: "u105",
//             fullname: "Bob",
//             imgUrl: "http://some-img"
//           },
//           txt: "good one!",
//           likedBy: [ // Optional
//             {
//               _id: "u105",
//               fullname: "Bob",
//               imgUrl: "http://some-img"
//             }
//           ]
//         },
//         {
//           id: "c1002",
//           by: {
//             _id: "u106",
//             fullname: "Dob",
//             imgUrl: "http://some-img"
//           },
//           txt: "not good!",
//         }
//       ],
//       likedBy: [
//         {
//           _id: "u105",
//           fullname: "Bob",
//           imgUrl: "http://some-img"
//         },
//         {
//           _id: "u106",
//           fullname: "Dob",
//           imgUrl: "http://some-img"
//         }
//       ],
//       tags: ["fun", "romantic"]
//     },
//     {
//       _id: "s1034",
//       txt: "Best trip ever 333",
//       imgUrl: ["https://res.cloudinary.com/dvtyeanju/image/upload/v1701021596/sdjujydo9sjk0smgn7lv.png"], //an array for a few pictures
//       by: {
//         _id: "u103",
//         fullname: "gri kol",
//         imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1701021596/sdjujydo9sjk0smgn7lv.png", //an array for a few pictures
//       },
//       loc: { // Optional
//         lat: 11.11,
//         lng: 22.22,
//         name: "Tel Aviv"
//       },
//       comments: [
//         {
//           id: "c1001",
//           by: {
//             _id: "u105",
//             fullname: "Bob",
//             imgUrl: "http://some-img"
//           },
//           txt: "good one!",
//           likedBy: [ // Optional
//             {
//               _id: "u105",
//               fullname: "Bob",
//               imgUrl: "http://some-img"
//             }
//           ]
//         },
//         {
//           id: "c1002",
//           by: {
//             _id: "u106",
//             fullname: "Dob",
//             imgUrl: "http://some-img"
//           },
//           txt: "not good!",
//         }
//       ],
//       likedBy: [
//         {
//           _id: "u105",
//           fullname: "Bob",
//           imgUrl: "http://some-img"
//         },
//         {
//           _id: "u106",
//           fullname: "Dob",
//           imgUrl: "http://some-img"
//         }
//       ],
//       tags: ["fun", "romantic"]
//     },
//     {
//       _id: "s104",
//       txt: "story four",
//       imgUrl: ["https://res.cloudinary.com/dvtyeanju/image/upload/v1701022046/e88sua3ge6ajcldn2hcs.png"], //an array for a few pictures
//       by: {
//         _id: "u1044",
//         fullname: "dana tom",
//         imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1701022046/e88sua3ge6ajcldn2hcs.png", //an array for a few pictures
//       },
//       loc: { // Optional
//         lat: 11.11,
//         lng: 22.22,
//         name: "Tel Aviv"
//       },
//       comments: [
//         {
//           id: "c1001",
//           by: {
//             _id: "u105",
//             fullname: "Bob",
//             imgUrl: "http://some-img"
//           },
//           txt: "good one!",
//           likedBy: [ // Optional
//             {
//               _id: "u105",
//               fullname: "Bob",
//               imgUrl: "http://some-img"
//             }
//           ]
//         },
//         {
//           id: "c1002",
//           by: {
//             _id: "u106",
//             fullname: "Dob",
//             imgUrl: "http://some-img"
//           },
//           txt: "not good!",
//         }
//       ],
//       likedBy: [
//         {
//           _id: "u105",
//           fullname: "Bob",
//           imgUrl: "http://some-img"
//         },
//         {
//           _id: "u106",
//           fullname: "Dob",
//           imgUrl: "http://some-img"
//         }
//       ],
//       tags: ["fun", "romantic"]
//     }
//   ]

//   utilService.saveToStorage(STORAGE_KEY, posts)
// }

function _createPosts() {
  let posts = utilService.loadFromStorage(STORAGE_KEY)

  if (!posts || !posts.length) {
    posts = [
      {
        _id: "2355f",
        txt: "Beautiful sunset at the beach!",
        imgUrl: [
          "https://res.cloudinary.com/dvtyeanju/image/upload/v1706556708/Santa-Monica-State-Beach_GettyImages-579739546_a0s8v2.webp",
          "https://res.cloudinary.com/dvtyeanju/image/upload/v1706556708/59523f11-21cb-4a60-8d14-c61ccac2da6e_mcbfi2.webp"
        ],
        createdAt: 1706403600000,
        by: {
          _id: "u100",
          fullname: "John Doe",
          username: "john_doe",
          imgUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        loc: { lat: 34.0522, lng: -118.2437, name: "Santa Monica Beach" },
        comments: [
          {
            id: "c1",
            createdAt: 1706403600000,
            by: {
              _id: "u101",
              fullname: "Jane Smith",
              imgUrl:
                "https://res.cloudinary.com/dvtyeanju/image/upload/v1706514509/pexels-nele-holemans-19923206_wihp1b.jpg",
            },
            txt: "Amazing view!",
            likedBy: [
              {
                _id: "u102",
                fullname: "Sam Jackson",
                imgUrl: "https://randomuser.me/api/portraits/men/3.jpg",
              },
            ],
          },
          {
            id: "c2",
            createdAt: 1706403600000,
            by: {
              _id: "u103",
              fullname: "Emily White",
              imgUrl:
                "https://res.cloudinary.com/dvtyeanju/image/upload/v1706514503/pexels-tati%C3%A9le-alves-18275619_v1hnr0.jpg",
            },
            txt: "Magical colors!",
            likedBy: [
              {
                _id: "u104",
                fullname: "Michael Brown",
                imgUrl: "https://randomuser.me/api/portraits/men/5.jpg",
              },
            ],
          },
        ],
        likedBy: [
          {
            _id: "u105",
            fullname: "Olivia Davis",
            imgUrl: "https://randomuser.me/api/portraits/women/6.jpg",
          },
          {
            _id: "u106",
            fullname: "Ethan Miller",
            imgUrl: "https://randomuser.me/api/portraits/men/7.jpg",
          },
          {
            _id: "u107",
            fullname: "Ava Jones",
            imgUrl: "https://randomuser.me/api/portraits/women/8.jpg",
          },
          {
            _id: "u108",
            fullname: "William Taylor",
            imgUrl: "https://randomuser.me/api/portraits/men/9.jpg",
          },
          {
            _id: "u109",
            fullname: "Sophia Clark",
            imgUrl: "https://randomuser.me/api/portraits/women/10.jpg",
          },
          {
            _id: "u1010",
            fullname: "Adam Hall",
            imgUrl: "https://randomuser.me/api/portraits/men/11.jpg",
          },
          {
            _id: "u1011",
            fullname: "Lily Martin",
            imgUrl: "https://randomuser.me/api/portraits/women/12.jpg",
          },
          {
            _id: "u1012",
            fullname: "Brian King",
            imgUrl: "https://randomuser.me/api/portraits/men/13.jpg",
          },
          {
            _id: "u1013",
            fullname: "Grace Scott",
            imgUrl: "https://randomuser.me/api/portraits/women/14.jpg",
          },
          {
            _id: "u1014",
            fullname: "Jacob Adams",
            imgUrl: "https://randomuser.me/api/portraits/men/15.jpg",
          },
        ],
        tags: ["nature", "sunset"],
      },
      {
        _id: "p1001",
        txt: "Beautiful sunset over the mountains!",
        imgUrl: [
          "https://res.cloudinary.com/dvtyeanju/image/upload/v1706556862/Los_Angeles_with_Mount_Baldy_ssz8vc.jpg",
          
        ],
        createdAt: 1706403600000,
        by: {
          _id: "u100",
          fullname: "John Doe",
          username: "john_doe",
          imgUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        loc: { lat: 34.0522, lng: -118.2437, name: "Los Angeles, CA" },
        comments: [
          {
            id: "c1001",
            createdAt: 1706403600000,
            by: {
              _id: "u101",
              fullname: "Jane Smith",
              imgUrl:
                "https://res.cloudinary.com/dvtyeanju/image/upload/v1706514509/pexels-nele-holemans-19923206_wihp1b.jpg",
            },
            txt: "Amazing view!",
            likedBy: [
              {
                _id: "u102",
                fullname: "Sam Jackson",
                imgUrl: "https://randomuser.me/api/portraits/men/3.jpg",
              },
            ],
          },
          {
            id: "c1002",
            createdAt: 1706403600000,
            by: {
              _id: "u103",
              fullname: "Emily White",
              imgUrl:
                "https://res.cloudinary.com/dvtyeanju/image/upload/v1706514503/pexels-tati%C3%A9le-alves-18275619_v1hnr0.jpg",
            },
            txt: "I wish I could be there!",
          },
        ],
        likedBy: [
          {
            _id: "u104",
            fullname: "Michael Brown",
            imgUrl: "https://randomuser.me/api/portraits/men/5.jpg",
          },
          {
            _id: "u105",
            fullname: "Olivia Davis",
            imgUrl: "https://randomuser.me/api/portraits/women/6.jpg",
          },
        ],
        tags: ["nature", "sunset"],
      },
      {
        _id: "p1",
        txt: "Amazing Bulgaria!",
        imgUrl: ["https://res.cloudinary.com/dvtyeanju/image/upload/v1706557498/630669_1624884452_fbscv4.jpg"],
        createdAt: 1706403600000,
        by: {
          _id: "u100",
          fullname: "John Doe",
          username: "john_doe",
          imgUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        loc: { lat: 0, lng: 0, name: "Bulgaria" },
        comments: [
          {
            id: "c1",
            createdAt: 1706403600000,
            by: {
              _id: "u101",
              fullname: "Jane Smith",
              imgUrl:
                "https://res.cloudinary.com/dvtyeanju/image/upload/v1706514509/pexels-nele-holemans-19923206_wihp1b.jpg",
            },
            txt: "Amazing view!",
            likedBy: [
              {
                _id: "u102",
                fullname: "Sam Jackson",
                imgUrl: "https://randomuser.me/api/portraits/men/3.jpg",
              },
            ],
          },
          {
            id: "c2",
            createdAt:1706403600000,
            by: {
              _id: "u103",
              fullname: "Emily White",
              imgUrl:
                "https://res.cloudinary.com/dvtyeanju/image/upload/v1706514503/pexels-tati%C3%A9le-alves-18275619_v1hnr0.jpg",
            },
            txt: "Wish I was there!",
            likedBy: [
              {
                _id: "u104",
                fullname: "Michael Brown",
                imgUrl: "https://randomuser.me/api/portraits/men/5.jpg",
              },
            ],
          },
        ],
        likedBy: [
          {
            _id: "u105",
            fullname: "Olivia Davis",
            imgUrl: "https://randomuser.me/api/portraits/women/6.jpg",
          },
          {
            _id: "u106",
            fullname: "Ethan Miller",
            imgUrl: "https://randomuser.me/api/portraits/men/7.jpg",
          },
        ],
        tags: ["sunset", "beach"],
      },
      {
        _id: "p11",
        txt: "Overlooked by Mont-Blanc, the highest peak in Europe, and with an amazing location for outdoor activities, the Alps are a must-see destination in Auvergne-Rhône-Alpes. Featuring four of the most beautiful Alpine lakes in France, three regional nature parks and two national parks as well as historic towns and spas, the Alps are a remarkable natural and cultural heritage. Here, authentic villages stand side by side with Alpine resorts, and visitors can enjoy an exceptional range of tourist attractions! Annecy, Evian, Aix-les-bains, Chamonix, Courchevel, Megève, Les 2 Alpes, Val Thorens and many others attract mountain enthusiasts both in summer and winter. Whether it's a family climb to the Mer de Glace, a duo stay on the shores of Lake Annecy, a bike trek across the Vercors, skiing in the 3 Valleys, or simply sharing a raclette with friends... the destination offers something for everyone.",
        imgUrl: [
          "https://res.cloudinary.com/dvtyeanju/image/upload/v1706560451/b8f35b81015641a01defef75b6fb8beb_xhawvr.jpg",
          "https://res.cloudinary.com/dvtyeanju/image/upload/v1706560450/%D7%94%D7%95%D7%A8%D7%93%D7%94_e7qu7m.jpg",
          "https://res.cloudinary.com/dvtyeanju/image/upload/v1706560470/thanh-nguyen-mont-blanc-tete-d-ane-1600x900_ssi8ex.jpg"
        ],
        createdAt: 1706403600000,
        by: {
          _id: "u100",
          fullname: "John Doe",
          username: "john_doe",
          imgUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        loc: { lat: 37.7749, lng: -122.4194, name: "French Alps" },
        comments: [
          {
            id: "c1",
            createdAt: 1706403600000,
            by: {
              _id: "u101",
              fullname: "Jane Smith",
              imgUrl:
                "https://res.cloudinary.com/dvtyeanju/image/upload/v1706514509/pexels-nele-holemans-19923206_wihp1b.jpg",
            },
            txt: "Amazing view!",
            likedBy: [
              {
                _id: "u102",
                fullname: "Sam Jackson",
                imgUrl: "https://randomuser.me/api/portraits/men/3.jpg",
              },
            ],
          },
          {
            id: "c2",
            createdAt: 1706403600000,
            by: {
              _id: "u103",
              fullname: "Emily White",
              imgUrl:
                "https://res.cloudinary.com/dvtyeanju/image/upload/v1706514503/pexels-tati%C3%A9le-alves-18275619_v1hnr0.jpg",
            },
            txt: "Wish I could be there!",
            likedBy: [],
          },
        ],
        likedBy: [
          {
            _id: "u104",
            fullname: "Michael Brown",
            imgUrl: "https://randomuser.me/api/portraits/men/5.jpg",
          },
          {
            _id: "u105",
            fullname: "Olivia Davis",
            imgUrl: "https://randomuser.me/api/portraits/women/6.jpg",
          },
        ],
        tags: ["nature", "sunset"],
      },
      {
        _id: "p101",
        txt: "Capturing the beauty of the Amalfi Coast. 🌅 #AmalfiDreams",
        imgUrl: [
          "https://res.cloudinary.com/dvtyeanju/image/upload/v1706542260/TAL-header-atrani-italy-amalfi-coast-AMALFITOWNS0223-c516bc91bb434e19b5ec6e2fb50cb9eb_l3vlsv.jpg",
          "https://res.cloudinary.com/dvtyeanju/image/upload/v1706542260/header-positano-AMALFI0622-39a49349a2c145e6b3df85f884cf3217_fiti2z.jpg",
          
        ],
        createdAt: 1706403600000,
        by: {
          _id: "u104",
          fullname: "Alice Johnson",
          username: "alice_j",
          imgUrl: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        loc: { lat: 40.634, lng: 14.6028, name: "Amalfi Coast, Italy" },
        comments: [
          {
            id: "c1002",
            createdAt: 1706403600000,
            by: {
              _id: "u105",
              fullname: "Robert Davis",
              imgUrl:
                "https://res.cloudinary.com/dvtyeanju/image/upload/v1706514512/pexels-lucas-ferreira-3182769_sgo0tm.jpg",
            },
            txt: "Wish I could be there right now!",
            likedBy: [
              {
                _id: "u106",
                fullname: "Ella Turner",
                imgUrl: "https://randomuser.me/api/portraits/women/5.jpg",
              },
            ],
          },
        ],
        likedBy: [
          {
            _id: "u107",
            fullname: "Oliver Moore",
            imgUrl:
              "https://res.cloudinary.com/dvtyeanju/image/upload/v1706514515/pexels-cottonbro-5081970_eivewm.jpg",
          },
        ],
        tags: ["nature", "wanderlust"],
      },
            {
          _id: "s101",
          txt: "Mt. Fuji, Japan Best View Travel Guide, Use this Mt. Fuji, Japan Best View Travel Guide for your next trip! Easily one of the most stunning places in Japan, Mt. Fuji has captivated many artists for centuries. It is located on Honshu Island and the mountain can be seen as far away as Tokyo on a clear, sunny day. There are over 25 recognized UNESCO World Heritage Sites that are littered within the vicinity of the mountain",
          createdAt: 1706179905071,
          imgUrl: [
              "https://res.cloudinary.com/dvtyeanju/image/upload/v1705653255/Mt__Fuji_Japan_Best_View_Travel_Guide_gn2ayb.jpg"
          ],
          by: {
              _id: "u101",
              fullname: "Betty Mardov",
              username: "Betty_Mardov5",
              imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660011/These_are_the_10_sexiest_countries_in_the_world_d4c7sg.jpg",
            },
          loc: {
              lat: 36.204823,
              lng: 138.25293,
              name: "Japan"
          },
          comments: [
              {
                  id: "c1001",
                  by: {
                      _id: "u105",
                      fullname: "Bob",
                      imgUrl: "http://some-img"
                  },
                  createdAt: new Date("2023-12-02"),
                  txt: "good one!",
                  likedBy: [
                      {
                          _id: "u105",
                          fullname: "Bob",
                          imgUrl: "http://some-img"
                      }
                  ]
              },
              {
                  id: "c1002",
                  by: {
                      "_id": "u106",
                      "fullname": "Dob",
                      "imgUrl": "http://some-img"
                  },
                  createdAt: new Date("2023-12-01"),
                  txt: "good!"
              },
              {
                createdAt: 1702133105071,
                  by: {
                      _id: "u101",
                      username: "Muko",
                      fullname: "Muki Muka",
                      imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
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
                      savedStoryIds: [
                          "s104",
                          "s111",
                          "s123"
                      ]
                  },
                  txt: "What a stunning spot! Can't wait to visit Japan...",
                  likedBy: [],
                  id: "bm9Y9"
              },
              {
                createdAt: new Date("2023-12-10"),
                  by: {
                      _id: "u101",
                      username: "Muko",
                      fullname: "Muki Muka",
                      imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
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
                      "savedStoryIds": [
                          "s104",
                          "s111",
                          "s123"
                      ]
                  },
                  txt: "This is why I love Japan so much! One of the facinating views of all!",
                  likedBy: [],
                  id: "hmC2e"
              },
              {
                createdAt: new Date("2024-01-21"),
                  by: {
                      _id: "u101",
                      username: "Muko",
                      fullname: "Muki Muka",
                      imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
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
                      savedStoryIds: [
                          "s104",
                          "s111",
                          "s123"
                      ]
                  },
                  txt: "Omg japan is so beautiful 😻",
                  likedBy: [],
                  id: "TE5Iz"
              },
              {
                createdAt: new Date("2024-01-21"),
                  by: {
                      _id: "u101",
                      username: "Muko",
                      fullname: "Muki Muka",
                      imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
                      following: [
                          {
                              "_id": "u106",
                              "fullname": "Dob",
                              "imgUrl": "http://some-img"
                          }
                      ],
                      followers: [
                          {
                              "_id": "u105",
                              "fullname": "Bob",
                              "imgUrl": "http://some-img"
                          }
                      ],
                      savedStoryIds: [
                          "s104",
                          "s111",
                          "s123"
                      ]
                  },
                  txt: "Have a great love for Japan!",
                  likedBy: [],
                  id: "WDUmz"
              },
              {
                createdAt: new Date("2024-01-21"),
                  by: {
                      _id: "u101",
                      username: "Muko",
                      fullname: "Muki Muka",
                      imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
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
                      savedStoryIds: [
                          "s104",
                          "s111",
                          "s123"
                      ]
                  },
                  txt: "i wanna live hereee",
                  likedBy: [],
                  id: "4zNWS"
              },
              {
                createdAt: new Date("2024-01-21"),
                  by: {
                      _id: "u101",
                      username: "Muko",
                      fullname: "Muki Muka",
                      imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
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
                      savedStoryIds: [
                          "s104",
                          "s111",
                          "s123"
                      ]
                  },
                  txt: "love it ",
                  likedBy: [],
                  id: "l1xcX"
              },
              {
                createdAt: 4322730,
                  by: {
                      _id: "u101",
                      username: "Muko",
                      fullname: "Muki Muka",
                      imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
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
                      savedStoryIds: [
                          "s104",
                          "s111",
                          "s123"
                      ]
                  },
                  txt: "Painting of Mount Fuji This image is a reflection of the peace and harmony found in the cultural art of Japan. The art of origami similarly creates this sense of wonder and reflection. My character is in a state of bliss and relaxation when performing this art form. This is also a painting my character has hanging on her wall.",
                  likedBy: [],
                  id: "cm5rS"
              },
              {
                createdAt: 696030,
                  by: {
                      _id: "u101",
                      username: "Muko",
                      fullname: "Muki Muka",
                      imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
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
                      "savedStoryIds": [
                          "s104",
                          "s111",
                          "s123"
                      ]
                  },
                  txt: "❤️❤️❤️",
                  likedBy: [],
                  id: "urcHw"
              }
          ],
          likedBy: [
              {
                  _id: "u105",
                  fullname: "Bob",
                  imgUrl: "http://some-img"
              },
              {
                  _id: "u106",
                  fullname: "Dob",
                  imgUrl: "http://some-img"
              },
              {
                  _id: "u302",
                  fullname: "Natali Insta",
                  imgUrl: "http://some-img"
              }
          ],
          tags: [
              "fun",
              "romantic"
          ]
      },
      {
          _id: "s102",
          txt: "Beach Wanderlust, Top Beaches | Top Beach Vacations | Destinations | Travel Photography | Wanderlust | Vacation | Ocean Front View | Beach Aesthetic | Beach Pictures#BeachPictures",
          createdAt: new Date("2024-01-08"),
          imgUrl: [
              "https://res.cloudinary.com/dvtyeanju/image/upload/v1705655392/Beach_Wanderlust_tl7hh0.jpg"
          ],
          by: {
              _id: "u105",
              fullname: "Gal chen",
              username: "gal1234",
              imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660678/Moodboard_09_20__Warm_September_Neutrals_yvnuka.jpg",
          },
          loc: {
              lat: 36.84513,
              lng: -75.97544,
              name: "Beach Wanderlust"
          },
          comments: [
              {
                  id: "c1001",
                  by: {
                      _id: "u105",
                      fullname: "Bob",
                      imgUrl: "http://some-img"
                  },
                  createdAt: new Date("2024-01-08"),
                  txt: "good one!",
                  likedBy: [
                      {
                          _id: "u105",
                          fullname: "Bob",
                          imgUrl: "http://some-img"
                      }
                  ]
              },
              {
                  id: "c1002",
                  by: {
                      _id: "u106",
                      fullname: "Dob",
                      imgUrl: "http://some-img"
                  },
                  createdAt: new Date("2024-01-09"),
                  txt: "not good!"
              }
          ],
          likedBy: [
              {
                  _id: "u105",
                  fullname: "Bob",
                  imgUrl: "http://some-img"
              },
              {
                  _id: "u106",
                  fullname: "Dob",
                  imgUrl: "http://some-img"
              }
          ],
          tags: [
              "fun",
              "romantic"
          ]
      },
      {
        createdAt: new Date("2023-12-20"),
        txt: "Breathtaking ocean view\n\n“If you want to hear the distant voice of the ocean put your ear to the lips of a seashell.” Curtis Tyrone Jones",
          imgUrl: [
              "https://res.cloudinary.com/dvtyeanju/image/upload/v1705655960/yxciicz1kghomrutdkxc.png"
          ],
          by: {
              _id: "u102",
              fullname: "Karin Ness",
              username: "karinNess",
                imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660150/How_to_Swap_Your_Beauty_Staples_for_Clean_Alternatives_That_Really_Work_i8p7au.jpg",
              },
          loc: {
              "lat": null,
              "lng": null,
              "name": ""
          },
          tags: [
              "fun",
              "romantic"
          ],
          _id: "RLe3B",
          comments: [
              {
                createdAt: new Date("2023-12-28"),
                  by: {
                      _id: "u101",
                      username: "Muko",
                      fullname: "Muki Muka",
                      imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
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
                      savedStoryIds: [
                          "s104",
                          "s111",
                          "s123"
                      ]
                  },
                  txt: "So Beautiful! Thank you for sharing! 😍",
                  likedBy: [],
                  id: "UKG4J"
              }
          ]
      },
      {
        createdAt: new Date("2023-11-20"),
          txt: "The prettiest places in London every traveller needs to visit\n\nThe 32 best photo locations in London for capturing the city's most famous views, from Tower Bridge to Big Ben – plus the prettiest neighbourhoods to know about",
          imgUrl: [
              "https://res.cloudinary.com/dvtyeanju/image/upload/v1705656201/damijosko8ox4vr6ahts.png"
          ],
          by: {
              _id: "u102",
              fullname: "Karin Ness",
              username: "karinNess",
              imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660150/How_to_Swap_Your_Beauty_Staples_for_Clean_Alternatives_That_Really_Work_i8p7au.jpg",
             },
          loc: {
              lat: null,
              lng: null,
              name: "London"
          },
          tags: [
              "fun",
              "romantic"
          ],
          _id: "dJKDP",
          comments: [
              {
                createdAt: new Date("2023-11-28"),
                  by: {
                      _id: "u101",
                      username: "Muko",
                      fullname: "Muki Muka",
                      imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
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
                      savedStoryIds: [
                          "s104",
                          "s111",
                          "s123"
                      ]
                  },
                  txt: "They all look so stunning and beautiful! 🍃",
                  likedBy: [],
                  id: "GiAvZ"
              },
              {
                createdAt: new Date("2023-11-23"),
                  by: {
                      _id: "u101",
                      username: "Muko",
                      fullname: "Muki Muka",
                      imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705356114/ongfy2tr14ttjpu8qska.jpg",
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
                      savedStoryIds: [
                          "s104",
                          "s111",
                          "s123"
                      ]
                  },
                  txt: "permission to save and share it",
                  likedBy: [],
                  id: "yDkyo"
              }
          ]
      },
      {
        createdAt: new Date("2024-01-21"),
        txt: "What to do in Lesotho. Best Things to do in the Kingdom in the Sky.\n\nVisit Lesotho and you will know why this tiny country is called \"Kingdom in the Sky\". Here are the best things to do in Lesotho, Africa's mountain Kingdom.",
        imgUrl: [
              "https://res.cloudinary.com/dvtyeanju/image/upload/v1705656576/jzzteidrquboypirfute.png"
          ],
          by: {
              _id: "u105",
              fullname: "Gal chen",
              username: "gal1234",
                imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660678/Moodboard_09_20__Warm_September_Neutrals_yvnuka.jpg",
                },
          loc: {
              lat: null,
              lng: null,
              name: "Lesotho"
          },
          tags: [
              "fun",
              "romantic"
          ],
          _id: "AjB9a"
      },
      {
        txt: "Amazing Paris 😍",
        imgUrl: [
          "https://res.cloudinary.com/dvtyeanju/image/upload/v1705659596/yyx18j1uqxphwzwra6rt.jpg",
          "https://res.cloudinary.com/dvtyeanju/image/upload/v1705659597/edrz9kl81uac6549lucz.jpg",
          "https://res.cloudinary.com/dvtyeanju/image/upload/v1705659598/nc3ygyq0oymt4vrkwr2u.jpg",
          "https://res.cloudinary.com/dvtyeanju/image/upload/v1705659599/rn7obdk9ropifhjaxj0h.png"
        ],
        by: {
          _id: "u104",
          fullname: "Gal chen",
          username: "gal1234",
          imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705660678/Moodboard_09_20__Warm_September_Neutrals_yvnuka.jpg",
           },
        loc: {
          lat: null,
          lng: null,
          name: "Paris"
        },
        tags: [
          "romantic"
        ],
        _id: "cLpCg"
      }
  ]
utilService.saveToStorage(STORAGE_KEY, posts)
}
}

// end post
//   posts = [
//     {
//       _id: "s101",
//       txt: "Mt. Fuji, Japan Best View Travel Guide, Use this Mt. Fuji, Japan Best View Travel Guide for your next trip! Easily one of the most stunning places in Japan, Mt. Fuji has captivated many artists for centuries. It is located on Honshu Island and the mountain can be seen as far away as Tokyo on a clear, sunny day. There are over 25 recognized UNESCO World Heritage Sites that are littered within the vicinity of the mountain",
//       imgUrl: ["https://res.cloudinary.com/dvtyeanju/image/upload/v1705653255/Mt__Fuji_Japan_Best_View_Travel_Guide_gn2ayb.jpg"], //an array for a few pictures
//       by: {
//         _id: "u101",
//         fullname: "Ulash Ulashi",
//         imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1701021596/sdjujydo9sjk0smgn7lv.png", //an array for a few pictures
//       },
//       loc: { // Optional
//         lat: 36.204823,
//         lng: 138.252930,
//         name: "Japan"
//       },
//       comments: [
//         {
//           id: "c1001",
//           by: {
//             _id: "u105",
//             fullname: "Bob",
//             imgUrl: "http://some-img"
//           },
//           txt: "good one!",
//           likedBy: [ // Optional
//             {
//               _id: "u105",
//               fullname: "Bob",
//               imgUrl: "http://some-img"
//             }
//           ]
//         },
//         {
//           id: "c1002",
//           by: {
//             _id: "u106",
//             fullname: "Dob",
//             imgUrl: "http://some-img"
//           },
//           txt: "not good!",
//         }
//       ],
//       likedBy: [
//         {
//           _id: "u105",
//           fullname: "Bob",
//           imgUrl: "http://some-img"
//         },
//         {
//           _id: "u106",
//           fullname: "Dob",
//           imgUrl: "http://some-img"
//         },
//         {
//           _id: 'u302',
//           fullname: "Natali Insta",
//           imgUrl: "http://some-img"
//         }
//       ],
//       tags: ["fun", "romantic"]
//     },
//     {
//       _id: "s102",
//       txt: "Beach Wanderlust, Top Beaches | Top Beach Vacations | Destinations | Travel Photography | Wanderlust | Vacation | Ocean Front View | Beach Aesthetic | Beach Pictures#BeachPictures",
//       imgUrl: ["https://res.cloudinary.com/dvtyeanju/image/upload/v1705655392/Beach_Wanderlust_tl7hh0.jpg"], //an array for a few pictures
//       by: {
//         _id: "u102",
//         fullname: "rbn lol",
//         imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1701022046/e88sua3ge6ajcldn2hcs.png", //an array for a few pictures
//       },
//       loc: { // Optional
//         lat: 36.845130,
//         lng: -75.975440,
//         name: "Beach Wanderlust"
//       },
//       comments: [
//         {
//           id: "c1001",
//           by: {
//             _id: "u105",
//             fullname: "Bob",
//             imgUrl: "http://some-img"
//           },
//           txt: "good one!",
//           likedBy: [ // Optional
//             {
//               _id: "u105",
//               fullname: "Bob",
//               imgUrl: "http://some-img"
//             }
//           ]
//         },
//         {
//           id: "c1002",
//           by: {
//             _id: "u106",
//             fullname: "Dob",
//             imgUrl: "http://some-img"
//           },
//           txt: "not good!",
//         }
//       ],
//       likedBy: [
//         {
//           _id: "u105",
//           fullname: "Bob",
//           imgUrl: "http://some-img"
//         },
//         {
//           _id: "u106",
//           fullname: "Dob",
//           imgUrl: "http://some-img"
//         }
//       ],
//       tags: ["fun", "romantic"]
//     },
//     {
//       _id: "s1034",
//       txt: "Best trip ever 333",
//       imgUrl: ["https://res.cloudinary.com/dvtyeanju/image/upload/v1701021596/sdjujydo9sjk0smgn7lv.png"], //an array for a few pictures
//       by: {
//         _id: "u103",
//         fullname: "gri kol",
//         imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1701021596/sdjujydo9sjk0smgn7lv.png", //an array for a few pictures
//       },
//       loc: { // Optional
//         lat: 11.11,
//         lng: 22.22,
//         name: "Tel Aviv"
//       },
//       comments: [
//         {
//           id: "c1001",
//           by: {
//             _id: "u105",
//             fullname: "Bob",
//             imgUrl: "http://some-img"
//           },
//           txt: "good one!",
//           likedBy: [ // Optional
//             {
//               _id: "u105",
//               fullname: "Bob",
//               imgUrl: "http://some-img"
//             }
//           ]
//         },
//         {
//           id: "c1002",
//           by: {
//             _id: "u106",
//             fullname: "Dob",
//             imgUrl: "http://some-img"
//           },
//           txt: "not good!",
//         }
//       ],
//       likedBy: [
//         {
//           _id: "u105",
//           fullname: "Bob",
//           imgUrl: "http://some-img"
//         },
//         {
//           _id: "u106",
//           fullname: "Dob",
//           imgUrl: "http://some-img"
//         }
//       ],
//       tags: ["fun", "romantic"]
//     },
//     {
//       _id: "s104",
//       txt: "story four",
//       imgUrl: ["https://res.cloudinary.com/dvtyeanju/image/upload/v1701022046/e88sua3ge6ajcldn2hcs.png"], //an array for a few pictures
//       by: {
//         _id: "u1044",
//         fullname: "dana tom",
//         imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1701022046/e88sua3ge6ajcldn2hcs.png", //an array for a few pictures
//       },
//       loc: { // Optional
//         lat: 11.11,
//         lng: 22.22,
//         name: "Tel Aviv"
//       },
//       comments: [
//         {
//           id: "c1001",
//           by: {
//             _id: "u105",
//             fullname: "Bob",
//             imgUrl: "http://some-img"
//           },
//           txt: "good one!",
//           likedBy: [ // Optional
//             {
//               _id: "u105",
//               fullname: "Bob",
//               imgUrl: "http://some-img"
//             }
//           ]
//         },
//         {
//           id: "c1002",
//           by: {
//             _id: "u106",
//             fullname: "Dob",
//             imgUrl: "http://some-img"
//           },
//           txt: "not good!",
//         }
//       ],
//       likedBy: [
//         {
//           _id: "u105",
//           fullname: "Bob",
//           imgUrl: "http://some-img"
//         },
//         {
//           _id: "u106",
//           fullname: "Dob",
//           imgUrl: "http://some-img"
//         }
//       ],
//       tags: ["fun", "romantic"]
//     }
//     ]

//     utilService.saveToStorage(STORAGE_KEY, posts)
  //}
//}
