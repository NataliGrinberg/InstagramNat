import { useEffect, useRef, useState } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { Svgs } from "../assets/Svgs"

export function PostListPro() {
  const { posts } = useOutletContext()
  //const [isHovering, setIsHovering] = useState(false);
  //const ref = useRef([]);

  // useEffect(() => {}, [posts])

  console.log("posts: ", posts)

  // function handleMouseOut(){
  //   //setIsHovering(false)
  //   ref.current.style.display='none'
  // }

  // function handleMouseMove(){
  //   ref.current.style.display='flex'
  //  // setIsHovering(true)
  // }

  return (
    <article className="post-list-profile-article">
      {!posts?.length && <h1 className="no-posts-info">No posts here</h1>}

      <div className="post-list-profile">
        {!!posts?.length && (
          <ul className="ul-pro">
            {posts.map((post) => {
             
              return (
                <Link
                  className="post-list-profile-link"
                  to={`/post/${post?._id}`}
                >
                  <div className="post-list-profile-img">
                    {/* <video controls className="video-post-preview">
                            <source src={imgUrl[imgCount]} type="video/mp4" autoPlay={true} />
                        </video> */}
                    <img className="img" src={post.imgUrl[0]} />
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
      <div></div>
    </article>
  )
}
