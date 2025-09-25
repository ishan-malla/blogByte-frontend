import { apiSlice } from "./api/apiSlice";

interface PostResponse {
  _id: string;
  title: string;
  content: string;
  snippet: string;
  author: {
    _id: string;
    username: string;
    email: string;
  };
  image?: string;
  commentCount: number;
  ratings: number[];
  comments: CommentResponse[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PostUpdateRequest {
  id: string;
  formData: FormData;
}

interface CommentUser {
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
  user: CommentUser;
  text: string;
  createdAt: string;
}

interface CommentUpdateRequest {
  postId: string;
  commentId: string;
  text: string;
}

interface CommentDeleteRequest {
  postId: string;
  commentId: string;
}

interface RatingResponse {
  averageRating: string;
  totalRatings: number;
  ratings: {
    _id: string;
    user: {
      _id: string;
      username: string;
    };
    score: number;
  }[];
}

interface AddRatingRequest {
  postId: string;
  score: number;
}

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<PostResponse, FormData>({
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

    updatePost: builder.mutation<PostResponse, PostUpdateRequest>({
      query: ({ id, formData }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Post"],
    }),

    deletePost: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `/posts/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Post"],
      }
    ),

    addComment: builder.mutation<CommentResponse, CommentRequest>({
      query: ({ postId, text }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["Post"],
    }),

    editComment: builder.mutation<CommentResponse, CommentUpdateRequest>({
      query: ({ postId, commentId, text }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "PUT",
        body: { text },
      }),
      invalidatesTags: ["Post"],
    }),

    deleteComment: builder.mutation<
      { success: boolean; message: string },
      CommentDeleteRequest
    >({
      query: ({ postId, commentId }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),

    addOrUpdateRating: builder.mutation<RatingResponse, AddRatingRequest>({
      query: ({ postId, score }) => ({
        url: `/${postId}/ratings`,
        method: "POST",
        body: { score },
      }),
      invalidatesTags: ["Post"],
    }),

    getRatings: builder.query<RatingResponse, string>({
      query: (postId) => `/${postId}/ratings`,
      providesTags: ["Post"],
    }),

    deleteRating: builder.mutation<{ message: string }, string>({
      query: (postId) => ({
        url: `/${postId}/ratings`,
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
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useAddOrUpdateRatingMutation,
  useGetRatingsQuery,
  useDeleteRatingMutation,
} = postApi;
