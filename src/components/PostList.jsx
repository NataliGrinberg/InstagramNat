import { Fragment } from "react";
import { PostDetails } from "../pages/PostDetails";
import { AppStory } from "./AppStory";

export function PostList({ posts }) {


	return (
		<Fragment>
			<section className="postList-container">

				<AppStory></AppStory>

				{!!posts?.length && (
					<ul className="">
						{posts.map(post => (
							<PostDetails
								key={post.id}
								post={post}
							/>
						))}
					</ul>
				)}
				{!posts?.length && <h1 className="no-posts-info">No posts here</h1>}
			</section>
		</Fragment>
	)
}