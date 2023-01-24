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

    const onFinish = async (values: any) => {
        // TODO ADD USER
        const success = await createComment({
            post: props.postId,
            ...values,
        });
        if (success) {
            form.resetFields();
            // We trigger an update to the post
            props.hydratePost();
        } else {
        }
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
