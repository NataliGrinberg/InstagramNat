import { Fragment } from "react";
import { PostDetails } from "../pages/PostDetails";
import { AppStory } from "./AppStory";

export function PostList({ posts }) {


	return (
		<Fragment>
			<section className="postList-container">
				<div>
					<AppStory />
				</div>
				<div>
					{!!posts?.length && (
						<ul >
							{posts.map(post => (
								<PostDetails
									key={post.id}
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