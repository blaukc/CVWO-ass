import { Button, Col, Form, Input, Row } from "antd";
import Link from "next/link";
import { login } from "../api";
import HomeLayout from "../components/layout/HomeLayout";

const Home = (): JSX.Element => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        await login(values?.username, values?.password);
    };

    return (
        <>
            <HomeLayout
                body={
                    <Row
                        style={{ height: "85vh", minHeight: 600 }}
                        align="middle"
                    >
                        <Row justify="center" style={{ width: "100%" }}>
                            <Col md={6}>
                                <Form form={form} onFinish={onFinish}>
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your username!",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your password!",
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item wrapperCol={{ offset: 10 }}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Login
                                        </Button>
                                    </Form.Item>
                                    <p style={{ textAlign: "center" }}>
                                        Don't have an account?{" "}
                                        <Link href="/register">Register</Link>
                                    </p>
                                </Form>
                            </Col>
                        </Row>
                    </Row>
                }
            />
        </>
    );
};

export default Home;
