import { useEffect, useState } from "react"
import { uploadService } from "../../services/upload.service"
import { useSelector } from "react-redux"
import { postService } from "../../services/post.service"
import InputEmoji from 'react-input-emoji'
import { savePost } from "../../store/actions/post.actions"
import { onCloseModalCreate, onToggleModalCreate } from "../../store/actions/create.actions"
import { Svgs } from '../../assets/Svgs'
import { PostPreviewImg } from "../PostPreviewImg"
import { SET_IMGS_URL } from "../../store/reducers/image.reducer"

export function CreatePost() {

    const imageModalData = useSelector(storeState => storeState.imageModal.imgs)
    const imageModalUrlData = useSelector(storeState => storeState.imageModal.imgsUrl)
    const [text, setText] = useState("")
    const newPost = postService.createPost


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
        const files = Array.from(imageModalData.target.files);
        for (let i = 0; i < files.length; i++) {
            returnImgDataUrl = await uploadService.uploadImg(files[i])
            console.log('retuenImgData', returnImgDataUrl.secure_url)
            newPost.imgUrl = newPost.imgUrl ? [...newPost.imgUrl, returnImgDataUrl.secure_url] : [returnImgDataUrl.secure_url]
        }
        // newPost.imgUrl = await uploadImageSelected() //newPost.imgUrl ? [...newPost.imgUrl, retuenImgData.secure_url] : [retuenImgData.secure_url]
        newPost.txt = text
        savePost(newPost)
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
                <div className="createPost-container-data-img">
                    <PostPreviewImg imgUrl={[]} />
                </div>

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