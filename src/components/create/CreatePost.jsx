import { useEffect, useState } from "react";
import { uploadService } from "../../services/upload.service";
import { useSelector } from "react-redux";
import { postService } from "../../services/post.service";
import InputEmoji from "react-input-emoji";
import { savePost } from "../../store/actions/post.actions";
import {
  onCloseModalCreate,
  onToggleModalCreate,
} from "../../store/actions/create.actions";
import { Svgs } from "../../assets/Svgs";
import { PostPreviewImg } from "../PostPreviewImg";
import { SET_IMGS, SET_IMGS_URL } from "../../store/reducers/image.reducer";
import { saveImage, saveImageUrl } from "../../store/actions/image.actions";
import Picker from "emoji-picker-react";
import { none } from "@cloudinary/url-gen/qualifiers/fontHinting";

export function CreatePost() {
  const imageModalData = useSelector(
    (storeState) => storeState.imageModal.imgs
  );
  const imageModalUrlData = useSelector(
    (storeState) => storeState.imageModal.imgsUrl
  );
  const files = Array.from(imageModalData.target.files);
  const [text, setText] = useState("");
  const newPost = postService.createPost();
  const [imgCount, setImgCount] = useState(0);
  const maxCharacterCount = 2200;
  const [isloading, setIsloading] = useState(false)

  const [filesMap, setFilesMap] = useState(
    imageModalUrlData
      ? imageModalUrlData
      : files.map((file) => {
          {
            return {
              file: file,
              type: file.type.includes("video") ? "video" : "image",
              url: URL.createObjectURL(file),
              filter: "",
            };
          }
        })
  );

  //const [chosenEmoji, setChosenEmoji] = useState(null);

  // const onEmojiClick = (event, emojiObject) => {
  //     setChosenEmoji(emojiObject);

  //     console.log('emojiObject:', { chosenEmoji });
  //     setText(text + emojiObject.target)

  // };

  const [showEmojis, setShowEmojis] = useState(false);

  async function saveNewPost() {
    setIsloading(true)
    let returnImgDataUrl = "";
    const files = imageModalUrlData
      ? Array.from(imageModalUrlData.map((i) => i.file))
      : Array.from(imageModalData.target.files);

    for (let i = 0; i < files.length; i++) {
      returnImgDataUrl = await uploadService.uploadImg(files[i]);
      console.log("retuenImgData", returnImgDataUrl.secure_url);
      newPost.imgUrl = newPost.imgUrl
        ? [...newPost.imgUrl, returnImgDataUrl.secure_url]
        : [returnImgDataUrl.secure_url];
    }
    // newPost.imgUrl = await uploadImageSelected() //newPost.imgUrl ? [...newPost.imgUrl, retuenImgData.secure_url] : [retuenImgData.secure_url]
    newPost.txt = text;
    savePost(newPost);

    saveImageUrl({ type: SET_IMGS_URL, imgsUrl: null });
    saveImage({ type: SET_IMGS, imgs: null });
    setIsloading(false)
    onCloseModalCreate();
  }

  function handleChange(event) {
    const inputText = event.target.value;
    if (inputText.length <= maxCharacterCount) {
      setText(inputText);
    }
  }

  return (
    <div className="createPost-container">

      {isloading && <div className="loader"></div>}

      <div className="upload-img-model-title-filter">
        <div
          className="filter-back-btn"
          onClick={() => {
            onToggleModalCreate({ type: "FilterImg" });
          }}
        >
          <div className="filter-back-btn-svg">{Svgs.back}</div>
        </div>
        <div className="upload-img-title">
          <div className="upload-img-title-div">Create new post</div>
        </div>
        <div className="upload-img-title-btn">
          <div className="filter-next-btn" onClick={saveNewPost}>
            Share
          </div>
        </div>
      </div>

      {/* <div className="create-post-back-btn" onClick={() => { onToggleModalCreate({ type: 'FilterImg' }) }}>{Svgs.back}</div>
                <div className="createPost-titel-create" >Create new post</div>
                <div className="createPost-titel-btn-share" onClick={saveNewPost}>Share</div>
            </div> */}

      <div className="createPost-container-data">
        {/* <div className="createPost-container-data-img"> */}
        <div className="create-post-filter-img-data">
          {/* <div className="post-filter-preview"> */}
          {imgCount > 0 && (
            <div
              onClick={() => {
                setImgCount(imgCount - 1);
              }}
              aria-label="Go Back"
              className="button-back-img"
            ></div>
          )}

          {filesMap.length > 0 &&
            filesMap[imgCount].url !== null &&
            ((filesMap[imgCount].type === "video" && (
              <video controls className="post-img-style">
                <source
                  src={filesMap[imgCount].url}
                  type="video/mp4"
                  autoPlay={true}
                />
              </video>
            )) || (
              <img className="post-img-style" src={filesMap[imgCount].url} />
            ))}

          {filesMap.length - 1 > imgCount && (
            <div
              onClick={() => {
                setImgCount(imgCount + 1);
              }}
              aria-label="Next"
              className="button-next-img"
            ></div>
          )}
        </div>
        {/* </div> */}

        <div className="createPost-container-data">
          <div className="createPost-container-data-scroll">
            <div className="createPost-container-data-con">
              <div className="createPost-container-data-profile">
                <div className="createPost-container-data-profile-flex">
                  <div className="createPost-container-data-profile-img-div">
                    {" "}
                    <img
                      className="createPost-container-data-profile-img"
                      src={newPost.by.imgUrl}
                    />
                  </div>
                  <div className="createPost-container-data-profile-user-name">
                    {newPost?.by?.fullname}
                  </div>
                </div>
              </div>

              <div className="createPost-container-data-txt-2">
                <div className="createPost-container-data-txt3">
                  <textarea
                    className="createPost-container-data-txt"
                    value={text}
                    onChange={handleChange}
                    placeholder="Write a caption..."
                  />
                </div>

                <div className="create-post-flex-emoji-count-txt create-post-divs">
                  <div className="create-post-divs-flex">
                    <button
                      className="button2"
                      onClick={() => setShowEmojis(!showEmojis)}
                    >
                      {Svgs.smi}
                    </button>
                    <div className="create-post-result">
                      <div className="create-post-result-div">
                        {text.length?.toLocaleString()}/
                        {maxCharacterCount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* {showEmojis && (
                                    <div className="create-post-show-emojis">
                                        <Picker onEmojiClick={onEmojiClick} />
                                    </div>
                                )} */}
              </div>

              <div className="createPost-container-data-add-location create-post-divs">
                <div className="create-post-divs-flex">
                  <div className="createPost-container-data-add-location-div">
                    {" "}
                    Add location
                  </div>
                  <div className="createPost-container-data-add-location-div1">
                    {" "}
                    {Svgs.location}
                  </div>
                </div>
              </div>
              <div className="createPost-container-data-accessibility create-post-divs">
                <div className="create-post-divs-flex">
                  <div className="createPost-container-data-accessibility-div">
                    {" "}
                    Accessibility{" "}
                  </div>
                  <div className="createPost-container-data-accessibility-div1">
                    {" "}
                    {Svgs.down}{" "}
                  </div>
                </div>
              </div>
              <div className="createPost-container-data-advanced-settings create-post-divs">
                <div className="create-post-divs-flex">
                  <div className="createPost-container-data-advanced-settings-div">
                    Advanced settings{" "}
                  </div>
                  <div className="createPost-container-data-advanced-settings-div1">
                    {Svgs.down}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
