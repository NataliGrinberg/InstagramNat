import React, { useState } from 'react'

export function PostPreviewImg({ imgUrl }) { //post post.imgUrl

    const [imgCount, setImgCount] = useState(0)

    return (
        // <article className="article-post-preview-model">
        //     <div className="post-preview-model">
        <div className="post-preview">
            {(imgCount > 0) &&
                <button onClick={() => { setImgCount(imgCount - 1) }}
                    aria-label="Go Back" className=" _afxv _al46 _al47" >
                    <div className=" _9zm0"></div>
                </button>
            }

            {
                (imgUrl.length > 0 && imgUrl[imgCount] !== null && (((imgUrl[imgCount]).includes('video')
                && <video controls width="100%">
                    <source src={imgUrl[imgCount]} type="video/mp4" autoPlay={true} />
                </video>))
                || (<img className="post-preview-img" src={imgUrl[imgCount]} />))

            }

            {((imgUrl.length - 1) > imgCount) &&
                <button onClick={() => { setImgCount(imgCount + 1) }} aria-label="Next" className=" _afxw _al46 _al47">
                    <div className="_9zm2"></div>
                </button>
            }
        </div>
        //     </div>
        // </article >
    )

}



