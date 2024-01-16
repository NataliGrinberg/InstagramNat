import { useEffect, useState } from "react"
import { uploadService } from "../../services/upload.service"
import { useSelector } from "react-redux"
import { postService } from "../../services/post.service"
import InputEmoji from 'react-input-emoji'
import { savePost } from "../../store/actions/post.actions"
import { onCloseModalCreate, onToggleModalCreate } from "../../store/actions/create.actions"
import { Svgs } from '../../assets/Svgs'
import { PostPreviewImg } from "../PostPreviewImg"
import { SET_IMGS, SET_IMGS_URL } from "../../store/reducers/image.reducer"
import { saveImage, saveImageUrl } from "../../store/actions/image.actions"

export function CreatePost() {

    const imageModalData = useSelector(storeState => storeState.imageModal.imgs)
    const imageModalUrlData = useSelector(storeState => storeState.imageModal.imgsUrl)
    const [text, setText] = useState("")
    const newPost = postService.createPost()
    const [imgCount, setImgCount] = useState(0)
    debugger
   
    
    const [filesMap, setFilesMap] = useState(imageModalUrlData ? imageModalUrlData : files.map((file) => {
        { return { 'file': file, 'type': (file.type.includes('video') ? 'video' : 'image'), 'url': URL.createObjectURL(file), 'filter': '' } }
    }))
console.log('imageModalUrlData creat:', imageModalUrlData)
    // async function uploadImageSelected() {
    //     let retuenImgData = ''
    //     let retuenImgDataUrl = []
    //     const files = Array.from(imageModalData.target.files);
    //     for (let i = 0; i < files.length; i++) {
    //         retuenImgData = await uploadService.uploadImg(files[i])
    //         console.log('retuenImgData', retuenImgData.secure_url)
    //         retuenImgDataUrl =  [...retuenImgDataUrl, retuenImgData.secure_url] 
    //     }
    //     return retuenImgDataUrl;

    // }


    //const files = Array.from(imageModalData.target.files);
    //const filesUrl = files.map(file => URL.createObjectURL(file))


    //const newPost = postService.createPost()

    // async function uploadImageSelected() {
    //     let returnImgDataUrl = ''
    //     const files = Array.from(imageModalData.target.files);
    //     for (let i = 0; i < files.length; i++) {
    //         returnImgDataUrl = await uploadService.uploadImg(files[i])
    //         console.log('retuenImgData', returnImgDataUrl.secure_url)
    //         newPost.imgUrl = newPost.imgUrl ? [...newPost.imgUrl, returnImgDataUrl.secure_url] : [returnImgDataUrl.secure_url]
    //     }

    // //     //setRetuenImgData(newPost.imgUrl)
    // // }




    // const files = Array.from(imageModalData.target.files);
    // for (let i = 0; i < files.length; i++) {
    //     retuenImgData = await uploadService.uploadImg(files[i])
    //     console.log('retuenImgData', retuenImgData.secure_url)
    //     newPost.imgUrl = newPost.imgUrl ? [...newPost.imgUrl, retuenImgData.secure_url] : [retuenImgData.secure_url]
    // }

    async function saveNewPost() {
        let returnImgDataUrl = ''
        const files = imageModalUrlData ?  Array.from(imageModalUrlData.map(i=> i.file)) :  Array.from(imageModalData.target.files)
      
        //const files = Array.from(imageModalData.target.files);
        for (let i = 0; i < files.length; i++) {
            returnImgDataUrl = await uploadService.uploadImg(files[i])
            console.log('retuenImgData', returnImgDataUrl.secure_url)
            newPost.imgUrl = newPost.imgUrl ? [...newPost.imgUrl, returnImgDataUrl.secure_url] : [returnImgDataUrl.secure_url]
        }
        // newPost.imgUrl = await uploadImageSelected() //newPost.imgUrl ? [...newPost.imgUrl, retuenImgData.secure_url] : [retuenImgData.secure_url]
        newPost.txt = text
        savePost(newPost)
        saveImageUrl({ type: SET_IMGS_URL, imgsUrl: null })
        saveImage({ type: SET_IMGS, imgs: null })
        onCloseModalCreate()
    }

    
    const maxCharacterCount = 2200; // Set your desired maximum character count

    const handleChange = (event) => {
      const inputText = event.target.value;
      if (inputText.length <= maxCharacterCount) {
        setText(inputText);
      }
    };


    return (
        <div className="createPost-container">

            <div className="createPost-titel">
                <div className="filter-back-btn" onClick={() => { onToggleModalCreate({ type: 'FilterImg' }) }}>{Svgs.back}</div>
                <div className="createPost-titel-create" >Create new post</div>
                <div className="createPost-titel-btn-share" onClick={saveNewPost}>Share</div>
            </div>

            <div className="createPost-container-data">
                {/* <div className="createPost-container-data-img"> */}
                <div className="create-post-filter-img-data">
                    {/* <div className="post-filter-preview"> */}
                    {(imgCount > 0) &&
                        <button onClick={() => { setImgCount(imgCount - 1) }}
                            aria-label="Go Back" className=" _afxv _al46 _al47" >
                            <div className=" _9zm0"></div>
                        </button>
                    }

                    {

                        filesMap.length > 0 && filesMap[imgCount].url !== null
                        && ((filesMap[imgCount].type === 'video'
                            && <video controls width="100%">
                                <source src={filesMap[imgCount].url} type="video/mp4" autoPlay={true} />
                            </video>)
                            || (<img className={`post-img-style`} src={filesMap[imgCount].url} />))

                    }

                    {((filesMap.length - 1) > imgCount) &&
                        <button onClick={() => { setImgCount(imgCount + 1) }} aria-label="Next" className=" _afxw _al46 _al47">
                            <div className="_9zm2"></div>
                        </button>
                    }
                </div>
                {/* </div> */}

                <div className="createPost-container-data-pro">
                    <div className="createPost-container-data-pro">
                        profile
                    </div>
                    <div className="createPost-container-data-txt">

                        <div className="container">
                            <textarea
                                value={text}
                                onChange={handleChange}
                                placeholder="Type something..."
                                // rows={4}
                                // cols={50}
                            />
                            <div className="result">
                                {text.length}/{maxCharacterCount}
                            </div>
                        </div>
                        {/* <InputEmoji
                            className="input-text-post"
                            value={text}

                            onChange={(ev) => {
                                setText(ev);
                            }}
                        /> */}
                    </div>
                </div>
            </div>



            {/* <AutoComplete/> */}

        </div>
    )
}