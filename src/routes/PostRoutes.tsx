import { Route, Routes } from "react-router-dom";
import { Posts } from "../components/Posts";
import { useAppSelector } from "../service/hooks";
import { PostPage } from "../components/PostPage";

export const PostRoutes = () => {
  const posts = useAppSelector((state) => state.posts.posts);
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      {posts.map((post, index) => (
        <Route
          path={`posts/${post.id}`}
          element={
            <PostPage
              body={post.body}
              title={post.title}
              like={post.like}
              dislike={post.dislike}
              id={post.id}
              index={index}
            />
          }
        />
      ))}
    </Routes>
  );
};
