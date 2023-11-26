import imgCan from '../assets/images/canva.png'


export function PostDetails({ post }) {
    return (
        <div>

            <div className="user-info">
                <img className="canvas" src={imgCan} />
                <img className="" src={post.by.imgUrl} />
                <h2>{post.by.fullname}</h2>

            </div>

            <article className="post-details">
                <img src={post.imgUrl} />
                <h2>{post._id}</h2>
                <h4>{post.txt}</h4>

            </article>

        </div>
    )

}



