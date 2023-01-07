import React, { useEffect, useState } from "react";
import { List } from "antd";
import { ICategories } from "../../interfaces/api";
import { getCategories } from "../../api";
import Link from "next/link";
import { useRouter } from "next/router";

interface IProps {
    // categories: ICategories[];
}

const CategorySidebar: React.FC<IProps> = (props: IProps) => {
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
            <List
                style={{ backgroundColor: "var(--forum-white)" }}
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

export default CategorySidebar;
