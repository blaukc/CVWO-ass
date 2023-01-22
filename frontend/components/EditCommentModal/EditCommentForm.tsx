import React, { useEffect, useState } from "react";
import { Button, Form, FormInstance, Input } from "antd";
import { IComments, IPosts } from "../../interfaces/api";
import { createComment, getPost, getPostComments } from "../../api";

interface IProps {
    form: FormInstance;
    onFinish: (values: any) => void;
    comment: IComments;
}

const EditCommentForm: React.FC<IProps> = (props: IProps) => {
    return (
        <>
            <Form
                form={props.form}
                onFinish={props.onFinish}
                name="editComment"
            >
                <Form.Item name="comment">
                    <Input.TextArea defaultValue={props.comment.comment} />
                </Form.Item>
            </Form>
        </>
    );
};

export default EditCommentForm;
