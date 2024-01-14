import { store } from './../store';
import { SET_CREATE_MODAL_DATA } from './../reducers/create.reducer';


export function onToggleModalCreate(createModalData = null) {
    store.dispatch({
        type: SET_CREATE_MODAL_DATA,
        createModalData
    })
}

export function onCloseModalCreate() {
    store.dispatch({
        type: SET_CREATE_MODAL_DATA,
        createModalData: null
    })
}