import React, { useEffect, useState } from "react";
import { Col, Divider, List, Row, Typography } from "antd";
import { IComments, IPosts } from "../../interfaces/api";
import { getPost, getPostComments } from "../../api";
import PostComment from "./PostComment";

interface IProps {
    currentPost: string;
}

const { Title, Text } = Typography;

const ForumPost: React.FC<IProps> = (props: IProps) => {
    const [post, setPost] = useState<IPosts | null>(null);
    const [comments, setComments] = useState<IComments[]>([]);
    const [dummyUpdate, setDummyUpdate] = useState<number>(0);

    const updatePostState = async () => {
        const post = await getPost(props.currentPost);
        setPost(post ? post[0] : null);
    };

    const updateCommentsState = async () => {
        const comments = await getPostComments(props.currentPost);
        setComments(comments);
        console.log(comments);
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
                                </Col>
                            </>
                        }
                        footer={
                            <PostComment
                                postId={props?.currentPost}
                                dummyUpdate={dummyUpdate}
                                setDummyUpdate={setDummyUpdate}
                            />
                        }
                        dataSource={comments ? comments : []}
                        renderItem={(comment) => (
                            <List.Item key={comment?.id}>
                                <List.Item.Meta title={comment?.name} />
                                {comment?.comment}
                                <br />
                                {comment?.date_created}
                            </List.Item>
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
