import React, { useEffect, useState } from "react";
import { Col, Divider, List, Typography } from "antd";
import { IComments } from "../../interfaces/api";
import { deleteComment } from "../../api";
import EditCommentModal from "../EditCommentModal";

interface IProps {
    comment: IComments;
    hydratePost: () => void;
}

const { Title, Text } = Typography;

const Comment: React.FC<IProps> = (props: IProps) => {
    const deleteCommentHandler = () => {
        deleteComment(props?.comment?.id);
        // We trigger an update to the post
        props.hydratePost();
    };

    return (
        <>
            <List.Item key={props?.comment?.id}>
                <List.Item.Meta title={props?.comment?.name} />
                {props?.comment?.comment}
                <br />
                {props?.comment?.date_created}
                <br />
                <a onClick={deleteCommentHandler}>delete</a>
                <EditCommentModal
                    comment={props.comment}
                    hydratePost={props.hydratePost}
                />
            </List.Item>
        </>
    );
};

export default Comment;
