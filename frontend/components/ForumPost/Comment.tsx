import React, { useEffect, useState } from "react";
import { Col, Divider, List, Row, Typography } from "antd";
import { IComments } from "../../interfaces/api";
import { deleteComment } from "../../api";
import EditCommentModal from "../EditCommentModal";

interface IProps {
    comment: IComments;
    hydratePost: () => void;
}

const { Title, Text } = Typography;

const Comment: React.FC<IProps> = (props: IProps) => {
    const deleteCommentHandler = async () => {
        const success = await deleteComment(props?.comment?.id);
        if (success) {
            // We trigger an update to the post
            props.hydratePost();
        }
    };

    return (
        <>
            <List.Item key={props?.comment?.id}>
                <Row>{props?.comment?.comment}</Row>
                <br />
                <Row justify="space-between" align="middle">
                    <Col>
                        {props?.comment?.name}
                        <br />
                        {new Date(
                            props?.comment?.date_created
                        ).toLocaleString()}
                    </Col>
                    <Col>
                        {localStorage.getItem("user_id") ===
                            props.comment.commenter && (
                            <>
                                <a onClick={deleteCommentHandler}>
                                    Delete Comment
                                </a>
                                <EditCommentModal
                                    comment={props.comment}
                                    hydratePost={props.hydratePost}
                                />
                            </>
                        )}
                    </Col>
                </Row>
            </List.Item>
        </>
    );
};

export default Comment;
