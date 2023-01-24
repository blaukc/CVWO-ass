import React, { useEffect, useState } from "react";
import {
    AppstoreOutlined,
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined,
    MailOutlined,
    QuestionCircleOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Col, MenuProps, Row } from "antd";
import { Menu } from "antd";
import { NextRouter, useRouter } from "next/router";
import Link from "next/link";

const items: MenuProps["items"] = [
    {
        label: <Link href="/">Home</Link>,
        key: "",
        icon: <HomeOutlined />,
    },
    {
        label: <Link href="/general">Forum</Link>,
        key: "forum",
        icon: <AppstoreOutlined />,
    },
    {
        label: <Link href="/about">About</Link>,
        key: "about",
        icon: <QuestionCircleOutlined />,
    },
    {
        label: <Link href="/login">Login</Link>,
        key: "login",
        icon: <LoginOutlined />,
    },
];

const getSelectedHeader = (router: NextRouter): string => {
    const path = router.pathname;

    if (path === "/[category]") {
        return "forum";
    }

    return path.split("/")[1];
};

const Header: React.FC = () => {
    const router = useRouter();
    const path = getSelectedHeader(router);
    const [current, setCurrent] = useState(path);

    const logout = () => {
        localStorage.clear();
        router.push("/login");
    };

    return (
        <>
            <Row justify="space-between">
                <Col md={8}>
                    <Menu
                        // onClick={onClick}
                        style={{
                            backgroundColor: "var(--forum-white)",
                            height: "100%",
                        }}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={items}
                    />
                </Col>
                <Col>
                    <Row style={{ height: 20 }}>
                        {/* i have no time */}
                        <a onClick={logout}>Logout</a>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default Header;
