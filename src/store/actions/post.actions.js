import { postService } from "../../services/post.service";
import { ADD_POST, REMOVE_POST, SET_FILTER_BY, SET_POSTS, SET_USER_POSTS, UNDO_CHANGES, UPDATE_POST } from "../reducers/post.reducer";
import { store } from "../store";

export async function loadPosts() {
    try {
        const filterBy = store.getState().postModule.filterBy
        const posts = await postService.query(filterBy)
        store.dispatch({ type: SET_POSTS, posts })

    } catch (err) {
        console.log('Had issues loading posts', err);
        throw err
    }
}

export async function loadUserPosts(user) {
    try {
       //const filterBy = store.getState().postModule.filterBy
       const userPosts = await postService.getPostsOfUser(user._id)
        store.dispatch({ type: SET_USER_POSTS, userPosts })
    } catch (err) {
        console.log('Had issues loading posts', err);
        throw err
    }
}

export async function removePost(postId) {
    try {
        store.dispatch({ type: REMOVE_POST, postId })
        await postService.remove(postId)
    } catch (err) {
        store.dispatch({ type: UNDO_CHANGES })
        console.log('Had issues loading posts', err);
        throw err
    }
}

export async function savePost(post) {
    try {
        const type = post._id ? UPDATE_POST : ADD_POST
        const postToSave = await postService.save(post)
        console.log('postToSave:', postToSave)
        store.dispatch({ type, post: postToSave })
    } catch (err) {
        console.log('Had issues loading posts', err);
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function getPosts() {
    try {
        const posts = JSON.parse(localStorage.getItem("posts"));
        return posts;
    } catch (err) {
        console.log('PostsActions: err in getPosts', err)
    }
}
