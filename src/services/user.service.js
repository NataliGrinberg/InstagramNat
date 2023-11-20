import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const loggedinUser = { _id: 'u302' ,email: 'Nataliinsta4@gmail.com', fullname: 'Natali Insta' }

export const userService = {
  query,
  save,
  remove,
  getById,
  createUser,
  getDefaultFilter,
  loggedinUser,
  getFilterFromParams

}

const STORAGE_KEY = 'users'


_createUsers

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

  let users = await storageService.query(STORAGE_KEY)
  //users = await queryFilter(filterBy,users)

  return users
}




async function queryFilter(filterBy, users) {

  console.log("queryFilter", filterBy)
  if (filterBy) {

  }
  return users
}


function getById(id) {
  return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id)
}


function save(userToSave) {
  if (userToSave.id) {
    return storageService.put(STORAGE_KEY, userToSave)
  } else {
    return storageService.post(STORAGE_KEY, userToSave)
  }
}


function createUser(){
    return  {
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

function getDefaultFilter() {
  return {
 
  }
}


function _createUsers() {
  let users = utilService.loadFromStorage(STORAGE_KEY)
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
    }
    ]


    utilService.saveToStorage(STORAGE_KEY, users)
  }
}


