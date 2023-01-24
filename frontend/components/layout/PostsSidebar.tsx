import React, { useEffect, useState } from "react";
import { List, Row } from "antd";
import { IPosts } from "../../interfaces/api";
import { getCategoryPosts } from "../../api";
import CreatePostModal from "../CreatePostModal";

interface IProps {
    category: string | undefined;
    setCategory: (category: any) => void;
    currentPost: string;
    setCurrentPost: (currentPost: string) => void;
    dummyUpdateSidebar: number;
    hydrateSidebar: () => void;
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
    }, [props?.category, props.dummyUpdateSidebar]);

    return (
        <>
            <List
                header={
                    <CreatePostModal hydrateSidebar={props.hydrateSidebar} />
                }
                style={{
                    backgroundColor: "var(--forum-white)",
                    height: "100%",
                }}
                dataSource={posts}
                renderItem={(post) => (
                    <List.Item
                        key={post?.id}
                        onClick={() => props.setCurrentPost(post?.id)}
                        style={{
                            cursor: "pointer",
                            backgroundColor:
                                props.currentPost === post?.id
                                    ? "var(--forum-grey)"
                                    : "var(--forum-white)",
                        }}
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
