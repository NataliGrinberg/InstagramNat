import { useEffect, useState } from "react";
import { postService } from "../services/post.service";
import { PostList } from "../components/PostList";

import { loadPosts, removePost, savePost, setFilterBy } from "../store/actions/post.actions";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { SideDate } from "../components/sideDate";



export function PostIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const posts = useSelector(storeState => storeState.postModule.posts)
    const filterBy = useSelector(storeState => storeState.postModule.filterBy)

    const navigate = useNavigate()

    useEffect(() => {
        setFilterBy(postService.getFilterFromParams(searchParams))
    }, [])

    useEffect(() => {
        // Sanitize filterBy
        loadPosts()
        setSearchParams(filterBy)
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        fieldsToUpdate = { ...filterBy, ...fieldsToUpdate }
        setFilterBy(fieldsToUpdate)
    }


    async function onRemovePost(postId) {
        try {
            await removePost(postId)
            showSuccessMsg('Successfully removed')
        } catch (err) {
            console.log('Had issues loading posts', err);
            showErrorMsg('can not remove!')
            // eventBusService.emit('show-user-msg', {type: 'error', txt:'can not remove!'})
        }
    }

    async function onSavePost(post) {
        try {
            await savePost(post)
            navigate('/post')
        } catch (err) {
            console.log('Had issues adding post', err);
        }
    }

    // async function loadPosts() {
    //     try {
    //         const posts = await postService.query()//filterBy
    //         setPosts(posts)
    //         document.getElementById("json").textContent = JSON.stringify(posts, undefined, 2);
    //         debugger
    //     } catch (err) {
    //         console.log('Had issues loading posts', err);
    //     }
    // }

    return (
        <main className="post-index-container">
            <PostList posts={posts} />
            {/* <MailSidebar
                unreadCount={unreadCount}
                folder={params.folder}
                searchParams={searchParams}
                setIsLoading={setIsLoading} /> */}


            <SideDate></SideDate>
        </main>
    )

}
