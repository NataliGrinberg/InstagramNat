
export const SET_IMGS = 'SET_IMGS'
export const SET_IMGS_URL = 'SET_IMGS_URL'
export const ADD_IMG = 'ADD_IMG'
export const REMOVE_IMG = 'REMOVE_IMG'


const initialState = {
    imgs: null,
    imgsUrl: null
}

export function imageReducer(state = initialState, action = {}) {
    
    switch (action.type) {
        case SET_IMGS:
            return {
                ...state,
                imgs: action.imgs
            }
        case ADD_IMG:
            return {
                ...state,
                imgs: [...state.imgs, action.img]
            }
            case SET_IMGS_URL:
                return {
                    ...state,
                    imgsUrl: action.imgsUrl
                }

        // case REMOVE_IMG:
        //     return {
        //         ...state,
        //         imgs: state.imgs.filter(img => imgs.id !== action.img),
                

        //     }
       
        default:
            return state
    }
}