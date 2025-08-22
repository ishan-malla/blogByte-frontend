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
  snippet: string;
  author: string;
  image: string;
  commentCount: number;
  ratings: number[];
  comments: CommentResponse[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface commentUser {
  _id: string;
  username: string;
  email: string;
}
interface CommentRequest {
  postId: string;
  text: string;
}

interface CommentResponse {
  _id: string;
  user: commentUser;
  text: string;
  createdAt: string;
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

    getPostById: builder.query<PostResponse, string>({
      query: (id) => `/posts/${id}`,
      providesTags: ["Post"],
    }),

    addComment: builder.mutation<CommentResponse, CommentRequest>({
      query: ({ postId, text }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["Post"],
    }),

    editComment: builder.mutation<
      CommentResponse,
      { postId: string; commentId: string; text: string }
    >({
      query: ({ postId, commentId, text }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "PUT",
        body: { text },
      }),
      invalidatesTags: ["Post"],
    }),

    deleteComment: builder.mutation<
      { success: boolean },
      { postId: string; commentId: string }
    >({
      query: ({ postId, commentId }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = postApi;
