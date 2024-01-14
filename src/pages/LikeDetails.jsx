import { useEffect, useState } from 'react'
import { Svgs } from '../assets/Svgs'
import { useForm } from '../customHooks/useForm'
import { onToggleModal } from '../store/actions/app.actions'
import { postService } from '../services/post.service'

export function LikeDetails({like}) {

  
    return (
        <article className="article-like-details-model">
            <div className="like-details-model">
                <div className="like-user-info">
                    <div className="container">

                    {/* <div className="like-post-details">
                            <img className="like-post-details-img" src={post.imgUrl} />
                        </div> */}

                        <div className="container-data">
                            <div className="container-data-fullName">{like.fullname}</div>
                            <div className="container-data-loc">{like.imgUrl}</div>
                        
                        </div>

                    </div>
                </div>
            </div>
        </article >
    )

}



