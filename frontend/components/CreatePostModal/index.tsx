import React, { useState } from "react";
import { Form, Modal, Row } from "antd";
import CreatePostForm from "./CreatePostForm";
import { createPost } from "../../api";

interface IProps {
    dummyUpdate: number;
    setDummyUpdate: (dummyUpdate: number) => void;
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

    const onFinish = (values: any) => {
        //TODO get user id
        const id = "b834bc17-63ea-43ff-a4ab-badc57386b9c";
        createPost({ poster: id, ...values });
        form.resetFields();
        props.setDummyUpdate(props.dummyUpdate + 1);
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
