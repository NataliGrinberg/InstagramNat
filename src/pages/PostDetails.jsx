import { useEffect, useState } from "react"
import { CommentDetails } from "./CommentDetails"
import { useForm } from "../customHooks/useForm"
import { postService } from "../services/post.service"
import { utilService } from "../services/util.service"

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
    console.log("insert to details")
    loadPost()
  }, [postId])

  useEffect(() => {
    var likeByUser = postService.isLikePost(post)
    setLikePost(likeByUser)
  }, [post?.likedBy])

  async function loadPost() {
    const post = await postService.getById(postId)
    setPost(post)
    formetDate(post)
  }

  async function addCommentToPost(comment) {
    const postToSave = structuredClone(post)
    comment.createdAt = Date.now()
    postToSave.comments = post.comments
      ? [...post.comments, comment]
      : [comment]

    await savePost(postToSave)
    setPost(postToSave)
  }

  if (!post) return <div>Suggested Posts</div>

  return (
    <section className="section-post-details">
      <div className="create-post-details-opacity">
        <div className="create-post-details-button">
          <div className="create-post-details-button-div">
            <div
              className="svg-postDetails"
              onClick={() => {
                console.log("close in")
                window.history.go(-1)
              }}
            >
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
                        {/* <div className="container-data-date">
                          <span className="container-data-date-span">·</span>
                          <div className="container-data-date-div">
                            {utilService.formatTimeAgo(post?.createdAt)}
                          </div>
                        </div> */}
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
            <div className="post-details-date">
              <div className="post-details-date-div">
                {utilService.formatTimeAgo(post?.createdAt)}
              </div>
            </div>
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
