import React from 'react'
import { useSelector } from 'react-redux';
import Comment from '../Comment/Comment';
function Comments(props) {
    /**
     * Props
     */
    const { _id } = props;

    /**
     * Redux
     */
    const posts = useSelector((state) => state.post.posts);
    const post = posts?.find((post) => post._id === _id);


    return (
        <div id="comments"
             className="flex flex-col gap-y-4
                        h-fit w-full">
            <h4 className="text-primary">COMMENTS</h4>
        {
            post.comments.length ?
                post?.comments.map((comment, i) => {
                    return <Comment 
                                key={post?.comments[post.comments.length - 1 - i]._id}
                                text={post?.comments[post.comments.length - 1 - i].text}
                                userName={post?.comments[post.comments.length - 1 - i].user.userName}
                                date={post?.comments[post.comments.length - 1 - i].date}
                            />
                })
            :
                <p>No comments...</p>
        }
        </div>
    )
}

export default Comments