import { postService } from "../../services/post.service";

export const SET_POSTS = 'SET_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const UNDO_CHANGES = 'UNDO_CHANGES'

const initialState = {
    posts: null,
    filterBy: postService.getDefaultFilter(),
    lastposts: []
}

export function postReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.post]
            }

        case REMOVE_POST:
            const lastPosts = [...state.posts]
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.postId),
                lastPosts

            }
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.post._id ? action.post : post)
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }
        case UNDO_CHANGES:
            return {
                ...state,
                posts: [...state.lastPosts]
            }
        default:
            return state
    }
}