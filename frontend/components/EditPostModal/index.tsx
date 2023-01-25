import React, { useState } from "react";
import { Form, message, Modal, Row } from "antd";
import EditPostForm from "./EditPostForm";
import { createPost, patchPost } from "../../api";
import { IPosts } from "../../interfaces/api";

interface IProps {
    post: IPosts | null;
    hydrateSidebar: () => void;
    hydratePost: () => void;
}

const EditPostModal: React.FC<IProps> = (props: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

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
        const id = "b834bc17-63ea-43ff-a4ab-badc57386b9c";
        const success = await patchPost(props.post?.id as string, {
            ...props.post,
            ...values,
        });
        if (success) {
            form.resetFields();
            // We trigger an update to the posts sidebar
            props.hydrateSidebar();
            props.hydratePost();
        } else {
            messageApi.open({
                type: "error",
                content: "Error editing post",
            });
        }
    };

    return (
        <>
            {contextHolder}
            <Row onClick={showModal}>
                <a>Edit Post</a>
            </Row>
            <Modal
                title="Edit Post"
                open={isModalOpen}
                onOk={handleOk}
                okText="Edit Post"
                onCancel={handleCancel}
            >
                <EditPostForm
                    form={form}
                    onFinish={onFinish}
                    post={props.post}
                />
            </Modal>
        </>
    );
};

export default EditPostModal;
