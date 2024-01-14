import { useRef } from "react";
import { Svgs } from "../../assets/Svgs"
import { onToggleModalCreate } from "../../store/actions/create.actions"
import { saveImage, saveImageUrl } from "../../store/actions/image.actions"
import { SET_IMGS, SET_IMGS_URL } from "../../store/reducers/image.reducer"
import { uploadService } from "../../services/upload.service";
import { useSelector } from "react-redux";

export function UploadImg() {

    const hiddenFileInput = useRef(null);

    function handleClick(event) {
        hiddenFileInput.current.click();
    };

    // async function uploadImageSelected() {
    //     console.log("returnImgDataUrl insert 1111")
    //     let returnImgData = ''
    //     let returnImgDataUrl = []
    //     const imageModalData = useSelector(storeState => storeState.imageModal.imgs)
    //     console.log("returnImgDataUrl insert 12222:", imageModalData)
    //     const files = Array.from(imageModalData.target.files);
    //     console.log("returnImgDataUrl insert 12222:", files)
    //     for (let i = 0; i < files.length; i++) {
    //         returnImgData = await uploadService.uploadImg(files[i])
    //         console.log('retuenImgData', returnImgData.secure_url)
    //         returnImgDataUrl =  [...returnImgDataUrl, returnImgDataUrl.secure_url] 
    //     }
    //     console.log("returnImgDataUrl: ", returnImgDataUrl)
    //     debugger
    //     saveImageUrl({ type: SET_IMGS_URL, imgsUrl: returnImgDataUrl }) 
    // }


    function handleChange(event) {
        
        saveImage({ type: SET_IMGS, imgs: event })
    //    uploadImageSelected()
        
        onToggleModalCreate({ type: 'FilterImg' })
    };

    return (
        <div className="upload-img-model-container">
            <div className="upload-img-model-title" >
                <div className="upload-img-model-title-div">Create new post</div>
            </div>

            <div className="upload-img-model">

                <div className="upload-img-model-svg">
                    {Svgs.IconToRepresent}
                </div>

                <div className="upload-img-model-txt">
                    <span className="upload-img-model-txt-span">
                        Drag photos and videos here
                    </span>
                </div>

                <div className="upload-img-model-input">
                    <div className="upload-img-model-input-div">
                        <div>
                            <button
                                className="upload-img-model-button" onClick={handleClick}>
                                Select from computer </button>
                            <input
                                type="file"
                                onChange={handleChange}
                                ref={hiddenFileInput}
                                style={{ display: 'none' }}
                                multiple
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}