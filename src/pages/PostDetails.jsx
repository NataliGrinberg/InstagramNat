import { useEffect, useState } from "react";
import { CommentDetails } from "./CommentDetails";
import { useForm } from "../customHooks/useForm";
import { postService } from "../services/post.service";

import { InputEmojiChat } from "../components/InputEmojiChat";
import { Link, useNavigate, useParams } from "react-router-dom";
import { savePost } from "../store/actions/post.actions";
import { PostPreviewImg } from "../components/PostPreviewImg";
import { Svgs } from "../assets/Svgs";
import { Comments } from "../components/Comments";
import { CreatePost } from "../components/create/CreatePost";

export function PostDetails() {
    const [post, setPost] = useState(null)
    const { postId } = useParams()
    const [likePost, setLikePost] = useState(postService.isLikePost(post));
    const navigate = useNavigate()

    useEffect(() => {
        loadPost()
    }, [])


    useEffect(() => {
        var likeByUser = postService.isLikePost(post);
        setLikePost(likeByUser)
    }, [post?.likedBy])

    async function loadPost() {
        const post = await postService.getById(postId)
        setPost(post)
    }

    async function addCommentToPost(comment) {
        const postToSave = structuredClone(post)
        postToSave.comments = post.comments ? [...post.comments, comment] : [comment]
        setPost(postToSave)
        await savePost(postToSave)
    }

    console.log('data from comments', post);
    if (!post) return <div>Loading</div>
    return (

       
        <section className="section-postDetails">

            <div className="create-postDetails-opacity">
                <div className="create-postDetails-button" onClick={
                    () => { }}>
                    <div className="create-postDetails-button-div">
                        <div className="svg-postDetails" onClick={()=>navigate('/')}>
                            {Svgs.close}
                        </div>
                    </div>
                </div>

     
      
                 <div className="postDetails-container">

                    <div className="postDetails-container-imgs">
                        <PostPreviewImg imgUrl={post.imgUrl} />
                    </div>

                    <div className="postDetails-container-data">

                        <div className="postDetails-container-data-profile">
                            profile
                        </div>

                        <div className="postDetails-container-data-details">
                            <div className="postDetails-container-data-details-1">

                                <div className="postDetails-container-data-details-1">
                                    <div className="postDetails-container-data-details-1-img"></div>

                                    <div className="postDetails-container-data-details-1-txt">
                                        <div className='postDetails-text-txt'>{post.txt} </div>
                                    </div>

                                </div>

                                <div className="postDetails-container-data-details-1-comments">
                                    <Comments />
                                </div>

                            </div>

                            <div className="postDetails-container-data-details-2">
                                <div className="postDetails-container-data-details-2-icons">
                                    <div className='postDetails-post-icons'>
                                        <div className='postDetails-icons-list'>
                                            <span className="postDetails-span-like" onClick={() => addLikeToPost(post)}>
                                                {
                                                    likePost ?
                                                        <div className="postDetails-like postDetails-likePost">{Svgs.red}</div> :
                                                        <div className=" postDetails-like postDetails-black">{Svgs.notifications} </div>
                                                }
                                            </span>
                                            <span className="postDetails-span-comment"><div className="postDetails-comment" > {Svgs.comment}</div></span>
                                            <button className="postDetails-button-sharePost"> <div className="postDetails-sharePost" onClick={() => { onToggleModal({ type: 'Share' }) }}> {Svgs.sharePost}</div></button>
                                        </div>
                                        <div className='div-postDetails-icons-save'>
                                            <div className="postDetails-icons-save" onClick={() => { }}>{Svgs.save}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="postDetails-container-data-details-2-likes">
                                    {!!post.likedBy?.length && (
                                        <div className="postDetails-like" onClick={() => { onToggleModal({ type: 'Likes', data: { post: post } }) }}> {post.likedBy?.length} likes </div>
                                    )}
                                </div>


                                <div className="postDetails-container-data-details-2-date">date</div>


                                <div className="postDetails-container-data-details-2-addComment">
                                    <div className="postDetails-add-comment">
                                        <InputEmojiChat addCommentToPost={addCommentToPost} post={post} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </div> 
        </section>
    )
}