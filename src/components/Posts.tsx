import { useEffect } from "react";
import { addFilter, filterThunk } from "../service/postSlice";
import { Post, TPropsPost } from "./Post";
import { useAppDispatch, useAppSelector } from "../service/hooks";

export const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const filter = useAppSelector((state) => state.posts.filter);

  useEffect(() => {
    dispatch(filterThunk(filter));
  }, [filter]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl/16">Блог</h1>
      <p className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
        libero.
      </p>
      <input
      value={filter}
        onChange={(e) => dispatch(addFilter((e.target.value)))}
        className="w-5xl self-center border border-gray-300 rounded-md p-2"
        type="text"
        placeholder="Поиск по названию статьи"
      />
      <ul className="flex flex-wrap justify-center gap-6">
        {posts.map((post: TPropsPost, index) => (
          <li key={index}>
            <Post
              body={post.body}
              title={post.title}
              like={post.like}
              dislike={post.dislike}
              id={post.id}
              index={index}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
