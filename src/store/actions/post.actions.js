import { postService } from "../../services/post.service";
import { ADD_POST, REMOVE_POST, SET_FILTER_BY, SET_POSTS, UNDO_CHANGES, UPDATE_POST } from "../reducers/post.reducer";
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
        const type = post.id ? UPDATE_POST : ADD_POST
        const postToSave = await postService.save(post)
        store.dispatch({ type, post: postToSave })
    } catch (err) {
        console.log('Had issues loading posts', err);
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}