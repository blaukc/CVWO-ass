import React, { useEffect, useState } from "react";
import { List } from "antd";
import { IComments, IPosts } from "../../interfaces/api";
import { getPost, getPostComments } from "../../api";
import PostComment from "./PostComment";

interface IProps {
    currentPost: string;
}

const ForumPost: React.FC<IProps> = (props: IProps) => {
    const [post, setPost] = useState<IPosts | null>(null);
    const [comments, setComments] = useState<IComments[]>([]);
    const [dummyUpdate, setDummyUpdate] = useState<number>(0);

    const updatePostState = async () => {
        const post = await getPost(props.currentPost);
        setPost(post[0]);
    };

    const updateCommentsState = async () => {
        const comments = await getPostComments(props.currentPost);
        setComments(comments);
    };

    useEffect(() => {
        console.log(props.currentPost);
        if (props.currentPost) {
            updatePostState();
            updateCommentsState();
        }
    }, [props.currentPost, dummyUpdate]);

    return (
        <>
            {props.currentPost ? (
                <>
                    {post?.description}
                    {comments ? (
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 10,
                            }}
                            dataSource={comments}
                            footer={
                                <PostComment
                                    postId={props.currentPost}
                                    dummyUpdate={dummyUpdate}
                                    setDummyUpdate={setDummyUpdate}
                                />
                            }
                            renderItem={(comment) => (
                                <List.Item key={comment.id}>
                                    <List.Item.Meta title={comment.commenter} />
                                    {comment.comment}
                                </List.Item>
                            )}
                        />
                    ) : (
                        "no comment../"
                    )}
                </>
            ) : (
                "nothing"
            )}
        </>
    );
};

export default ForumPost;
