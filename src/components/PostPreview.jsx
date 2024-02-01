import { Link, useOutletContext } from 'react-router-dom'
import { Svgs } from '../assets/Svgs'
import { onToggleModal } from '../store/actions/app.actions'
import React, { useEffect, useState, useRef } from 'react'
import { postService } from '../services/post.service'
import { InputEmojiChat } from './InputEmojiChat';
import { Player } from 'video-react';
import { utilService } from "../services/util.service"

import { PostPreviewImg } from './PostPreviewImg'
import { PostPreviewIcons } from "../components/PostPreviewIcons";



export function PostPreview({ post, addLikeToPost, addCommentToPost }) {

    const [text, setText] = useState(post.txt)
    const [isExp, setIsExp] = useState(false)
    const numText = 20;

    useEffect(() => {
        expText()
    }, [isExp])

    function expText() {

        if (post.txt.length <= numText || isExp)
            setText(post.txt)
        else {
            let txt = post.txt.substr(0, numText)
            var lastIndex = txt.lastIndexOf(" ");

            txt = txt.substring(0, lastIndex);
            setText(txt + '\u2026' + '\u00A0')
        }
    }



    return (
        <article className="article-post-preview-model">
            <div className="post-preview-model">

                <div className="post-user-info">
                    <div className="post-user-info-container">
                        <div className="container-img">

                            {/* <img className="canvas" src={'../assets/images/canva.png'} />  */}
                            {/* <canvas className="canvas" height="53" width="53" ></canvas> */}
                            <Link to={`/profile/${post.by?.username}`}>
                                <img className="img" src={post.by.imgUrl} />
                            </Link>
                        </div>
                        <div className="container-data">
                            <div className="container-data-div">
                                <div className="container-data-fullName-date">
                                    <Link to={`/profile/${post.by?.username}`}>
                                        <div className="container-data-fullName">{post.by.username}</div>
                                    </Link>
                                    <div className="container-data-date">
                                        <span className='container-data-date-span'>·</span>
                                        <div className='container-data-date-div'>{utilService.formatTimeAgo(post?.createdAt)}</div>
                                    </div>
                                </div>
                                <div className="container-data-loc">{post?.loc?.name}</div>
                            </div>
                        </div>

                        <div className="container-moreOptions" onClick={() => { onToggleModal({ type: 'MoreOptions' }) }}> {Svgs.more3Points}</div>
                    </div>
                </div>

                <PostPreviewImg imgUrl={post.imgUrl} />

                <div className='post-icons-info'>
                    <PostPreviewIcons post={post} addLikeToPost={addLikeToPost} />


                    {!!post.likedBy?.length && (
                        <div className="post-icons-info-likes" onClick={() => { onToggleModal({ type: 'Likes', data: { post: post } }) }}> {post.likedBy?.length} likes </div>
                    )}

                    <div className='post-icons-info-text'>
                        <Link to={`/profile/${post.by?.username}`}>
                            <div className='post-icons-info-text-fullName'>{post.by.username}</div>
                        </Link>
                        <span className='post-icons-info-text-more'>
                            <span className='post-icons-info-text-txt'>{text}</span>
                            {!isExp && post.txt.length > numText && <span className='button-more-txt' onClick={() => { setIsExp(true) }}>more</span>}
                        </span>
                    </div>


                    {!!post.comments?.length && (
                        <div className="view-comments">
                            <Link to={`/post/${post._id}`}><div className="comment" > View all {post.comments?.length} comments</div></Link>
                        </div>
                    )}
                    <div className="post-icons-info-add-comment">
                        <InputEmojiChat addCommentToPost={addCommentToPost} post={post} />
                    </div>
                </div>
            </div>
        </article >
    )

}



