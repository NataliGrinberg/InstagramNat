import { Fragment } from "react";
import { PostDetails } from "../pages/PostDetails";
import { AppStory } from "./AppStory";

export function PostList({ posts }) {


	return (
		<Fragment>
			<section className="postList-container">
				<div className="appStory-post">
					<AppStory />
				</div>
				<div  className="postDetails-list">
					{!!posts?.length && (
						<ul >
							{posts.map(post => (
								<PostDetails
									key={post._id}
									post={post}
								/>
							))}
						</ul>
					)}
					{!posts?.length && <h1 className="no-posts-info">No posts here</h1>}
				</div>
			</section>
		</Fragment>
	)
}