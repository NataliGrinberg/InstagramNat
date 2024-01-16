import { store } from './../store';
import { SET_IMGS, SET_IMGS_URL } from './../reducers/image.reducer';


export function saveImage({type, imgs}) {
    store.dispatch({
        type: SET_IMGS,
        imgs: imgs
    })
}

export function saveImageUrl({type, imgsUrl}) {
    store.dispatch({
        type: SET_IMGS_URL,
        imgsUrl: imgsUrl
    })
}