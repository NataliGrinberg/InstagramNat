import { useState } from "react"
import { uploadService } from "../services/upload.service"

export function Create() {
    const [imageSelected, setImageSelected] = useState(null)

    async function uploadImageSelected()
{
    const retuenImgData = await uploadService.uploadImg(imageSelected)
    console.log('retuenImgData',retuenImgData.secure_url)
}


    return (
        <div>create page <br/>
            <input type="file" onChange={(event) =>
                setImageSelected(event)} />
            <button onClick={uploadImageSelected}>Upload Image</button>
        </div>

    )
}