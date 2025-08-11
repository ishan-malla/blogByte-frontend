import Comment from "../components/ui/comment";
import CommentForm from "./CommentForm";

const CommentSection = () => {
  const comments = [
    {
      username: "Alice",
      date: "Aug 10, 2025",
      text: "Nice video! Learned a lot.",
    },
    {
      username: "Bob",
      date: "Aug 11, 2025",
      text: "Great explanation, thanks!",
    },
    {
      username: "Charlie",
      date: "Aug 11, 2025",
      text: "Can you share the source code?",
    },
  ];

  return (
    <section className="w-full md:w-1/2 mx-auto my-6">
      <h2 className="text-lg font-semibold mb-4">{comments.length} Comments</h2>

      <CommentForm />

      <div>
        {comments.map((c, id) => (
          <Comment key={id} username={c.username} date={c.date} text={c.text} />
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
