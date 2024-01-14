import { useEffect, useState } from 'react'
import { Svgs } from '../assets/Svgs'
import { useForm } from '../customHooks/useForm'
import { onToggleModal } from '../store/actions/app.actions'
import { postService } from '../services/post.service'

export function CommentDetails({ comment }) {

    // function onLikeComment() {
    //     const newPost = {...post, likedUsers: [...post.likedUsers, user._id]}
    //     savePost(newPost)
    // }
    return (
        <article className="article-comment-details-model">
            <div className="comment-details-model">
                <div className="comment-user-info">

                    <div className="container">
                        {/* <div className="comment-post-details">
                            <img className="comment-post-details-img" src={post.imgUrl} />
                        </div> */}
                        <div className="container-data">
                            <div className="container-data-fullName">{comment.by.fullname}</div>
                            <div className="container-data-imgUrl">{comment.by.imgUrl}</div>
                            <div className="container-data-txt">{comment.txt}</div>
                        </div>

                    </div>
                </div>
            </div>
        </article >
    )

}



