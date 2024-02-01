import { useSelector } from "react-redux"
import { UploadImg } from "../components/create/UploadImg"
import { FilterImg } from "../components/create/FilterImg"
import { CreatePost } from "../components/create/CreatePost"
import { Svgs } from "../assets/Svgs"
import { onCloseModalCreate } from "../store/actions/create.actions"
import { saveImage, saveImageUrl } from "../store/actions/image.actions"
import { SET_IMGS, SET_IMGS_URL } from "../store/reducers/image.reducer"

export function CreateDynamicModal() {
  const createModalData = useSelector(
    (storeState) => storeState.createModule.createModalData
  )

  if (!createModalData) return <></>
  return (
    <div>
      <div className="create-dynamic-modal-opacity">
        <div
          className="create-dynamic-modal-button"
          onClick={() => {
            
            saveImageUrl({ type: SET_IMGS_URL, imgsUrl: null })
            saveImage({ type: SET_IMGS, imgs: null })
            onCloseModalCreate()
  }} >
          <div className="create-dynamic-modal-button-div">
            <div className="svgg">{Svgs.close}</div>
          </div>
        </div>

        <div className="create-dynamic-modal">
          <div className="create-dynamic-modal-div">
            <DynamicCmp type={createModalData.type} />
          </div>
        </div>
      </div>
    </div>
  )
}

function DynamicCmp(props) {
  const cmpMap = {
    UploadImg: <UploadImg {...props} />,
    FilterImg: <FilterImg {...props} />,
    CreatePost: <CreatePost {...props} />,
  }

  const CmpToRender = cmpMap[props.type]
  return CmpToRender
}
