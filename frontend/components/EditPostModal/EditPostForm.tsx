import React, { useEffect, useState } from "react";
import { Form, FormInstance, Input, Modal, Row, Select } from "antd";
import { ICategories, IPosts } from "../../interfaces/api";
import { getCategories } from "../../api";

interface IProps {
    form: FormInstance;
    onFinish: (values: any) => void;
    post: IPosts | null;
}

const EditPostForm: React.FC<IProps> = (props: IProps) => {
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
                <Form.Item name="title" label="Title" required>
                    <Input defaultValue={props.post?.title} />
                </Form.Item>
                <Form.Item name="description" label="Description" required>
                    <Input.TextArea
                        rows={5}
                        defaultValue={props.post?.description}
                    />
                </Form.Item>
            </Form>
        </>
    );
};

export default EditPostForm;
