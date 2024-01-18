import { Link, useOutletContext } from 'react-router-dom'
import { Svgs } from '../assets/Svgs'
import { onToggleModal } from '../store/actions/app.actions'
import React, { useEffect, useState, useRef } from 'react'
import { postService } from '../services/post.service'
import { InputEmojiChat } from './InputEmojiChat';
import { Player } from 'video-react';

import { Source } from '@cloudinary/url-gen/qualifiers'
import { PostDetails } from '../pages/PostDetails'
import { PostPreviewImg } from './PostPreviewImg'
import { PostPreviewIcons } from "../components/PostPreviewIcons";



export function PostPreview({ post, addLikeToPost, addCommentToPost }) {

    // const [likePost, setLikePost] = useState(postService.isLikePost(post));
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
                            <img className="img" src={post.by.imgUrl} />
                        </div>
                        <div className="container-data">
                            <div className="container-data-div">
                                <div className="container-data-fullName-date">
                                    <div className="container-data-fullName">{post.by.fullname}</div>
                                    <div className="container-data-date">
                                        <span className='container-data-date-span'>·</span>
                                        <div className='container-data-date-div'>3d</div>
                                    </div>
                                </div>
                                <div className="container-data-loc">location: {post.by.loc}</div>
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
                        <div className='post-icons-info-text-fullName'>{post.by.fullname}</div>
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



