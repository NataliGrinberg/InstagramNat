import { useEffect, useState } from "react";

import { postService } from "../services/post.service";

import { InputEmojiChat } from "./InputEmojiChat";
import { useParams } from "react-router-dom";
import { savePost } from "../store/actions/post.actions";
import { CommentDetails } from "../pages/CommentDetails";

export function Comments() {
    const [post, setPost] = useState(null)
    const { postId } = useParams()

    useEffect(() => {
        loadPost()
    }, [post])


    async function loadPost() {
        const post = await postService.getById(postId)
        setPost(post)
    }

    // async function addCommentToPost(comment) {
    //     const postToSave = structuredClone(post)
    //     postToSave.comments = post.comments ? [...post.comments, comment] : [comment]
    //     setPost(postToSave)
    //     await savePost(postToSave)
    // }


    if (!post) return <div>Loading</div>
    return (
        <section className="comments-container">
            <div className="post-comments-div">
                <div className="post-comments-list">
                    {/* <div></div> */}
                    {!!post.comments?.length && (
                        <div>
                            {post.comments.map(comment => (
                                <CommentDetails
                                    key={comment.id}
                                    comment={comment}
                                />
                            ))}
                        </div>
                    )}
                    {!post.comments?.length && <h1 className="no-comments-info">post dont have comments </h1>}
                </div>

               
            </div>
        </section>
    )
}