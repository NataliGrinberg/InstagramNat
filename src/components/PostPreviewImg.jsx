import React, { useState } from 'react'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

export function PostPreviewImg({ imgUrl }) { //post post.imgUrl

    const [imgCount, setImgCount] = useState(0)

    return (
        <article className="article-post-preview-img-model">
           
            <div className="post-preview">
                {(imgCount > 0) && <div className="button-back-img" onClick={() => { setImgCount(imgCount - 1) }}></div>
                }

                {
                    (imgUrl.length > 0 && imgUrl[imgCount] !== null && (((imgUrl[imgCount]).includes('video')
                        && <video controls className="video-post-preview">
                            <source src={imgUrl[imgCount]} type="video/mp4" autoPlay={true} />
                        </video>))
                        || (<img className="post-preview-img" src={imgUrl[imgCount]} />))

                }

                {((imgUrl.length - 1) > imgCount) && <div className="button-next-img" onClick={() => { setImgCount(imgCount + 1) }}></div>
            
                }
            </div>
          
        </article >
    )

}



