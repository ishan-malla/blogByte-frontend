import CommentSection from "@/components/CommentSection";
import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "@/features/postApi";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, isError } = useGetPostByIdQuery(id!);
  console.log(post);

  if (isLoading) {
    return <div className="text-center mt-10">Loading post...</div>;
  }

  if (isError || !post) {
    return <div className="text-center mt-10">Post not found</div>;
  }

  const rating =
    post.ratings.length > 0
      ? Math.round(
          post.ratings.reduce((sum, r) => sum + r, 0) / post.ratings.length
        )
      : 0;

  // Resolve author name safely
  const authorName =
    typeof post.author === "object" ? post.author.username : post.author;

  return (
    <article className="flex flex-col items-center px-4 md:px-0">
      <header className="flex flex-col gap-2 w-full md:w-1/2">
        <figure>
          <img
            src={post.image || "https://via.placeholder.com/800x400"}
            alt={post.title}
            className="w-full object-cover rounded-lg"
          />
          <figcaption className="sr-only">{post.title}</figcaption>
        </figure>

        <h1 className="text-2xl font-domine font-semibold mt-4">
          {post.title}
        </h1>

        <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
          {/* Author Initial Instead of Image */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-800 font-semibold">
              {authorName?.charAt(0).toUpperCase()}
            </div>
            <span>
              By <strong>{authorName}</strong>
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < rating ? "⭐" : "☆"}</span>
            ))}
            <span className="ml-1 text-gray-500">({rating}/5)</span>
          </div>
        </div>
      </header>

      <section className="w-full md:w-1/2 mt-4 text-base leading-7 text-gray-700 font-baskerville tracking-tight whitespace-pre-line">
        {post.content}
      </section>

      <CommentSection postId={post._id} />
    </article>
  );
};

export default BlogPost;
