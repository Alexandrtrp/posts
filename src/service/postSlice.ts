import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TPropsPost } from "../components/Post";

export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const filterThunk = createAsyncThunk(
  "posts/filterThunk",
  async function filter(title: string) {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?title_like=${title}`
      );
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
  filter: string;
  filterPosts: TPropsPost[];
};

const initialState: TInitialState = {
  posts: [],
  loading: false,
  error: "",
  filter: '',
  filterPosts: []
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
    addFilter: (state, action) => {
      state.filter = action.payload
    }
  },
  extraReducers: (buider) => {
    buider
      .addCase(filterThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(filterThunk.fulfilled, (state, action) => {
        const randomLike = Math.floor(Math.random() * 50);
        const randomDislike = Math.floor(Math.random() * 50);
        state.posts = action.payload.map((post: TPropsPost) => {
          return { ...post, like: randomLike, dislike: randomDislike };
        });
      });
  },
});

export const postsReducer = postSlice.reducer;
export const { addLike, deleteLike, addFilter } = postSlice.actions;
