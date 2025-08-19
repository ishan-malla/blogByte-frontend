import { apiSlice } from "./api/apiSlice";

interface PostRequest {
  title: string;
  content: string;
  image?: string | null;
}

interface PostResponse {
  _id: string;
  title: string;
  content: string;
  author: string;
  image: string | null;
  commentCount: number;
  ratings: number[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<PostResponse, PostRequest>({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Post"],
    }),
    getPosts: builder.query<PostResponse[], void>({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
  }),
});

export const { useCreatePostMutation, useGetPostsQuery } = postApi;
