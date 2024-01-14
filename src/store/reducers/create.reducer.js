export const SET_CREATE_MODAL_DATA = 'SET_CREATE_MODAL_DATA'

const initialState = {
    createModalData: null,
}

export function createReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_CREATE_MODAL_DATA:
            return {
                ...state,
                createModalData: action.createModalData
            }

        default:
            return state
    }
}