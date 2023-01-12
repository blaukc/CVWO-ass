import React, { useEffect, useState } from "react";
import { Form, FormInstance, Input, Modal, Row, Select } from "antd";
import { ICategories } from "../../interfaces/api";
import { getCategories } from "../../api";

interface IProps {
    form: FormInstance;
    onFinish: (values: any) => void;
}

const CreatePostForm: React.FC<IProps> = (props: IProps) => {
    const [categories, setCategories] = useState<ICategories[]>([]);

    const updateCategoriesState = async () => {
        const categories = await getCategories();
        setCategories(categories);
    };

    useEffect(() => {
        updateCategoriesState();
    }, []);

    return (
        <>
            <Form form={props.form} onFinish={props.onFinish} name="createPost">
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true }]}
                >
                    <Select
                        // defaultValue="general"
                        options={categories.map((category) => ({
                            value: String(category.id),
                            // Capitalise first letter
                            label:
                                category.category.charAt(0).toUpperCase() +
                                category.category.slice(1),
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea rows={5} />
                </Form.Item>
            </Form>
        </>
    );
};

export default CreatePostForm;
