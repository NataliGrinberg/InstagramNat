import React, { useState } from 'react'
import { LikeDetails } from '../pages/LikeDetails'

export function Likes({data}) {

  const post = data.post

  return (
    <section className="CommentsList-container">
      <div className="postComments-list">
        <div></div>
        {!!post.likedBy?.length && (
          <ul >
            {post.likedBy.map(like => (
              <LikeDetails
                key={like.id}
                like={like}
              />
            ))}
          </ul>
        )}
        {!post.likedBy?.length && <h1 className="no-likedBy-info">id: {post._id} No likes here</h1>}
      </div>

    </section>
  )
}
