import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'


const loggedinUser = { _id: 'u302', email: 'Nataliinsta4@gmail.com', fullname: 'Natali Insta', imgUrl: '' }

export const postService = {
  query,
  save,
  remove,
  getById,
  createPost,
  getDefaultFilter,
  loggedinUser,
  getFilterFromParams,
  createComment,
  isLikePost,
  updateLike
 
  
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
    return storageService.post(STORAGE_KEY, postToSave)
  }
}

function isLikePost(post) {
  
  const user = loggedinUser;
  const find = post?.likedBy ? post?.likedBy.filter(li => li._id === user._id) : null

  return (find !== undefined && find !== null && find.length !== 0) ? true : false
}


function createPost() {
  return {
      txt: '',
      imgUrl: '', 
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
    posts = [
      {
        _id: "s101",
        txt: "Best trip ever 1",
        imgUrl: ["https://res.cloudinary.com/dvtyeanju/image/upload/v1701021596/sdjujydo9sjk0smgn7lv.png"], //an array for a few pictures 
        by: {
          _id: "u101",
          fullname: "Ulash Ulashi",
          imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1701021596/sdjujydo9sjk0smgn7lv.png", //an array for a few pictures 
        },
        loc: { // Optional
          lat: 11.11,
          lng: 22.22,
          name: "Tel Aviv"
        },
        comments: [
          {
            id: "c1001",
            by: {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img"
            },
            txt: "good one!",
            likedBy: [ // Optional
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
            txt: "not good!",
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
            _id: 'u302',
            fullname: "Natali Insta",
            imgUrl: "http://some-img"
          }
        ],
        tags: ["fun", "romantic"]
      },
      {
        _id: "s102",
        txt: "story two",
        imgUrl: ["https://res.cloudinary.com/dvtyeanju/image/upload/v1701022046/e88sua3ge6ajcldn2hcs.png"], //an array for a few pictures 
        by: {
          _id: "u102",
          fullname: "rbn lol",
          imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1701022046/e88sua3ge6ajcldn2hcs.png", //an array for a few pictures 
        },
        loc: { // Optional
          lat: 11.11,
          lng: 22.22,
          name: "Tel Aviv"
        },
        comments: [
          {
            id: "c1001",
            by: {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img"
            },
            txt: "good one!",
            likedBy: [ // Optional
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
            txt: "not good!",
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
        tags: ["fun", "romantic"]
      },
      {
        _id: "s1034",
        txt: "Best trip ever 333",
        imgUrl: ["https://res.cloudinary.com/dvtyeanju/image/upload/v1701021596/sdjujydo9sjk0smgn7lv.png"], //an array for a few pictures 
        by: {
          _id: "u103",
          fullname: "gri kol",
          imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1701021596/sdjujydo9sjk0smgn7lv.png", //an array for a few pictures 
        },
        loc: { // Optional
          lat: 11.11,
          lng: 22.22,
          name: "Tel Aviv"
        },
        comments: [
          {
            id: "c1001",
            by: {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img"
            },
            txt: "good one!",
            likedBy: [ // Optional
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
            txt: "not good!",
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
        tags: ["fun", "romantic"]
      },
      {
        _id: "s104",
        txt: "story four",
        imgUrl: ["https://res.cloudinary.com/dvtyeanju/image/upload/v1701022046/e88sua3ge6ajcldn2hcs.png"], //an array for a few pictures 
        by: {
          _id: "u1044",
          fullname: "dana tom",
          imgUrl: "https://res.cloudinary.com/dvtyeanju/image/upload/v1701022046/e88sua3ge6ajcldn2hcs.png", //an array for a few pictures 
        },
        loc: { // Optional
          lat: 11.11,
          lng: 22.22,
          name: "Tel Aviv"
        },
        comments: [
          {
            id: "c1001",
            by: {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img"
            },
            txt: "good one!",
            likedBy: [ // Optional
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
            txt: "not good!",
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
        tags: ["fun", "romantic"]
      }
    ]

    utilService.saveToStorage(STORAGE_KEY, posts)
  }
}


