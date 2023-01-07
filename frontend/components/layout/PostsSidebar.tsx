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
import { useRouter } from "next/router";

interface IProps {
    // categories: ICategories[];
}

const PostsSidebar: React.FC<IProps> = (props: IProps) => {
    const [categories, setCategories] = useState<ICategories[]>([]);
    const router = useRouter();
    const categoryPath = router?.query?.category as string;

    const updateCategoriesState = async () => {
        const categories = await getCategories();
        setCategories(categories);
    };

    useEffect(() => {
        updateCategoriesState();
    }, []);

    return (
        <>
            <Menu
                style={{ backgroundColor: "var(--forum-white)" }}
                defaultSelectedKeys={[categoryPath]}
                items={categories?.map((category) => ({
                    key: category.category,
                    label: (
                        <Link
                            href={`/${category.category}`}
                            style={{ textTransform: "capitalize" }}
                            shallow={true}
                        >
                            {category.category}
                        </Link>
                    ),
                    title: category.category,
                }))}
            />
        </>
    );
};

export default PostsSidebar;
