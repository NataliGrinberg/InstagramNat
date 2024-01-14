import { useState } from "react"
import { uploadService } from "../services/upload.service"
import { Svgs } from "../assets/Svgs"

export function Create() {
    const [imageSelected, setImageSelected] = useState(null)

    async function uploadImageSelected() {
        const retuenImgData = await uploadService.uploadImg(imageSelected)
        console.log('retuenImgData', retuenImgData.secure_url)
    }

    function onCloseModal() {

    }

    return (
        <div>
            {/* <div className="create-post-opacity">
                <div className="create-post-opacity-button" onClick={onCloseModal}>{Svgs.closeWhite}</div>
            </div>
            <article className="create-post-model">
                <div className="line" >Create new post</div>

                <div>
                    {Svgs.IconToRepresent}
                    <br />
                    <input type="file" onChange={(event) =>{
                        setImageSelected(event) 
                        console.log(imageSelected)
                    }
                    }/>
                    <button type="file" onClick={uploadImageSelected}>Select from computer</button>

                </div>
            </article> */}
        </div>







    )
}