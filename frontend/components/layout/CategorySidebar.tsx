import React, { useState } from "react";
import {
    AppstoreOutlined,
    CalendarOutlined,
    LinkOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Divider, Menu, Switch } from "antd";
import type { MenuProps, MenuTheme } from "antd/es/menu";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem("Navigation One", "1", <MailOutlined />),
    getItem("Navigation Two", "2", <CalendarOutlined />),
];

const CategorySidebar: React.FC = () => {
    return (
        <>
            <Menu
                // style={{ width: 256 }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                items={items}
            />
        </>
    );
};

export default CategorySidebar;
