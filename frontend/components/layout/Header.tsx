import React, { useState } from "react";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { NextRouter, useRouter } from "next/router";
import Link from "next/link";

const items: MenuProps["items"] = [
    {
        label: <Link href="/">Home</Link>,
        key: "",
        icon: <MailOutlined />,
    },
    {
        label: <Link href="/general">Forum</Link>,
        key: "forum",
        icon: <AppstoreOutlined />,
    },
    {
        label: <Link href="/about">About</Link>,
        key: "about",
        icon: <AppstoreOutlined />,
    },
    {
        label: <Link href="/login">Login</Link>,
        key: "login",
        icon: <AppstoreOutlined />,
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

    // const onClick: MenuProps["onClick"] = (e) => {
    //     setCurrent(e.key);
    //     // router.push(e.key === "forum" ? "/general" : e.key);
    // };

    return (
        <Menu
            // onClick={onClick}
            style={{ backgroundColor: "var(--forum-white)" }}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};

export default Header;
