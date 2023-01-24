import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { ICategories } from "../../interfaces/api";
import { getCategories } from "../../api";
import Link from "next/link";
import { useRouter } from "next/router";

interface IProps {
    category: string | undefined;
    setCategory: (category: any) => void;
}

const CategorySidebar: React.FC<IProps> = (props: IProps) => {
    const [isInitial, setIsInitial] = useState<boolean>(true);
    const [categories, setCategories] = useState<ICategories[]>([]);
    const router = useRouter();
    const categoryPath = router?.query?.category as string;

    if (isInitial) {
        props?.setCategory(categoryPath);
        setIsInitial(false);
    }

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
                defaultSelectedKeys={[categoryPath]}
                style={{ backgroundColor: "var(--forum-white)", minWidth: 400 }}
                items={categories?.map((category) => ({
                    key: category.category,
                    label: (
                        <Link
                            href={`/${category.category}`}
                            style={{ textTransform: "capitalize" }}
                            shallow={true}
                            onClick={() =>
                                props?.setCategory(category?.category)
                            }
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

export default CategorySidebar;
