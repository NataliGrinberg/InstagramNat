import { useEffect, useState } from "react";
import { postService } from "../services/post.service";
import { PostList } from "../components/PostList";

import { loadPosts, removePost, savePost, setFilterBy } from "../store/actions/post.actions";
import { Outlet, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { SideData } from "../components/sideData";
import { getUserLogin, loadUserLogin } from "../store/actions/user.actions";


export function PostIndex() {
    //const filterBy = useSelector(storeState => storeState.postModule.filterBy)
    //const [searchParams, setSearchParams] = useSearchParams()
    const posts = useSelector(storeState => storeState.postModule.posts)
    const user = useSelector(storeState => storeState.userModule.user)
    //const params = useParams()

    const navigate = useNavigate()
    console.log("user", user)
    useEffect(() => {
       console.log("user2", user)
        if(!user){
             navigate('/login')
        }
        
        loadPosts()
        //setFilterBy(postService.getFilterFromParams(searchParams))
    }, [])


   // useEffect(() => {
        // Sanitize filterBy
       // getUserLogin()
       // loadPosts()
        //setSearchParams(filterBy)
    //}, [filterBy])




    // function onSetFilter(fieldsToUpdate) {
    //     fieldsToUpdate = { ...filterBy, ...fieldsToUpdate }
    //     setFilterBy(fieldsToUpdate)
    // }


    // async function onRemovePost(postId) {
    //     try {
    //         await removePost(postId)
    //         showSuccessMsg('Successfully removed')
    //     } catch (err) {
    //         console.log('Had issues loading posts', err);
    //         showErrorMsg('can not remove!')
    //     }
    // }

    // async function onSavePost(post) {
    //     try {
    //         await savePost(post)
    //         // navigate('/post')
    //     } catch (err) {
    //         console.log('Had issues adding post', err);
    //     }
    // }

    
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
            console.log('Had issues adding add like', err);
        }
    }


    async function addCommentToPost(comment, post) {
        try {
            const postToSave = structuredClone(post)
            postToSave.createdAt= new Date()
            postToSave.comments = post.comments ? [...post.comments, comment] : [comment]
            await savePost(postToSave)

        } catch (err) {
            console.log('Had issues adding add comment', err);
        }
    }
    return (
        <section className="post-index-container">
           
            <main className="main-post-index-container">
                <PostList addCommentToPost={addCommentToPost} posts={posts}  addLikeToPost={addLikeToPost} />
                <SideData />
            </main>
            <Outlet context={{addLikeToPost}} />
        </section>
    )

}
