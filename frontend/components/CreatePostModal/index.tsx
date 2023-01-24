import React, { useState } from "react";
import { Col, Form, message, Modal, Row, Typography } from "antd";
import CreatePostForm from "./CreatePostForm";
import { createPost } from "../../api";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const { Text } = Typography;

interface IProps {
    hydrateSidebar: () => void;
}

const CreatePostModal: React.FC<IProps> = (props: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();

    const showModal = () => {
        if (localStorage.getItem("token")) {
            setIsModalOpen(true);
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
            {contextHolder}
            <Row
                align="middle"
                justify="space-between"
                onClick={showModal}
                style={{
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                    padding: 10,
                }}
            >
                <Col>
                    <Text strong>Create a Post</Text>
                </Col>
                <Col>
                    <PlusOutlined />
                </Col>
            </Row>
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
