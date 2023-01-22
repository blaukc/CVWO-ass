import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { IComments, IPosts } from "../../interfaces/api";
import { createComment, getPost, getPostComments } from "../../api";

interface IProps {
    postId: string;
    hydratePost: () => void;
}

const PostComment: React.FC<IProps> = (props: IProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        // TODO ADD USER
        console.log(values);
        const id = "b834bc17-63ea-43ff-a4ab-badc57386b9c";
        createComment({
            commenter: id,
            post: props.postId,
            ...values,
        });
        form.resetFields();
        // We trigger an update to the post
        props.hydratePost();
    };

    return (
        <>
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="comment">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Write Comment
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default PostComment;
