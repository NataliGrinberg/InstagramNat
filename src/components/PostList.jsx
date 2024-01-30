import { Fragment } from "react"
import { PostPreview } from "./PostPreview"
import { AppStory } from "./AppStory"
import { AppFooter } from "./AppFooter"

export function PostList({ posts, addLikeToPost, addCommentToPost }) {
  return (
    <Fragment>
      <section className="postList-container">
        {/* <div className="appStory-post">
          <AppStory />
        </div> */}
        <div className="postDetails-list">
          {/* <div></div> */}
          {!!posts?.length && (
            <ul>
              {posts.map((post) => (
                <PostPreview
                  key={post._id}
                  post={post}
                  addLikeToPost={addLikeToPost}
                  addCommentToPost={addCommentToPost}
                />
              ))}
            </ul>
          )}
          {!posts?.length && <h1 className="no-posts-info">No posts here</h1>}
        </div>
        <div className="width">
          <AppFooter />
        </div>
      </section>
    </Fragment>
  )
}
