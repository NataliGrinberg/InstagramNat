import { useState } from "react"
import { useForm } from "../customHooks/useForm"
import { postService } from "../services/post.service"
import InputEmoji from 'react-input-emoji'
import { storageService } from "../services/async-storage.service"

export function InputEmojiChat({ addCommentToPost, post }) {

    const [text, setText] = useState('')


    async function addComment(text) {
        var comment = postService.createComment(text)
        try {
            comment.txt = text
            comment.id = storageService._makeId()
            //post.comments.push(comment)
            //setComment(comment)
            // postToSave.comments = post.comments ? [...post.comments, comment] : [comment]
            addCommentToPost(comment, post)


        } catch (err) {
            console.log('Had issues adding add comment', err);
        }
    }

    return (
        <div>
            {text !== '' && text !== null &&
                <div className='button-input-emoji' onClick={(ev) => {

                    if (text != '' && text != null) {
                        addComment(text)
                        setText('')
                    }
                }}>Post</div>}

            <InputEmoji
                value={text}

                onChange={(ev) => {
                    setText(ev);
                }}
                aria-label="Add a comment…"
                placeholder="Add a comment…"
            />
        </div>
    )
}