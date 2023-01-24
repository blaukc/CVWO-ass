import React, { useEffect, useState } from "react";
import { Col, Divider, List, Row, Typography } from "antd";
import { IComments, IPosts } from "../../interfaces/api";
import { deletePost, getPost, getPostComments } from "../../api";
import PostComment from "./PostComment";
import Comment from "./Comment";
import EditPostModal from "../EditPostModal";

interface IProps {
    currentPost: string;
    hydrateSidebar: () => void;
}

const { Title, Text } = Typography;

const ForumPost: React.FC<IProps> = (props: IProps) => {
    const [post, setPost] = useState<IPosts | null>(null);
    const [comments, setComments] = useState<IComments[]>([]);
    const [dummyUpdatePost, setDummyUpdatePost] = useState<number>(0);

    const hydratePost = () => {
        setDummyUpdatePost(dummyUpdatePost + 1);
    };

    const updatePostState = async () => {
        const post = await getPost(props.currentPost);
        setPost(post ? post[0] : null);
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
    }, [props.currentPost, dummyUpdatePost]);

    const deletePostHandler = async () => {
        const success = await deletePost(props.currentPost);
        if (success) {
            // We trigger an update to the posts sidebar
            props.hydrateSidebar();
            // We also remove the current post from the screen
            setPost(null);
            setComments([]);
        } else {
        }
    };

    return (
        <>
            {props.currentPost ? (
                <>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 10,
                        }}
                        header={
                            <>
                                <Col style={{ marginLeft: 24 }}>
                                    <Title level={3}>{post?.title}</Title>
                                    <Text>{post?.description}</Text>
                                    <br />
                                    {localStorage.getItem("user_id") ===
                                        post?.poster && (
                                        <Row
                                            justify="space-between"
                                            align="middle"
                                            style={{ paddingRight: 60 }}
                                        >
                                            <Col>
                                                {/* {post?.poster} */}
                                                <br />
                                                {new Date(
                                                    post?.date_created
                                                ).toLocaleString()}
                                            </Col>
                                            <Col>
                                                <a onClick={deletePostHandler}>
                                                    Delete Post
                                                </a>
                                                <EditPostModal
                                                    post={post}
                                                    hydrateSidebar={
                                                        props.hydrateSidebar
                                                    }
                                                    hydratePost={hydratePost}
                                                />
                                            </Col>
                                        </Row>
                                    )}
                                </Col>
                            </>
                        }
                        footer={
                            <PostComment
                                postId={props?.currentPost}
                                hydratePost={hydratePost}
                            />
                        }
                        dataSource={comments ? comments : []}
                        renderItem={(comment) => (
                            <Comment
                                comment={comment}
                                hydratePost={hydratePost}
                            />
                        )}
                    />
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default ForumPost;
