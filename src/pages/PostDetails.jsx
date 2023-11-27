import { Svgs } from '../assets/Svgs'
import imgCan from '../assets/images/canva.png'


export function PostDetails({ post }) {
    return (
        <article className="post-details-model">

            <div className="post-user-info">
                <img className="canvas" src={imgCan} />
                <img className="" src={post.by.imgUrl} />
                <h2>{post.by.fullname}</h2>
                <div className="more3Points" onClick={() => { }}> {Svgs.more3Points}</div>
            </div>

            <div className="post-details">
                <img src={post.imgUrl} />
                <h2>{post._id}</h2>
                <h4>{post.txt}</h4>
            </div>

            <div className='post-icons'>
                <div className="like" onClick={() => { alert('click on like: ', Svgs.unlike) }}> {Svgs.notifications}</div>
                <div className="comment" onClick={() => { }}> {Svgs.comment}</div>
                <div className="sharePost" onClick={() => { }}> {Svgs.sharePost}</div>
                <div className="save" onClick={() => { }}>{Svgs.save}</div>

            </div>

        </article>
    )

}



