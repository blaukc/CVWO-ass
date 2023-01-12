import React, { useEffect, useState } from "react";
import { List } from "antd";
import { IPosts } from "../../interfaces/api";
import { getCategoryPosts } from "../../api";
import Link from "next/link";
import { useRouter } from "next/router";

interface IProps {
    category: string | undefined;
    setCategory: (category: any) => void;
}

const CategorySidebar: React.FC<IProps> = (props: IProps) => {
    const [posts, setPosts] = useState<IPosts[]>([]);

    const updatePostsState = async () => {
        if (!props?.category) {
            return;
        }
        console.log(props?.category);
        const posts = await getCategoryPosts(props?.category);
        setPosts(posts ? posts : []);
    };

    useEffect(() => {
        updatePostsState();
    }, [props?.category]);

    return (
        <>
            <List
                style={{ backgroundColor: "var(--forum-white)" }}
                dataSource={posts}
                renderItem={(post) => (
                    <List.Item key={post?.id}>
                        <List.Item.Meta title={post?.title} />
                    </List.Item>
                )}
            />
        </>
    );
};

export default CategorySidebar;
