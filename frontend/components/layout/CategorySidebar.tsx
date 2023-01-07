import React, { useEffect, useState } from "react";
import {
    AppstoreOutlined,
    CalendarOutlined,
    LinkOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import { ICategories } from "../../interfaces/api";
import { getCategories } from "../../api";
import Link from "next/link";

interface IProps {
    // categories: ICategories[];
}

const CategorySidebar: React.FC<IProps> = (props: IProps) => {
    const [categories, setCategories] = useState<ICategories[]>([]);

    const updateCategoriesState = async () => {
        const categories = await getCategories();
        console.log(categories);
        setCategories(categories);
    };

    useEffect(() => {
        updateCategoriesState();
    }, []);

    return (
        <>
            <Menu
                // style={{ width: 256 }}
                // defaultSelectedKeys={["1"]}
                // defaultOpenKeys={["sub1"]}
                items={categories?.map((category) => ({
                    key: category.category,
                    label: (
                        <Link href="" style={{ textTransform: "capitalize" }}>
                            {category.category}
                        </Link>
                    ),
                    title: category.category,
                }))}
            />
        </>
    );
};

export default CategorySidebar;
