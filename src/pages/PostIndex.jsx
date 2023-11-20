import { useEffect, useState } from "react";
import { postService } from "../services/post.service";

export function PostIndex() {

    const [posts, setPosts] = useState(null)

    useEffect(() => {
        //setSearchParams(filterBy)
        loadPosts() 
    }, [])//filterBy

    async function loadPosts() {
        try {
            const posts = await postService.query()//filterBy
            setPosts(posts)
            document.getElementById("json").textContent = JSON.stringify(posts, undefined, 2);
          debugger
        } catch (err) {
            console.log('Had issues loading posts', err);
        }
    }

    return (
        <div>
            <div>i am in post</div>
            <pre id="json"></pre>
        </div>
    )
}