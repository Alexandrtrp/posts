import { useEffect } from "react";
import { getPostsThunk } from "../service/postSlice";
import { Post, TPropsPost } from "./Post";
import { useAppDispatch, useAppSelector } from "../service/hooks";

export const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);

  return (
    <div>
        <h1 className="text-4xl/16">Блог</h1>
        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, libero.</p>
        <input type="text" />
      <ul className="flex flex-wrap justify-center gap-6">
        {posts.map((post: TPropsPost, index) => (
          <li key={index}>
            <Post body={post.body} title={post.title} like={post.like} dislike ={post.dislike} id={post.id} index={index}/>
          </li>
        ))}
      </ul>
    </div>
  );
};
