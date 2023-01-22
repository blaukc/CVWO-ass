import React, { useState } from "react";
import { Form, Modal, Row } from "antd";
import EditCommentForm from "./EditCommentForm";
import { createPost, patchComment } from "../../api";
import { IComments } from "../../interfaces/api";

interface IProps {
    comment: IComments;
    hydratePost: () => void;
}

const EditCommentModal: React.FC<IProps> = (props: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const onFinish = (values: any) => {
        //TODO get user id
        const id = "b834bc17-63ea-43ff-a4ab-badc57386b9c";
        if (values?.comment) {
            patchComment(props.comment.id, { ...props.comment, ...values });
            form.resetFields();
            // We trigger an update to the posts sidebar
            props.hydratePost();
        }
    };

    return (
        <>
            <Row onClick={showModal}>Edit Comment</Row>
            <Modal
                title="Edit Comment"
                open={isModalOpen}
                onOk={handleOk}
                okText="Edit Comment"
                onCancel={handleCancel}
            >
                <EditCommentForm
                    form={form}
                    onFinish={onFinish}
                    comment={props.comment}
                />
            </Modal>
        </>
    );
};

export default EditCommentModal;
