import { Button, Col, Form, Input, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { login } from "../api";
import HomeLayout from "../components/layout/HomeLayout";

const Home = (): JSX.Element => {
    const [form] = Form.useForm();
    const router = useRouter();

    const onFinish = async (values: any) => {
        const res = await login(values?.username, values?.password);
        if (res) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user_name", res.data.user_name);
            localStorage.setItem("user_id", res.data.user_id);
            router.push("/general");
        } else {
            //fail prompt
        }
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
                                        Don&apos;t have an account?{" "}
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
