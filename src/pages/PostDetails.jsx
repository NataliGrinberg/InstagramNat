import { Svgs } from '../assets/Svgs'
import imgCan from '../assets/images/canva.png'
import { onToggleModal } from '../store/actions/app.actions'

export function PostDetails({ post }) {
    return (
        <article className="post-details-model">

            <div className="post-user-info">
                <div class="container">
                    <img className="canvas" src={imgCan} />
                    <img className="imgPro" src={post.by.imgUrl} />
                </div>



                <h2 className="fullName">{post.by.fullname}</h2>
                <h2 className="loc">{post.by.loc}</h2>
                <div className="moreOptions" onClick={() => { onToggleModal({ type: 'MoreOptions' }) }}> {Svgs.more3Points}</div>
            </div>

            <div className="post-details">
                <img src={post.imgUrl} />
                <h2>{post._id}</h2>
                <h4>{post.txt}</h4>
            </div>

            <div className='post-icons'>
                <div className="like" onClick={() => { onToggleModal({ type: 'Likes' }) }}> {Svgs.notifications}</div>
                <div className="comment" onClick={() => { onToggleModal({ type: 'Comments' }) }}> {Svgs.comment}</div>
                <div className="sharePost" onClick={() => { onToggleModal({ type: 'Share' }) }}> {Svgs.sharePost}</div>
                <div className="save" onClick={() => { }}>{Svgs.save}</div>

            </div>

        </article>
    )

}



