import React, { useEffect, useState } from 'react'
import { Svgs } from '../assets/Svgs'
import { postService } from '../services/post.service';
import { Link } from 'react-router-dom';

export function PostPreviewIcons({ post , addLikeToPost }) { 

    const [likePost, setLikePost] = useState(postService.isLikePost(post));

    useEffect(() => {
        console.log("insert use from pre icons")
        var likeByUser = postService.isLikePost(post);
        setLikePost(likeByUser)
    }, [post.likedBy])


    return (

        <div className='post-icons'>
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
        </div>
    )
}



