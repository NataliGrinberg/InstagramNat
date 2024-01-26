import { useSelector } from 'react-redux'
import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'
import { getUser } from '../store/actions/user.actions.js'
import { getPosts } from '../store/actions/post.actions.js'


const loggedinUser = getUser();//{ _id: 'u302', email: 'Nataliinsta4@gmail.com', fullname: 'Natali Insta', imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1705357431/ztwtgd3rki1rcpfair5m.png" }
const posts = getPosts();

export const postService = {
  query,
  save,
  remove,
  getById,
  createPost,
  getDefaultFilter,
  //loggedinUser,
  getFilterFromParams,
  createComment,
  isLikePost,
  updateLike,
  getPostsOfUser
 
  
}

const STORAGE_KEY = 'posts'


_createPosts()

function getFilterFromParams(searchParams) {

  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) ? (searchParams.get(field) === 'null' ? null : searchParams.get(field)) : defaultFilter[field]
  }

  return filterBy
}


function getSortFromParams(searchParams) {
  const defaultSort = getDefaultSort()
  const sortBy = {}
  for (const field in defaultSort) {
    sortBy[field] = searchParams.get(field) ? (searchParams.get(field) === 'null' ? null : searchParams.get(field)) : ''
  }

  return sortBy
}

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

  if (postToSave._id) {
    return storageService.put(STORAGE_KEY, postToSave)
  } else {
    postToSave.createdAt = Date.now()
    return storageService.post(STORAGE_KEY, postToSave)
  }
}

function isLikePost(post) {

  const find = post?.likedBy ? post?.likedBy.filter(li => li._id === loggedinUser._id) : null
  return (find !== undefined && find !== null && find.length !== 0) ? true : false
}


async function getPostsOfUser(userId) {

  //let posts = await storageService.query(STORAGE_KEY)
  return posts?.filter(post => post.by._id === userId)
}


function createPost() {
 
  return {
      txt: '',
      imgUrl: '', 
      createdAt: '',
      by: {
        _id: loggedinUser._id,
        fullname: loggedinUser.fullname,
        imgUrl: loggedinUser.imgUrl
      },
      loc: { // Optional
        lat: null,
        lng: null,
        name: ''
      },
 
      tags: ["fun", "romantic"]
  
  }
}


function createComment() {
 
  return {
    by: loggedinUser,
    txt: '',
    likedBy: []
  }
}

  function updateLike(post, likePost) {
  
    if (!likePost) {
      const addLike= {
        _id: loggedinUser._id,
        fullname: loggedinUser.fullname,
        imgUrl: loggedinUser.imgUrl
      }
   //   post.likedBy ? post.likedBy.push(addLike) : post.likedBy = [addLike]
   post.likedBy = post.likedBy ?  [...post.likedBy, addLike] :  [addLike]
  }
    else {
      if(post.likedBy) post.likedBy = post.likedBy.filter(like => like._id !== loggedinUser._id) 
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
    txt: '',
    imgUrl: '', //an array for a few pictures 
    createdAt: '',
    by: {
      _id: '',
      fullname: '',
      imgUrl: ''
    },
    loc: { // Optional
      lat: null,
      lng: null,
      name: ''
    },
    comments: [
      {
        id: '',
        createdAt:'',
        by: {
          _id: '',
          fullname: '',
          imgUrl: ''
        },
        txt: '',
        likedBy: [ // Optional
          {
            _id: '',
            fullname: '',
            imgUrl: ''
          }
        ]
      },
      {
        id: '',
        by: {
          _id: '',
          fullname: '',
          imgUrl: ''
        },
        txt: '',
      }
    ],
    likedBy: [
      {
        _id: '',
        fullname: '',
        imgUrl: ''
      },
      {
        _id: '',
        fullname: '',
        imgUrl: ''
      }
    ],
    tags: ["fun", "romantic"]

  }
}

function getDefaultFilter() {
  return {
  }
}


function _createPosts() {
  let posts = utilService.loadFromStorage(STORAGE_KEY)

  if (!posts || !posts.length) {
  posts =  [
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
                  txt: "Painting of Mount Fuji This image is a reflection of the peace and harmony found in the cultural art of Japan. The art of origami similarly creates this sense of wonder and reflection. My character is in a state of bliss and relaxation when performing this art form. This is also a painting my character has hanging on her wall.",
                  likedBy: [],
                  id: "cm5rS"
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








  //**********START */

 