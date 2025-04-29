import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TPropsPost } from "../components/Post";

export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getPostsThunk = createAsyncThunk(
  "posts/getPostsThunk",
  async function fetchData() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      return checkResponse(res);
    } catch (err) {
      return console.log(`Ошибка. Запрос не выполнен: ${err}`);
    }
  }
);

type TInitialState = {
  posts: TPropsPost[];
  loading: boolean;
  error: string | undefined;
};

const initialState: TInitialState = {
  posts: [],
  loading: false,
  error: "",
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addLike: (state, action) => {
      const post = state.posts.find(
        (post: TPropsPost) => post.id === action.payload
      );
      if (post) {
        post.like += 1;
      }
    },
    deleteLike: (state, action) => {
      const post = state.posts.find(
        (post: TPropsPost) => post.id === action.payload
      );
      if (post) {
        post.dislike += 1;
      }
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(getPostsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getPostsThunk.fulfilled, (state, action) => {
        state.posts = action.payload.map((post: TPropsPost) => {
          const randomLike = Math.floor(Math.random() * 50);
          const randomDislike = Math.floor(Math.random() * 50);
          return { ...post, like: randomLike, dislike: randomDislike };
        });
      });
  },
});

export const postsReducer = postSlice.reducer;
export const { addLike, deleteLike } = postSlice.actions;
