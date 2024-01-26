//import { useEffect, useState } from 'react'
import { Svgs } from '../assets/Svgs'
// import { useForm } from '../customHooks/useForm'
// import { onToggleModal } from '../store/actions/app.actions'
// import { postService } from '../services/post.service'

export function CommentDetails({ comment }) {


    return (
        <div className="li-comment-details-model">
            <div className="div-comment-details-model">
                        <div className="comment-details-container-data">
                               <div className="container-img">
                                <img className="img" src={comment.by.imgUrl} />
                            </div>
                            <div className='post-icons-info-text'>
                                <div className='post-icons-info-text-fullName'>{comment.by.fullname}</div>
                                <span className='post-icons-info-text-more'>
                                    <span className='post-icons-info-text-txt'>{comment.txt}</span>
                                </span>
                            </div>
                            <div className='post-icons-info-created'>{comment?.createdAt}</div>
                        </div>
                        <div className='comment-details-like'>
                            {Svgs.smallHeart}
                        </div>
            </div>
        </div >




    )

}



