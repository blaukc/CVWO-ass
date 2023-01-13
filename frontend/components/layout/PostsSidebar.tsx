import React, { useEffect, useState } from "react";
import { List, Row } from "antd";
import { IPosts } from "../../interfaces/api";
import { getCategoryPosts } from "../../api";
import CreatePostModal from "../CreatePostModal";

interface IProps {
    category: string | undefined;
    setCategory: (category: any) => void;
    setCurrentPost: (currentPost: string) => void;
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
                header={<CreatePostModal />}
                style={{
                    backgroundColor: "var(--forum-white)",
                    height: "100%",
                }}
                dataSource={posts}
                renderItem={(post) => (
                    <List.Item
                        key={post?.id}
                        onClick={() => props.setCurrentPost(post?.id)}
                    >
                        <List.Item.Meta
                            title={post?.title}
                            description={post?.description}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};

export default CategorySidebar;
