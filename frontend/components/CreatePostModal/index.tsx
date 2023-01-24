import React, { useState } from "react";
import { Form, Modal, Row } from "antd";
import CreatePostForm from "./CreatePostForm";
import { createPost } from "../../api";

interface IProps {
    hydrateSidebar: () => void;
}

const CreatePostModal: React.FC<IProps> = (props: IProps) => {
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

    const onFinish = async (values: any) => {
        //TODO get user id
        const success = await createPost({ ...values });
        if (success) {
            form.resetFields();
            // We trigger an update to the posts sidebar
            props.hydrateSidebar();
        } else {
        }
    };

    return (
        <>
            <Row onClick={showModal}>Open Modal</Row>
            <Modal
                title="Create Post"
                open={isModalOpen}
                onOk={handleOk}
                okText="Create Post"
                onCancel={handleCancel}
            >
                <CreatePostForm form={form} onFinish={onFinish} />
            </Modal>
        </>
    );
};

export default CreatePostModal;
