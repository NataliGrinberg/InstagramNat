import { useEffect, useState } from "react"
import { CommentDetails } from "./CommentDetails"
import { useForm } from "../customHooks/useForm"
import { postService } from "../services/post.service"

import { InputEmojiChat } from "../components/InputEmojiChat"

import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom"
import { savePost } from "../store/actions/post.actions"
import { PostPreviewImg } from "../components/PostPreviewImg"
import { Svgs } from "../assets/Svgs"
import { Comments } from "../components/Comments"
import { CreatePost } from "../components/create/CreatePost"
import { PostPreviewIcons } from "../components/PostPreviewIcons"
import { onToggleModal } from "../store/actions/app.actions"

export function PostDetails() {
  const [post, setPost] = useState(null)
  const { addLikeToPost } = useOutletContext()
  const { postId } = useParams()
  const [likePost, setLikePost] = useState(postService.isLikePost(post))
  const navigate = useNavigate()

  useEffect(() => {
    console.log('insert to details')
    loadPost()
  }, [postId])

  // useEffect(() => {}, [post])

  useEffect(() => {
    var likeByUser = postService.isLikePost(post)
    setLikePost(likeByUser)
  }, [post?.likedBy])

  async function loadPost() {
    const post = await postService.getById(postId)
    setPost(post)
  }

  async function addCommentToPost(comment) {
    const postToSave = structuredClone(post)
    postToSave.createdAt = new Date()
    postToSave.comments = post.comments
      ? [...post.comments, comment]
      : [comment]
    setPost(postToSave)
    await savePost(postToSave)
  }
  formetDate()
  function formetDate() {
    //if (dateP === null || dateP === "") return
    const dateP = new Date("2024-01-20")
    const nowd = new Date()

    var difference = nowd.getTime() - dateP.getTime()
    if (difference < 0) {
      console.log("error in date")
    } else {
      //   let difference2 = difference / 1000
      //   let hourDifference = Math.floor(difference2 / 3600)
      //   difference2 -= hourDifference * 3600
      //  console.log("hourDifference:", hourDifference)

      //   const today = new Date()
      //   const yyyy = today.getFullYear()
      //   let mm = today.getMonth() + 1 // Months start at 0!
      //   let dd = today.getDate()

      //   if (dd < 10) dd = "0" + dd
      //   if (mm < 10) mm = "0" + mm

      //   const formattedToday = dd + "/" + mm + "/" + yyyy

      // console.log("formattedToday:", formattedToday)

      // test it
      const a = new Date("2023-12-01")
      const b = new Date("2024-01-01")

      const days = dateDiffInDays(a, b)
      //console.log("difference: " + days + " days")

      if (days > 7) {
        const weeks = Math.round(days / 7)
        console.log("weeks: " + weeks + " weeks")
        if (weeks > 4) {
          console.log("weeks: " + weeks + " mounth")
        }
      } else {
        if (days === 0) {
          var difference = a.getTime() - b.getTime()
          let difference2 = difference / 1000
          let hourDifference = Math.floor(difference2 / 3600)
          difference2 -= hourDifference * 3600
          console.log("hours: " + difference2 + " hours")
        } else console.log("days: " + days + " days")
      }
    }
  }

  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

    return Math.floor((utc2 - utc1) / _MS_PER_DAY)
  }

  if (!post) return <div>Suggested Posts</div>

  return (
    <section className="section-post-details">
      <div className="create-post-details-opacity">
        <div className="create-post-details-button">
          <div className="create-post-details-button-div">
            <div className="svg-postDetails" onClick={() => {console.log("close in"); window.history.go(-1)}}>
              {Svgs.close}
            </div>
          </div>
        </div>

        {/* ********************************container***************************************** */}
        <div className="post-details-container">
          {/* *********************************img************************************** */}
          <div className="post-details-container-imgs">
            <PostPreviewImg imgUrl={post.imgUrl} />
          </div>
          {/* *********************************end img***************************************** */}

          {/* *******************************data************************************** */}
          <div className="post-details-container-data">
            {/* *******************************profile*************************************** */}
            <div className="post-details-container-data-profile">
              {" "}
              {/*empty */}
              <div className="post-details-user-info">
                <div className="post-details-user-info-container">
                  <div className="post-details-user-container-img">
                    <img className="img" src={post.by.imgUrl} />
                  </div>
                  <div className="container-data">
                    <div className="container-data-div">
                      <div className="container-data-fullName-date">
                        <div className="container-data-fullName">
                          {post.by.fullname}
                        </div>
                        <div className="container-data-date">
                          <span className="container-data-date-span">·</span>
                          <div className="container-data-date-div">
                            {post?.createdAt}
                          </div>
                        </div>
                      </div>
                      <div className="container-data-loc">
                        {post?.loc?.name}
                      </div>
                    </div>
                  </div>

                  <div
                    className="container-moreOptions"
                    onClick={() => {
                      onToggleModal({ type: "MoreOptions" })
                    }}
                  >
                    {" "}
                    {Svgs.more3Points}
                  </div>
                </div>
              </div>
            </div>

            {/* *******************************end profile***************************************** */}

            {/* ***********************************all data************************************* */}
            <div className="post-details-container-data-details">
              {/* ***********************************name img comments************************************* */}

              <div className="post-details-user-info-container">
                <div className="post-details-user-container-img">
                  <img className="img" src={post.by.imgUrl} />
                </div>
                {/* 
                                <div className="postDetails-container-data-details-1-txt"> */}
                <div className="post-icons-info-text">
                  <div className="post-icons-info-text-fullName">
                    {post.by.fullname}
                  </div>
                  <span className="post-icons-info-text-more">
                    <span className="post-icons-info-text-txt">{post.txt}</span>
                  </span>
                </div>
                {/* </div> */}
              </div>
              <div className="empty-div"></div>
              <div className="postDetails-container-data-details-1-comments">
                <Comments />
              </div>
            </div>

            {/* ***********************************end name img comment ************************************ */}

            {/* **********************************icons************************************ */}

            <PostPreviewIcons post={post} addLikeToPost={addLikeToPost} />

            {/* ***********************************end icons************************************* */}

            {/* ************************************likes*********************************** */}
            <div className="post-details-likes">
              {!!post.likedBy?.length && (
                <div
                  className="div-post-details-like"
                  onClick={() => {
                    onToggleModal({ type: "Likes", data: { post: post } })
                  }}
                >
                  {" "}
                  {post.likedBy?.length} likes{" "}
                </div>
              )}
            </div>
            {/* *************************************end likes************************************ */}

            {/* **********************************date************************************** */}

            <div className="post-details-date">3d</div>
            {/* *********************************end date**************************************** */}

            {/* **********************************add comment**************************************** */}
            <div className="section-post-details-add-comment222">
              <div className="post-details-add-comment-input">
                <InputEmojiChat
                  addCommentToPost={addCommentToPost}
                  post={post}
                />
              </div>
            </div>
            {/* ************************************end add comment************************************** */}
          </div>
          {/* ************************************end all data************************************** */}
        </div>
        {/* ************************************end data************************************** */}
      </div>
    </section>
  )
}
