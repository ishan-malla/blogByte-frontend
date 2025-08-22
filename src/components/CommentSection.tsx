// CommentSection.tsx
import { useParams } from "react-router-dom";
import Comment from "./ui/comment";
import CommentForm from "./CommentForm";
import {
  useGetPostByIdQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} from "@/features/postApi";
import { useAppSelector } from "@/hooks/redux";

const CommentSection = () => {
  const { id: postId } = useParams<{ id: string }>();

  const { user } = useAppSelector((state) => state.auth);
  const currentUsername = user?.username;

  const { data: post, isLoading } = useGetPostByIdQuery(postId!);
  const [addComment] = useAddCommentMutation();
  const [editComment] = useEditCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  if (isLoading) return <p>Loading comments...</p>;
  if (!post) return <p>No post found.</p>;

  const handleAdd = async (text: string) => {
    await addComment({ postId: postId!, text });
  };

  const handleEdit = async (commentId: string, newText: string) => {
    await editComment({ postId: postId!, commentId, text: newText });
  };

  const handleDelete = async (commentId: string) => {
    await deleteComment({ postId: postId!, commentId });
  };

  return (
    <section className="w-full md:w-1/2 mx-auto my-6">
      <h2 className="text-lg font-semibold mb-4">
        {post.comments.length} Comments
      </h2>

      <CommentForm onAdd={handleAdd} username={currentUsername || "Guest"} />

      <div>
        {post.comments.map((c) => (
          <Comment
            key={c._id}
            id={c._id}
            username={c.user.username}
            date={c.createdAt}
            text={c.text}
            onEdit={
              currentUsername === c.user.username
                ? handleEdit
                : () => {
                    console.log("not same user");
                  }
            }
            onDelete={
              currentUsername === c.user.username
                ? handleDelete
                : () => {
                    console.log("not same user");
                  }
            }
          />
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
