import { useEffect } from "react";
import "./App.css";
import { PostRoutes } from "./routes/PostRoutes";
import { useAppDispatch, useAppSelector } from "./service/hooks";
import { filterThunk } from "./service/postSlice";

function App() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.posts.filter);
  useEffect(() => {
    dispatch(filterThunk(filter));
  }, [filter]);

  return (
    <>
      <PostRoutes />
    </>
  );
}

export default App;
