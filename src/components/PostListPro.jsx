import { useEffect, useRef, useState } from "react"
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Svgs } from "../assets/Svgs"
import { postService } from "../services/post.service"
import { useSelector } from "react-redux"
import { savePost } from "../store/actions/post.actions"

export function PostListPro() {
  const { posts } = useOutletContext()
  const { username } = useParams()
  const user = useSelector((storeState) => storeState.userModule.user)

  async function addLikeToPost(post) {
    try {
        const likePost = postService.isLikePost(post)
        if (!likePost) {

            const likeToSave = {
                _id: user._id,
                fullname: user.fullname,
                imgUrl: user.imgUrl
            }

            post.likedBy = post.likedBy ? [...post.likedBy, likeToSave] : [likeToSave]
        }
        else {
            if (post.likedBy) post.likedBy = post.likedBy.filter(like => like._id !== user._id)
        }

        await savePost(post)
       
    } catch (err) {
        console.error('Had issues adding add like', err);
    }
}

  return (
    <article className="post-list-profile-article">
      {!posts?.length && <h1 className="no-posts-info">No posts here</h1>}

      <div className="post-list-profile">
        {!!posts?.length && (
          <ul className="ul-pro">
            {posts.map((post) => {
              return (
                <Link  key={post?._id}
                  className="post-list-profile-link"
                  to={`/profile/${username}/${post?._id}`}>
                  
                  <div className="post-list-profile-img">
              
                  {
                    ( ((post.imgUrl[0]).includes('video')
                        && <video controls className="">
                            <source src={post.imgUrl[0]} type="video/mp4" />
                        </video>)
                        || (
                          <img className="img" src={post.imgUrl[0]} />
                        ))

                }

                    {/* <img className="img" src={post.imgUrl[0]} /> */}
                    {post.imgUrl.length > 1 && (
                      <div className="post-list-profile-svg-flex">
                        <div className="post-list-profile-svg">
                          {Svgs.images}
                        </div>
                      </div>
                    )}

                    {(post?.comments || post?.likedBy) && (
                      <div className="container-comments-likes">
                        <ul className="ul">
                          <li className="li-likes">
                            <span className="span-likes">
                              <span className="span">
                                {post?.likedBy?.length || "0"}
                              </span>
                            </span>
                            <span className="icon-likes"></span>
                          </li>
                          <li className="li-comments">
                            <span className="span-comments">
                              <span className="span">
                                {post?.comments?.length || "0"}
                              </span>
                            </span>
                            <span className="icon-comments"></span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </ul>
        )}
      </div>
      <Outlet context={{addLikeToPost}} />
      <div></div>
    </article>
  )
}
