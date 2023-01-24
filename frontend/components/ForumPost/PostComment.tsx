import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { IComments, IPosts } from "../../interfaces/api";
import { createComment, getPost, getPostComments } from "../../api";
import { useRouter } from "next/router";

interface IProps {
    postId: string;
    hydratePost: () => void;
}

const PostComment: React.FC<IProps> = (props: IProps) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        // TODO ADD USER
        if (localStorage.getItem("token")) {
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
        } else {
            messageApi.open({
                type: "error",
                content: "You are not logged in",
            });
            setTimeout(() => {
                router.push("/login");
            }, 1500);
        }
    };

    return (
        <>
            {contextHolder}
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
