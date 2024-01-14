import { Link } from 'react-router-dom'
import { Svgs } from '../assets/Svgs'
import { onToggleModal } from '../store/actions/app.actions'
import React, { useEffect, useState, useRef } from 'react'
import { postService } from '../services/post.service'
import { InputEmojiChat } from './InputEmojiChat';
import { Player } from 'video-react';

import { Source } from '@cloudinary/url-gen/qualifiers'
import { PostDetails } from '../pages/PostDetails'
import { PostPreviewImg } from './PostPreviewImg'
import { PostPreviewIcons } from './PostPreviewIcons'

export function PostPreview({ post, addLikeToPost, addCommentToPost }) {

   // const [likePost, setLikePost] = useState(postService.isLikePost(post));
   // const [imgCount, setImgCount] = useState(0)

    // useEffect(() => {
    //     console.log("insert use from pre")
    //     var likeByUser = postService.isLikePost(post);
    //     setLikePost(likeByUser)
    // }, [post.likedBy])


    return (
        <article className="article-post-preview-model">
            <div className="post-preview-model">
                <div className="post-user-info">
                    <div className="container">
                        <div className="container-img">
                            {/* <img className="canvas" src={imgCan} /> */}
                            <img className="img" src={post.by.imgUrl} />
                        </div>
                        <div className="container-data">
                            <div className="container-data-fullName">{post.by.fullname}</div>
                            <div className="container-data-loc">{post.by.loc}</div>
                        </div>

                        <div className="container-moreOptions" onClick={() => { onToggleModal({ type: 'MoreOptions' }) }}> {Svgs.more3Points}</div>
                    </div>
                </div>

                <PostPreviewImg imgUrl={post.imgUrl} />
                {/* <div className="post-preview">
                    {(imgCount > 0) &&
                        <button onClick={() => { setImgCount(imgCount - 1) }}
                            aria-label="Go Back" className=" _afxv _al46 _al47" >
                            <div className=" _9zm0"></div>
                        </button>
                    }

                    {
                        ((post.imgUrl[imgCount]).includes('image'))
                        && <img className="post-preview-img" src={post.imgUrl[imgCount]} />
                        || <video controls width="100%">
                            <source src={post.imgUrl[imgCount]} type="video/mp4" autoPlay={true} />
                        </video>
                    }

                    {((post.imgUrl.length - 1) > imgCount) &&
                        <button onClick={() => { setImgCount(imgCount + 1) }} aria-label="Next" className=" _afxw _al46 _al47">
                            <div className="_9zm2"></div>
                        </button>
                    }
                </div> */}

                <div className='post-icons-info'>
                  <PostPreviewIcons post={post} addLikeToPost={addLikeToPost}/>
                    {/* <div className='post-icons'>
                        <div className='post-icons-list'>
                            <span className="span-like" onClick={() => addLikeToPost(post)}>
                                {
                                    likePost ?
                                        <div className="like likePost">{Svgs.red}</div> :
                                        <div className=" like black">{Svgs.notifications} </div>
                                }
                            </span>
                             <Link to={`/post/${post._id}`}><span className="span-comment"><div className="comment" > {Svgs.comment}</div></span></Link> 
                            <button className="button-sharePost"> <div className="sharePost" onClick={() => { onToggleModal({ type: 'Share' }) }}> {Svgs.sharePost}</div></button>
                        </div>
                        <div className='div-post-icons-save'>
                            <div className="post-icons-save" onClick={() => { }}>{Svgs.save}</div>
                        </div>
                    </div> */}

                    {!!post.likedBy?.length && (
                        <div className="like" onClick={() => { onToggleModal({ type: 'Likes', data: { post: post } }) }}> {post.likedBy?.length} likes </div>
                    )}

                    <div className='post-text'>
                        {/* <div className='post-text-bold'>{post.by.fullname}</div> */}
                        <div className='post-text-txt'>{post.txt} </div>
                    </div>
                    {!!post.comments?.length && (
                        <div className="view-comments">
                               <Link to={`/post/${post._id}`}><div className="comment" > View all {post.comments?.length} comments</div></Link> 
                        </div>
                    )}
                    <div className="add-comment">
                        <InputEmojiChat addCommentToPost={addCommentToPost} post={post} />
                    </div>
                </div>
            </div>
        </article >
    )

}



