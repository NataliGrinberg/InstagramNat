import { postService } from "../../services/post.service"

export const SET_POSTS = "SET_POSTS"
export const SET_USER_POSTS = "SET_USER_POSTS"
export const ADD_POST = "ADD_POST"
export const REMOVE_POST = "REMOVE_POST"
export const UPDATE_POST = "UPDATE_POST"
export const SET_FILTER_BY = "SET_FILTER_BY"
export const UNDO_CHANGES = "UNDO_CHANGES"

const initialState = {
  posts: null,
  userPosts: null,
  filterBy: postService.getDefaultFilter(),
  lastposts: [],
}

export function postReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts,
      }
    case ADD_POST:
      const posts = state.posts || []
      const userPosts = state.userPosts || []
      return {
        ...state,
        posts: [action.post, ...posts],
        userPosts: [action.post, ...userPosts]
      }
    case REMOVE_POST:
      const lastPosts = [...state.posts]
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.postId),
        lastPosts,
      }
    case UPDATE_POST:
      const postsUpdate = state.posts || []
      const userPostsUpdate = state.userPosts || []
      return {
        ...state,
        posts: postsUpdate.map((post) =>
          post._id === action.post._id ? action.post : post
        ),
        userPosts: userPostsUpdate.map((post) =>
          post._id === action.post._id ? action.post : post
        ),
      }
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: { ...action.filterBy },
      }
    case UNDO_CHANGES:
      return {
        ...state,
        posts: [...state.lastPosts],
      }
    case SET_USER_POSTS:
      return {
        ...state,
        userPosts: action.userPosts,
      }
    default:
      return state
  }
}
