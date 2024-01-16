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


    function handleChange(event) {
        const files = Array.from(event.target.files);
        console.log('event:', files)
        saveImage({ type: SET_IMGS, imgs: event })

        //uploadImageSelected()
        
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