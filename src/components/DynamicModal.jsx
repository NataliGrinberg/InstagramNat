import { useDispatch, useSelector } from "react-redux"
import { SET_MODAL_DATA } from "../store/reducers/app.reducer"
import { Likes } from "./Likes"
import { Comments } from "./Comments"
import { Svgs } from "../assets/Svgs"
import { Share } from "./Share"
import { MoreOptions } from "./MoreOptions"



export function DynamicModal() {
    const modalData = useSelector(storeState => storeState.appModule.modalData)
    const dispatch = useDispatch()
    function onCloseModal(ev) {
        dispatch({
            type: SET_MODAL_DATA,
            modalData: null
        })
    }

    if (!modalData) return <></>
    return (
        <div >
            <div className="dynamic-modal-opacity">
            </div>
            <div className="dynamic-modal" onClick={modalData.cb}>
                <div className="dynamic-modal-button" onClick={onCloseModal}>{Svgs.closeWhite}</div>
                <DynamicCmp type={modalData.type} />
                {/* {modalData.cmp} */}
            </div>
        </div>
    )
}
//payload={modalData.payload} , payload 
function DynamicCmp({ type }) {
    console.log(type);
    const cmpMap = {
        Comments: <Comments />,
        Likes: <Likes />,
        Share: <Share />,
        MoreOptions: <MoreOptions />
    }

    const CmpToRender = cmpMap[type]
    return CmpToRender
}




