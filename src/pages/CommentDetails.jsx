import { Svgs } from "../assets/Svgs"
import { utilService } from "../services/util.service"

export function CommentDetails({ comment }) {
  return (
    <div className="li-comment-details-model">
      <div className="div-comment-details-model">
        <div className="comment-details-container-data">
          <div className="container-img">
            <img className="img" src={comment.by.imgUrl} />
          </div>
          <div className="comment-details-data">
          <div className="post-icons-info-text-details">
            <div className="post-icons-info-text-fullName">
              {comment.by.fullname}
            </div>
            <span className="post-icons-info-text-more">
              <span className="post-icons-info-text-txt">{comment.txt}</span>
            </span>
          </div>
          <div className="post-icons-info-created">
          <div className="post-icons-info-created-div">
            {utilService.formatTimeAgo(comment?.createdAt)}
          </div>
          </div>
        </div>
        </div>
        <div className="comment-details-like">{Svgs.smallHeart}</div>
        
      </div>
    </div>
  )
}
