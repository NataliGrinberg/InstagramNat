export const uploadService = {
    uploadImg
}

async function uploadImg(file) {
    
    const CLOUD_NAME = "dvtyeanju"
    const UPLOAD_PRESET = "j5fzmycx"
    let include_image = file.type.includes("image");
    let include_videv = file.type.includes("video");

    const UPLOAD_URL = include_image ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload` 
    : include_videv ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload` 
        : '';
        
        if(UPLOAD_URL === '' )
        {
            console.error('Failed to upload type not found') 
            throw new Error('Failed to upload, type not found') 
        }


    // const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    // const UPLOAD_URL_V = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`

    try {
        const formData = new FormData()
        formData.append('upload_preset', UPLOAD_PRESET)
        formData.append('file', file)
   

        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const imgData = await res.json()
        console.log('imgData', imgData)

        return imgData
    } catch (err) {
        console.error('Failed to upload', err)
        throw err
    }
}

